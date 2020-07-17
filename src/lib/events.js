"use strict"

// 事件循环类
// @class
export default class EventEmitter {
    constructor() {
        this.listener = {}
        this.events = {}
        this.index = -1
    }
    
    // 检查是否为空
    // @param {string} event 事件名
    // @private
    some(event) {
       if (!this.events[event]) {
            this.events[event] = new Set()
        }
    }
    
    // 绑定事件
    // @param {string} event 事件名
    // @param {funtion} handle 事件处理
    // @param {boolean} once 是否为单次监听
    // @returns {number}
    // @private
    bind(event, handle, once) {
        this.some(event)
        this.index += 1
        let index = this.index
        this.events[event].add({index, handle, once})
        this.listener[index] = event
        return index
    }

    // 监听
    // @param {string} event 事件名
    // @param {funtion} handle 事件处理
    // @returns {number}
    // @public
    on(event, handle) {
        return this.bind(event, handle, false)
    }

    // 单次监听
    // @param {string} event 事件名
    // @param {funtion} handle 事件处理
    // @returns {number}
    // @public
    once(event, handle) {
        return this.bind(event, handle, true)
    }
    
    // 删除事件
    // @param {string} event 事件名
    // @returns {void}
    // @public
    remove(event) {
        delete this.events[event]
    }
    
    // 移除监听器
    // @param {number} id 监听器ID
    // @returns {void}
    // @public
    pop(id) {
        let event = this.listener[id]
        let context = this.events[event][id]
        this.events[event].delete(context)
        delete this.listener[id]
    }

    // 推送事件
    // @param {string} event 事件名
    // @param {any} argv 参数
    // @returns {void}
    // @public
    emit(event, ...argv) {
        if (this.events[event]) {
            this.events[event].forEach(x => {
                x && x.handle(...argv)
                x && x.once && this.events[event]
                    .delete(x)
            })
        }
    }
}