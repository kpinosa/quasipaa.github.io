"use strict"

// @const
const REG_PHONE = /^[1][3,4,5,7,8][0-9]{9}$/
const REG_ADDRESS = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/
const REG_EMAIL = /^[A-Za-z\\d]+([-_.][A-Za-z\\d]+)*@([A-Za-z\\d]+[-.])+[A-Za-z\\d]{2,4}$/

// deep Strict Equal
// @param {any} source
// @param {any} target
// @param {string} code
export function deepStrictEqual(source, target, code) {
    if (source !== target) throw new Error(code)
}

// is ip address.
// @param {string} ip
export function IsAddr (addr) {
    return REG_ADDRESS.test(addr)
}

// is timeout.
// @param {number} date End data.
// @param {number} timeout
export function IsTimeout (date, timeout) {
    return date < (Date.now() - timeout)
}

// is some.
// @param {any} value
export function IsSome (value) {
    return (value !== null && value !== undefined)
}

// is phone.
// @param {string} phone
export function IsPhone (phone) {
    return REG_PHONE.test(phone)
}

// is eamil.
// @param {string} eamil
export function IsEmail (email) {
    return REG_EMAIL.test(email)
}

// Page turning parameter processing.
// @param {PaginationOpts}
export function Pagination({ page = 1, limit = 10 }) {
    if (typeof page === "string") page = Number(page)
    if (typeof limit === "string") limit = Number(limit)
    return { skip: (page - 1) * limit, limit }
}

// params promise.
// @params {any} arg
// @params {string} code
export function Allow(value, code) {
    deepStrictEqual(value !== null && value !== undefined, true, code)
    return value
}

// Thread sleep.
// @params {number} timeout
export function Sleep(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout)
    })
}

// Positive integer check.
// @params {number} value
export function IsInt(value) {
    return !String(value).includes(".") && 
        !String(value).includes("-")
}

// Retry function.
// @params {number} int
// @params {function} process
export async function Retry(int, process) {
    let index = 0, result = null, hook = e => { index += 1, result = e }
    while (index < int) { try { return await process(index) } catch (e) { hook(e) } }
    throw result
}

// to Boolean.
// @param {*any} value
export function Boolean(value) {
    value = typeof value === "string" ? value === "true" : value
    value = Boolean(value)
    return value
}

// wrap err.
// @param {async function} value
// @param {any} pad
export async function Warp(value, pad) {
    try { return await value } catch(_) { return pad }
}

// map object.
// @param {value} object
// @param {handle} process function
export function ObjectMap(value, handle) {
    for (let key in value) value[key] = handle(key, value[key])
    return value
}