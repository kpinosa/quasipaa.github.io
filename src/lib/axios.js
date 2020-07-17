const TOKEN = "token 58bcc3e3cb0f1c7982bb29745a98e47aefc34192"  // 无任何权限Api Token

// 请求类
// @class
export default class Axios {
    constructor(events) {
        this.buffer = new Map()
        this.events = events
    }
    
    // 呼叫
    // @param {boolean} cache 是否缓存
    // @param {string} uri 请求地址
    // @param {string} method 请求方法
    // @param {string} type 返回类型
    // @param {object?} param 请求参数
    // @returns {any[]}
    // @private
    async call(cache, uri, method, type, param) {
        let option = Object.assign(param, { method })
        let sign = JSON.stringify({uri, option, type})
        try {

            // 检查是否为缓存请求
            // 检查缓存是否存在
            // 如果缓存存在直接返回缓存
            if (cache && this.buffer.has(sign))
                return this.buffer.get(sign)

            // 请求远端服务器
            // 处理响应内容类型
            let res = await fetch(uri, option)
            let data = await res[type]()

            // 检查响应码是否为正常响应
            // 如果不在范围内，则返回错误码
            if (![200, 301, 302].includes(res.status))
                throw new Error(data.code)

            // 如果需要缓存
            // 则降响应缓存
            if (cache)
                this.buffer.set(sign, data)

            // 返回响应
            return data  
        } catch(error) {
            
            // 请求发生错误
            // 传递全局`Exception Monitor`事件
            this.events.emit("exceptionMonitor", {
                source: "fetch",
                error
            })
            
            // 抛出错误
            // 交给下个流程处理
            throw error
        } finally {
            
            // 无论请求是否成功
            // 都
            this.events.emit("fetchMonitor", {
                uri, option, type,
                ...option
            })
        }
    }
    
    // 请求替身
    // @param {boolean} cache 是否缓存
    // @returns {any[]}
    // @private
    dyn(cache) {
        return new Proxy({}, {get: (_, method) => {
            return (uri, param = {}) => {
                return new Proxy({}, {get: (_, type) => {
                    let Method = method.toLocaleUpperCase()
                    return this.call(cache, uri, Method, type, param)
                }})
            }
        }})
    }
    
    // 内容包装
    // @param {any} body 内容
    // @param {string} type 类型
    // @private
    format(body, type) {
        if (type === "json") return JSON.stringify(body)
        if (type === "text") return text
    }
    
    // 请求体
    // @param {any} body 内容
    // @param {object?} option 参数
    // @public
    Body(body, option = {}) {
        return new Proxy({}, {get: (_, type) => {
            return Object.assign(option, {
                body: this.format(body, type),
                headers: new Headers({
                    Authorization: TOKEN,
                    "Content-Type": ({
                        "json": "application/json",
                        "text": "application/text"
                    })[type]
                })
            })
        }})
    }
    
    // 缓存请求
    // @returns {any[]}
    // @public
    get reducer() {
        return this.dyn(true)
    }
    
    // 快速请求
    // @returns {any[]}
    // @public
    get fast() {
        return this.dyn(false)
    }
}