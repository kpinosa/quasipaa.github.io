import Home from "@/views/home.vue"
import Article from "@/views/article.vue"
import Author from "@/views/author.vue"

export default function (Router) {return new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
        path: "/",
        name: "Home",
        component: Home
    }, {
        path: "/author",
        name: "Author",
        component: Author
    }, {
        path: "/article/:id",
        name: "Article",
        component: Article
    }]
})}