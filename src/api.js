const Authorization = "token 58bcc3e3cb0f1c7982bb29745a98e47aefc34192"  // 无任何权限
const ContentType = "application/json"

// 呼叫
// @param {String} query graphql
// @returns {Array<Issue>}
export async function call(query) {
    let method = "POST"
    let body = JSON.stringify({ query })
    let uri = "https://api.github.com/graphql"
    let headers = {"Content-Type": ContentType, Authorization}
    let { data } = await fetch(uri, {method, headers, body}).then(x => x.json())
    return data
}

// 合并摘要
// @param {String} markdown
// @returns {Object}
export function sign(markdown) {
    let avatar = markdown
        .match(/\!\[image\]\(([\s\S]*?)\)/g)[0]
        .replace(/(\!\[image\]\(|\)|[\s])/g, "")
    let label = markdown
        .match(/\*([\s\S]*?)[\r\n]/g)[0]
        .split("*")[1]
        .replace(/\s/g, "")
        .split(",")
        .map(x => x.replace(/`/g, ""))
    let paragraph = markdown
        .split(/\*.*[\r\n]/g)[1]
        .split(/\n/g)
        .filter(x => x.length > 5)[0]
    return { avatar, label, paragraph }
}

// 获取问题列表
// @param {String} after? 开始游标
// @param {String} before? 结束游标
// @param {Number} limit? 限制条数
// @returns {String}
export function List(after, before, limit = 20) {
    let afterText = after ? `after: ${after},` : ""
    let beforeText = before ? `before: ${before},` : ""
    return (`query { repository(owner: "quasipaa", name: "blog") {
        issues(${afterText} ${beforeText} last: ${limit}, states: OPEN) {
            pageInfo {startCursor, endCursor, hasNextPage, hasPreviousPage},
            edges {node {title, body, updatedAt, number}}
        }
    }}`)
}

// 获取问题
// @param {Number} number 问题编号
// @returns {String}
export function Item(number) {
    return (`query { repository(owner:"quasipaa", name:"blog") {
        issue(number: ${number}) {title, body, updatedAt}
    }}`)
}

// 仓库列表
// @returns {String}
export function Reop() {
    return (`query {viewer {repositories(last: 30) {
        nodes {name,description,url,stargazers(last: 100) {
            nodes {id}
        }}
    }}}`)
}

// 问题类
// @class
export class Issues {
    constructor() {
        this._map = new Map()
        this._isNext = true
        this._isPrevious = false
        this._startCursor = null
        this._endCursor = null
        this._limit = 20
        this._page = 1
    }
    
    // 请求
    // @param {String} query graphql
    // @returns {Array<Issue>}
    async _fetch(query) {
        let data = this._map.has(query) ? 
            this._map.get(query) : 
            await call(query)
        !this._map.has(query) && 
            this._map.set(query, data)
        let page = data.repository.issues.pageInfo
        let values = data.repository.issues.edges
        this._isPrevious = page.hasPreviousPage
        this._isNext = page.hasNextPage
        return values
    }
    
    // 页号
    // @returns {Number}
    get page() {
        return this._page
    }
    
    // 限制
    // @returns {Number}
    get limit() {
        return this._limit
    }
    
    // 下页
    // @returns {Array<Issue>}
    async next() {
        if (!this._isNext) return []
        this._page = this._page + 1
        let body = List(this._endCursor, null, this._limit)
        return (await this._fetch(body)).map(({ node }, index) => {
            return { ...sign(node.body), ...node, index }
        })
    }
    
    // 上页
    // @returns {Array<Issue>}
    async previous() {
        if (!this._isPrevious) return []
        this._page = this._page - 1 <= 0 ? 0 : this._page - 1
        let body = List(null, this._startCursor, this._limit)
        return (await this._fetch(body)).map(({ node }, index) => {
            return { ...sign(node.body), ...node, index }
        })
    }
    
    // 初始化
    // @returns {Array<Issue>}
    async initialize() {
        let body = List(null, null, this._limit)
        return (await this._fetch(body)).map(({ node }, index) => {
            return { ...sign(node.body), ...node, index }
        })
    }
}

// 获取单个问题数据
// @param {Number} number 问题编号
// @returns {Issue}
export async function Issue(number) {
    let res = await call(Item(number))
    return res.repository.issue
}

// 获取仓库列表
// @returns {Reop[]}
export async function Reops(number) {
    let res = await call(Reop(number))
    return res.viewer.repositories.nodes
}