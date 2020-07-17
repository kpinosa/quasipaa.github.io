import Home from "@/views/home.vue"
import Article from "@/views/article.vue"

export default function (Router) {
    return new Router({
        mode: "history",
        base: process.env.BASE_URL,
        routes: [{
            path: "/",
            name: "Home",
            component: Home
        }, {
            path: "/article/:id",
            name: "Article",
            component: Article
        }]
    })
}