const Authorization = "token 58bcc3e3cb0f1c7982bb29745a98e47aefc34192"  // 无任何权限
const ContentType = "application/json"

// 接口类
// @class
export default class Api {
    constructor() {
        this._map = new Map()
        this._isNext = true
        this._isPrevious = false
        this._startCursor = null
        this._endCursor = null
        this._limit = 20
        this._page = 1
    }
    
    // 问题列表
    // @param {String} after? 开始游标
    // @param {String} before? 结束游标
    // @param {Number} limit? 限制条数
    // @returns {String}
    // @private
    static List(after, before, limit = 20) {
        return `query { repository(owner: "quasipaa", name: "quasipaa.github.io") {
            issues(${after ? `after: ${after},` : ""} ${before ? `before: ${before},` : ""} last: ${limit}, states: CLOSED) {
                pageInfo {startCursor, endCursor, hasNextPage, hasPreviousPage},
                nodes {title, body, updatedAt, number, url, labels(first: 10) {nodes {name}}}
            }
        }}`
    }

    // 问题
    // @param {Number} number 问题编号
    // @returns {String}
    // @private
    static Item(number) {
        return `query { repository(owner: "quasipaa", name: "quasipaa.github.io") {
            issue(number: ${number}) {title, body, updatedAt, labels(first: 10) {nodes {name}}}
        }}`
    }

    // 仓库列表
    // @returns {String}
    // @private
    static Repo() {
        return `query {viewer {repositories(last: 30) {
            nodes {name,description,url,stargazers(last: 100) {nodes {id}}}
        }}}`
    }
    
    // 呼叫
    // @param {String} query graphql
    // @returns {Array<Issue>}
    // @private
    async _call(query) {
        if (this._map.has(query)) 
            return this._map.get(query)
        let method = "POST"
        let body = JSON.stringify({ query })
        let uri = "https://api.github.com/graphql"
        let headers = {"Content-Type": ContentType, Authorization}
        let { data } = await fetch(uri, {method, headers, body}).then(x => x.json())
        this._map.set(query, data)
        return data
    }

    // 合并摘要
    // @param {String} markdown
    // @returns {Object}
    // @private
    _sign(markdown) {
        let avatar = markdown.match(/\!\[image\]\(([\s\S]*?)\)/g)[0].replace(/(\!\[image\]\(|\)|[\s])/g, "")
        let paragraph = markdown.split(/\r\n/g).filter(x => x.length > 5).filter(x => !x.startsWith("#"))[1]
        return { avatar, paragraph }
    }
    
    // 请求
    // @param {String} query graphql
    // @returns {Array<Issue>}
    // @private
    async _fetch(query) {
        let data = await this._call(query)
        this._isPrevious = data.repository.issues.pageInfo.hasPreviousPage
        this._isNext = data.repository.issues.pageInfo.hasNextPage
        return data.repository.issues.nodes.map(x => ({...x,
            labels: x.labels.nodes.map(x => x.name)
        }))
    }
    
    // 页号
    // @returns {Number}
    // @public
    get page() {
        return this._page
    }
    
    // 限制
    // @returns {Number}
    // @public
    get limit() {
        return this._limit
    }
    
    // 下页
    // @returns {Array<Issue>}
    // @public
    async next() {
        if (!this._isNext) return []
        this._page = this._page + 1
        let body = Api.List(this._endCursor, null, this._limit)
        return (await this._fetch(body)).map((node, index) => ({...node,
            ...this._sign(node.body),
            index
        }))
    }
    
    // 上页
    // @returns {Array<Issue>}
    // @public
    async previous() {
        if (!this._isPrevious) return []
        this._page = this._page - 1 <= 0 ? 0 : this._page - 1
        let body = Api.List(null, this._startCursor, this._limit)
        return (await this._fetch(body)).map((node, index) => ({...node,
            ...this._sign(node.body),
            index
        }))
    }
    
    // 初始化
    // @returns {Array<Issue>}
    // @public
    async initialize() {
        let body = Api.List(null, null, this._limit)
        return (await this._fetch(body)).map((node, index) => ({...node,
            ...this._sign(node.body),
            index
        }))
    }
    
    // 获取单个问题数据
    // @param {Number} number 问题编号
    // @returns {Issue}
    // @public
    async issue(number) {
        let res = await this._call(Api.Item(number))
        return ({...res.repository.issue,
            labels: res.repository.issue.labels.nodes
                 .map(x => x.name)
        })
    }

    // 获取仓库列表
    // @returns {Reop[]}
    // @public
    async repos(number) {
        let res = await this._call(Api.Repo(number))
        return res.viewer.repositories.nodes
    }
}