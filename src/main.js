import Vue from "vue"
import Vuex from "vuex"
import VueRouter from "vue-router"

import App from "./app.vue"
import router from "./router.js"
import store from "./store.js"
import Axios from "./lib/axios.js"
import * as util from "./lib/util.js"
import EventEmitter from "./lib/events.js"

import { faAt } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faFacebook, faQq, faTelegram } from "@fortawesome/free-brands-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import Markdown from "markdown-it"

library.add(
    faGithub, faFacebook, faAt, faQq,
    faTelegram
)

Vue.config.productionTip = false
Vue.prototype.$events = new EventEmitter()
Vue.prototype.$axios = new Axios(Vue.prototype.$events)
Vue.prototype.$markdown = new Markdown()
Vue.prototype.$util = util

Vue.component("Icon", FontAwesomeIcon)
Vue.use(VueRouter)
Vue.use(Vuex)

new Vue({
    store: store(Vuex),
    router: router(VueRouter),
    render: x => x(App)
}).$mount(".App")
