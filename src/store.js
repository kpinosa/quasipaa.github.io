export default function(Vuex) {return new Vuex.Store({
    state: {
        body: "",
        title: "",
        updatedAt: "",
        loading: false,
        ready: false
    },
    mutations: {
        ready(state) {
            state.loading = true
            setTimeout(() => {
                state.ready = true
            }, 3000)
        }
    },
    getters: {
        next: (state) => (value) => {
            state.body = value.body
            state.title = value.title
            state.updatedAt = value.updatedAt
        }
    }
})}