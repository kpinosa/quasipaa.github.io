export default function(Vuex) {
    return new Vuex.Store({
        state: {
            body: "",
            title: "",
            updatedAt: "",
            loading: false,
            ready: false
        },
        mutations: {

            // 正常加载完成
            ready(state) {
                state.loading = true
                setTimeout(() => {
                    state.ready = true
                }, 3000)
            },

            // 快速加载完成
            firstReady(state) {
                state.loading = true
                state.ready = true
            }
        },
        getters: {

            // 选中博客更新
            next: (state) => (value) => {
                state.body = value.body
                state.title = value.title
                state.updatedAt = value.updatedAt
            }
        }
    })
}