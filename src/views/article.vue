<template>
    <div class="article scroll">
        <div 
            ref="markdown"
            class="markdown" 
            v-html="render(body)"
        />
    </div>
</template>

<script>
    import { Issue } from "@/api.js"
    
    // @Vue
    export default {
        name: "Article",
        computed: {
            body() { return this.$store.state.body },
            title() { return this.$store.state.title },
            updatedAt() { return (new Date(this.$store.state.updatedAt)).toDateString() }
        },
        methods: {
            
            // 渲染
            render(markdown) {
                let target = ""
                if (markdown == "") return ""
                let source = this.$markdown.render(markdown)
                let node = source.match(/<img.*?src="(.*?)".*?\/?>/g)[0]
                let label = markdown.match(/\*([\s\S]*?)[\r\n]/g)[0]
                    .split("*")[1].replace(/\s/g, "").split(",")
                    .map(x => x.replace(/`/g, ""))
                    .map(x => `<span>${x}</span>`)
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
            Issue(this.$router.history.current.params.id).then(x => {
               this.$store.getters.next(x)
            })
        }
    }
</script>

<style>
    .article {
        overflow-y: auto;
        position: fixed;
        height: 100%;
        left: 175px;
        right: 175px;
        top: 0;
    }
    
    .article .markdown {
        padding-top: 60px;
        padding-bottom: 60px;
        width: 800px;
        margin: 0 auto;
    }
    
    .article .markdown .title {
        font-size: 2.5em;
        font-weight: 500;
        line-height: 1.25;
        font-family: FMMedium;
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
        font-family: FMMedium;
        color: #24292e;
    }
    
    .article .markdown p {
        margin-top: 10px;
        color: #555;
    }
</style>