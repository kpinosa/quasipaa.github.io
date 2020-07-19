<template>
    <div class="article scroll">
        <div 
            ref="markdown"
            class="markdown" 
            v-html="render(body)"
            :style="{opacity}"
        />
    </div>
</template>

<script>
    export default {
        name: "Article",
        data() {
            return {
                opacity: 0      
            }
        },
        computed: {
            body() { return this.$store.state.body },
            title() { return this.$store.state.title },
            labels() { return this.$store.state.labels },
            comments() { return this.$store.state.comments },
            updatedAt() { return (new Date(this.$store.state.updatedAt)).toDateString() }
        },
        methods: {
            
            // 渲染
            render(markdown) {
                let target = ""
                if (markdown == "") return ""
                let source = this.$markdown.render(markdown)
                let label = this.labels.map(x => `<span>${x}</span>`)
                let node = source.match(/<img.*?src="(.*?)".*?\/?>/g)[0]
                source = source.replace(/<ul(([\s\S])*?)<\/ul>/, "")
                target += `<div class="title">${this.title}</div>`
                target += `<div class="date">${this.updatedAt}</div>`
                return source.replace(node, [node, target,
                    `<div class="line"></div>`,
                    `<div class="label">${label}</div>`,
                    `<div class="split"></div>`
                ].join(""))
            }
        },
        created() {
            this.$api.issue(this.$router.history.current.params.id).then(x => {
                this.$store.getters.next(x)
                this.opacity = 1
            })
        }
    }
</script>

<style>
    .article {
        overflow-y: auto;
        position: fixed;
        height: 100%;
        left: 174px;
        right: 174px;
        top: 0;
    }
    
    .article .markdown {
        transition: all .5s cubic-bezier(.15,.9,.34,.95);
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        padding: 60px 30px;
        width: 800px;
        margin: 0 auto;
    }
    
    .article .markdown .title {
        font-size: 2.5em;
        font-weight: 500;
        line-height: 1;
        font-family: FMMedium;
        margin-bottom: 10px;
    }
    
    .article .markdown .date {
        font-family: inherit;
        font-size: 0.8rem;
        color: #999;
        float: left;
    }
    
    .article .markdown .line {
        border-bottom: 1px solid #ccc;
        margin: 0 10px;
        position: relative;
        width: 50px;
        float: left;
        top: 0.4rem;
    }
    
    .article .markdown .label {
        margin-left: 50px;
        color: #999;
    }
    
    .article .markdown .label span {
        font-size: 0.8rem;
    }
    
    .article .markdown .split {
        margin-bottom: 40px;
        width: 100%;
        float: left;
    }
    
    .article .markdown img {
        margin-bottom: 100px;
        width: 100%;
    }
    
    .article .markdown h3 {
        font-weight: inherit;
        font-size: 1.5rem;
        margin-top: 20px;
        margin-bottom: 10px;
        font-family: FMMedium;
        color: #24292e;
    }
    
    .article .markdown p {
        margin-top: 5px;
        color: #555;
    }
</style>