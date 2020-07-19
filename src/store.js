export default function(Vuex) {
    return new Vuex.Store({
        state: {
            body: "",
            title: "",
            labels: [],
            updatedAt: "",
            loading: false,
            ready: false
        },
        mutations: {

            // 正常加载完成
            ready: function(state) {
                state.loading = true
                setTimeout(() => {
                    state.ready = true
                }, 3000)
            },

            // 快速加载完成
            firstReady: function(state) {
                state.loading = true
                state.ready = true
            }
        },
        getters: {

            // 选中博客更新
            next: function (state) {
                return function (article) {
                    state.updatedAt = article.updatedAt
                    state.labels = article.labels
                    state.title = article.title
                    state.body = article.body
                }
            }
        }
    })
}