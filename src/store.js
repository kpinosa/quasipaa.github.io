export default function(Vuex) {
    return new Vuex.Store({
        state: {
            body: "",
            title: "",
            updatedAt: ""
        },
        getters: {
            
            // 路由更新
            next: function(state) {
                return function(value) {
                    state.body = value.body
                    state.title = value.title
                    state.updatedAt = value.updatedAt
                }
            }
        }
    })
}