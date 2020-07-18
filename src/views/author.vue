<template>
    <div class="author">
        <div 
            class="line" 
            v-for="v of [20, 40, 80]" 
            :style="{
                left: v + '%'
            }"
        />
        <div class="body">
            <div class="row">
                <div class="value">
                    <div class="title">
                        About
                    </div>
                    <div class="username">
                        YIN PAN
                    </div>
                    <div class="info">
                        <p>男 - 1994-10-07 - 天秤座</p>
                        <p>湖南省常德市 - 广东省广州市</p>
                        <p>华南师范学院 (SCNU) - 心理学</p>
                        <p>xivistudios@gmail.com</p>
                    </div>
                </div>
                <div class="value">
                    <div class="link">
                        <a 
                            target="_blank"
                            class="mhover"
                            href="https://github.com/quasipaa"
                        >github</a>
                        <a 
                           target="_blank"
                           class="mhover"
                           href="https://github.com/quasipaa"
                        >facebook</a>
                        <a 
                           target="_blank"
                           class="mhover"
                           href="https://github.com/quasipaa"
                        >telegarm</a>
                        <a 
                            target="_blank"
                            class="mhover"
                            href="https://github.com/quasipaa"
                            style="border-bottom: 0"
                        >qq</a>
                    </div>
                    <div class="title">
                        Language
                    </div>
                    <ul class="language">
                        <li>WebAssembly</li>
                        <li>JavaScript</li>
                        <li>TypeScript</li>
                        <li>Node.JS</li>
                        <li>Rust</li>
                        <li>Go</li>
                        <li>Python</li>
                        <li>Scala</li>
                    </ul>
                    <div class="title">
                        Experience
                    </div>
                    <ul class="company">
                        <li>Xivic - Web front-end development</li>
                        <li>Cheng Hui - IoT development</li>
                        <li>XGame - Network development</li>
                        <li>JesseHealth - Tech Leader</li>
                        <li>Fission - Tech Leader</li>
                    </ul>
                </div>
                <div class="value" style="width: 40%;">
                    <div class="title" style="margin-left: 5%;">
                        Project
                    </div>
                    <ul class="repositories">
                        <li
                            class="item"
                            v-for="(value, i) of reops"
                            :key="i"
                        >
                            <a 
                                class="strikethrough"
                                :href="value.url" 
                                target="_blank"
                            >
                                <span class="name">{{ value.name }}</span>
                                <span class="star">- ({{ value.stargazers.nodes.length }}) -</span>
                                <span class="description">{{ value.description }}</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="value">
                    <div class="avatar">
                        <img src="@/assets/user.jpg"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Reops } from "@/api.js"
    
    // @Vue
    export default {
        name: "Author",
        data() {
            return {
                reops: []
            }  
        },
        async mounted() {
            this.reops = await Reops()
        }
    }
</script>

<style>
    .author {
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        position: fixed;
        height: 100%;
        left: 174px;
        right: 174px;
        top: 0;
    }
    
    .author .line {
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        position: absolute;
        height: 100%;
        top: 0;
    }
    
    .author .body {
        position: absolute;
        width: 100%;
        top: 150px;
        bottom: 0;
        
    }
    
    .author .body .row {
        display: block;
        margin-bottom: 40px;
    }
    
    .author .body .value {
        width: 20%;
        float: left;
    }
    
    .author .body .value .title {
        font-weight: bold;
        margin-left: 10%;
        font-size: 1.3em;
    }
    
    .author .body .value .username {
        font-weight: bold;
        margin-left: -10%;
        margin-top: 100px;
        font-size: 5em;
    }
    
    .author .body .value .info {
        margin-left: 10%;
        margin-top: 40px;
    }
    
    .author .body .value .info p {
        font-size: .688em;
        line-height: 1.9em;
    }
    
    .author .body .value .language {
        text-transform: uppercase;
        margin-bottom: 40px;
        margin-left: 10%;
        margin-top: 15px;
    }
    
    .author .body .value .language li {
        font-size: .688em;
        line-height: 1.7em;
    }
    
    .author .body .value .link {
        margin-bottom: 40px;
    }
    
    .author .body .value .link a {
        border-bottom: 1px solid rgba(0,0,0,.07);
        transition: all .3s cubic-bezier(.15,.9,.34,.95);
        text-transform: uppercase;
        display: block;
        color: #000;
        padding-bottom: 1px;
        font-size: .688em;
        margin: 0 5px 9px;
        position: relative;
        margin-left: 10%;
        width: 80%;
    }
    
    .author .body .value .link a:before {
        transition: all .3s cubic-bezier(.15,.9,.34,.95);
        display: block;
        position: absolute;
        width: 0;
        content: '';
        height: 1px;
        top: 45%;
        background-color: #000;
        left: 0;
    }
    
    .author .body .value .link a:hover {
        padding-left: 20px;
    }
    
    .author .body .value .link a:hover:before {
        width: 15px;
    }
    
    .author .body .value .company {
        text-transform: uppercase;
        margin-left: 10%;
        margin-top: 15px;
    }
    
    .author .body .value .company li {
        font-size: .688em;
        line-height: 1.7em;
    }
    
    .author .body .value .avatar img {
        width: 100%;
    }
    
    .author .body .value .repositories {
        margin-left: 5%;
        margin-top: 15px;
        width: 90%;
    }
    
    .author .body .value .repositories .item {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    
    .author .body .value .repositories .item * {
        font-size: 0.9em;
        line-height: 1.5em;
        color: #000;
    }
    
    .author .body .value .repositories .item a {
        position: relative;   
    }
    
    .author .body .value .repositories .item .name {
        text-transform: uppercase;
    }
    
    .author .body .value .repositories .item .name,
    .author .body .value .repositories .item .star {
        margin-right: 10px;
    }
</style>