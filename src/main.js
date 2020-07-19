import Vue from "vue"
import Vuex from "vuex"
import VueRouter from "vue-router"

import App from "./app.vue"
import Api from "@/api.js"
import router from "./router.js"
import store from "./store.js"
import * as util from "./lib/util.js"
import Markdown from "markdown-it"
import "./assets/animate.css"

Vue.config.productionTip = false
Vue.prototype.$markdown = new Markdown()
Vue.prototype.$api = new Api()
Vue.prototype.$util = util

Vue.use(VueRouter)
Vue.use(Vuex)

new Vue({
    store: store(Vuex),
    router: router(VueRouter),
    render: x => x(App)
}).$mount(".App")
