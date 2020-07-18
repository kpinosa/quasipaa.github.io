import Vue from "vue"
import Vuex from "vuex"
import VueRouter from "vue-router"

import App from "./app.vue"
import router from "./router.js"
import store from "./store.js"
import * as util from "./lib/util.js"
import { Issues } from "@/api.js"
import Markdown from "markdown-it"
import "./assets/animate.css"

Vue.config.productionTip = false
Vue.prototype.$markdown = new Markdown()
Vue.prototype.$issues = new Issues()
Vue.prototype.$util = util

Vue.use(VueRouter)
Vue.use(Vuex)

new Vue({
    store: store(Vuex),
    router: router(VueRouter),
    render: x => x(App)
}).$mount(".App")
