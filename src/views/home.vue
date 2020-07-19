<template>
    <div class="home">
        <div 
            ref="banner"
            class="banner uncopy"
            @mouseover="bannerMouse = true" 
            @mouseout="bannerMouse = false"
            @wheel="BannerWheel"
            :style="{
                opacity: !ready || iter ? 0 : 1,
                backgroundImage: background(),
                zIndex: iter ? 0 : 10
            }"
        >
            <Button 
                name="查看详情"
                @click="blink(index != null ? values[index] : false)"
            ></Button>
            <span 
                class="text-icon" 
                :style="{opacity: index != null ? 1 : 0}"
                v-for="(v, i) of 'PANDA'.split('')"
                :class="i == 4 ? 'AX': v" 
                :key="i"
            >{{ v }}</span>
            <img 
                v-show="bannerMouse" 
                class="arrow-left mhover" 
                src="@/assets/left.svg" 
                @click="ArrowLeft"
            />
            <img 
                v-show="bannerMouse" 
                class="arrow-right mhover" 
                src="@/assets/right.svg" 
                @click="ArrowRight"
            />
            <div 
                class="info" 
                :style="{color: index == null ? null : '#000'}"
            >
                <p>{{ index == null ? name : values[index].title }}</p>
                <span>{{ index == null ? detil : values[index].labels.join(' | ') }}</span>
                <h5>{{ index == null ? text : values[index].paragraph }}</h5>
            </div>
        </div>
        <div 
            class="bottom-list"
            :style="{opacity: ready ? 1 : 0}"
        >
            <div 
                :id="iter ? 'square' : 'round'" 
                class="select mhover uncopy" 
                @click=" iter = !iter "
            >
                <span 
                    v-for="(v, i) of state[iter ? 1 : 0].split('')" 
                    :key="i"
                >{{ v }}</span>
            </div>
            <div 
                class="list" 
                :style="{
                    opacity: iter ? 0 : 1,
                    zIndex: iter ? -10 : 10
                }"
            >
                <div 
                    class="body" 
                    v-for="(value, i) of slice(values)" 
                    :key="i"
                >
                    <div class="item">
                        <div 
                            class="value mhover" 
                            v-for="(v, x) of value" 
                            :key="v.index" 
                            @click=" index = (i * 3 + x) "
                        >
                            <span 
                                class="index" 
                                :style="{color: 
                                    index != null && 
                                    v.index == values[index].index ? 
                                    '#FF0000': null}"
                            >{{ String(v.index).padStart(4, '0') }}</span>
                            <span 
                                class="name" 
                                :style="{color: 
                                    index != null && 
                                    v.index == values[index].index ? 
                                    '#000': null}"
                            >{{ v.title }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="blogs">
            <div 
                class="line" 
                v-for="v of [20, 40, 60, 80]" 
                :style="{
                    left: v + '%'
                }"
            />
            <div class="docker scroll">
                <div 
                    class="body" 
                    :style="{
                        opacity: iter ? 1 : 0,
                        zIndex: iter ? 10 : -10
                    }"
                >
                    <div 
                        class="item mhover" 
                        v-for="value of values" 
                        :key="value.index"
                        @click="blink(value)"
                        @mouseover="value.lock = true"
                        @mouseout="value.lock = false"
                    >
                        <div 
                            class="avatar" 
                            :style="{
                                backgroundImage: 'url(' + value.avatar + ')'
                            }"
                        />
                        <p 
                            class="title strikethrough" 
                            :class="value.lock ? 'lock' : null"
                        >{{ value.title }}</p>
                        <div class="flag">{{ value.labels.join(', ') }}</div>
                        <div class="date">{{ (new Date(value.updatedAt)).toLocaleString() }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Avatar from "@/assets/avatar.jpg"
    import Button from "@/components/button.vue"
    import Delay from "@/delay.js"
    
    // @Vue
    export default {
        name: "Home",
        components: {
            Button
        },
        data() {
            return {
                index: null,
                iter: false,
                avatar: Avatar,
                bannerMouse: false,
                state: ["文章列表", "返回首页"],
                text: "什么都不会，什么都搞点",
                detil: "软件工程师",
                name: "Mr.Panda",
                values: [],
                delta: 0
            }
        },
        computed: {
            loading() { return this.$store.state.loading },
            ready() { return this.$store.state.ready }
        },
        methods: {
            
            // 数组分割
            slice(values) {
                let target = []
                for (let i = 0; i < Math.ceil(values.length / 3); i ++)
                    target.push(values.slice(i * 3, (i + 1) * 3))
                return target
            },
            
            // 背景
            background() {
                return "url(" + (
                    this.index == null ? this.avatar : 
                        this.values[this.index].avatar
                ) + ")"
            },
            
            // 后退
            ArrowLeft() {
                let isNone = this.index == 0 || this.index == null
                this.index = isNone ? null : this.index - 1
            },
            
            // 前进
            ArrowRight() {
                let isMax = this.index + 1 == this.values.length
                this.index = (this.index == null || isMax) ? 0 : 
                        this.index + 1
            },
            
            // 跳转
            blink(value) {
                !value && this.$router.push("/author")
                value && this.$router.push("/article/" + value.number)
                value && this.$store.getters.next(value)
            },
            
            // banner滚轮
            BannerWheel({ deltaY }) {
                this.delta += deltaY < 0 ? 
                    deltaY * -1 : deltaY
                if (this.delta < 400) return false
                deltaY > 0 ? this.ArrowRight() : 
                    this.ArrowLeft()
                this.delta = 0
            }
        },
        async mounted() {
            void await Delay()
            this.values = (await this.$api.initialize())
                .map(x => ({ ...x, lock: false }))
            this.$store.commit("ready")
        }
    }
</script>

<style>
    .home .banner {
        transition: all .5s cubic-bezier(.15,.9,.34,.95);
        background-position: 50%;
        background-size: cover;
        background-color: #848484;
        position: absolute;
        top: 150px;
        left: 80px;
        right: 80px;
        bottom: 150px;
        z-index: 10;
    }

    .home .banner .arrow-left {
        position: absolute;
        top: 48%;
        left: 50px;
        z-index: 10;
    }

    .home .banner .arrow-right {
        position: absolute;
        top: 48%;
        right: 50px;
        z-index: 10;
    }

    .home .banner .button {
        position: absolute;
        width: 15%;
        height: 45px;
        right: 160px;
        bottom: 150px;
    }

    .home .banner .info {
        position: absolute;
        max-width: 60%;
        color: #fff;
        left: 160px;
        top: 35%;
    }

    .home .banner .info p {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 2.3rem;
    }

    .home .banner .info span {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 1.2rem;
        margin-top: 10px;
        display: block;
    }

    .home .banner .info h5 {
        font-weight: inherit;
        margin-top: 50px;
    }

    .home .banner .text-icon {
        transition: all .3s cubic-bezier(.15,.9,.34,.95);
        position: absolute;
        font-weight: bold;
        font-size: 70px;
    }

    .home .banner .P { top: -50px; left: 20%; }
    .home .banner .A { top: 10%; left: 60%; }
    .home .banner .N { top: 40%; left: 50%; }
    .home .banner .D { top: 70%; left: 40%; }
    .home .banner .AX { bottom: -50px; left: 60%; }

    .home .bottom-list {
        position: absolute;
        left: 80px;
        right: 80px;
        height: 150px;
        bottom: 0;
        z-index: 10;
    }

    .home .bottom-list .select {
        border: 1px solid rgba(0, 0, 0, 0.1);
        transition: 0.3s;
        height: 50px;
        width: 52px;
        position: relative;
        margin-right: 42px;
        margin-top: 50px;
        display: table;
        color: #999;
        float: left;
    }

    .home .bottom-list .select:hover {
        border: 1px solid #000;
        color: #000;
    }

    .home .bottom-list .select * {
        transition: all .3s cubic-bezier(.15,.9,.34,.95);
    }

    .home .bottom-list .select span {
        float: left;
        text-align: center;
        line-height: 25px;
        font-size: 12px;
    }

    .home .bottom-list .list {
        position: fixed;
        right: 175px;
        left: 175px;
        bottom: 0;
        height: 150px;
    }

    .home .bottom-list .list .body {
        float: left;
        width: 20%;
        height: 150px;
    }

    .home .bottom-list .list .body .item {
        margin-top: 46px;
    }

    .home .bottom-list .list .body .item .value {
        color: rgba(0,0,0,.4);
        text-transform: uppercase;
        margin-bottom: 8px;
        display: flex;
        width: 100%;
    }

    .home .bottom-list .list .body .item .value .index {
        margin-right: 15px;
        margin-left: 15px;
    }

    .home .bottom-list .list .body .item .value span {
        transition: all .3s cubic-bezier(.15,.9,.34,.95);
        font-size: 12px;
    }

    .home .bottom-list .list .body .item .value .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 70%;
    }

    .home .bottom-list .list .body .item .value:hover {
        color: #000;
    }
    
    .home .bottom-list #square {
        border-radius: 50%;
    }

    .home .bottom-list #square span:nth-child(1) {
        position: relative;
        width: 25px;
        height: 25px;
        right: -3px;
        top: 3px;
    }

    .home .bottom-list #square span:nth-child(2) {
        position: relative;
        width: 25px;
        height: 25px;
        left: -3px;
        top: 3px;
    }

    .home .bottom-list #square span:nth-child(3) {
        position: relative;
        width: 25px;
        height: 25px;
        right: -3px;
        bottom: 3px;
    }

    .home .bottom-list #square span:nth-child(4) {
        position: relative;
        width: 25px;
        height: 25px;
        left: -3px;
        bottom: 3px;
    }

    .home .bottom-list #round span:nth-child(1) {
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        width: 25px;
        height: 24px;
    }

    .home .bottom-list #round span:nth-child(2) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        width: 25px;
        height: 24px;
    }

    .home .bottom-list #round span:nth-child(3) {
        width: 25px;
        height: 25px;
    }

    .home .bottom-list #round span:nth-child(4) {
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        width: 25px;
        height: 24px;
    }

    .home .blogs {
        position: fixed;
        height: 100%;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        left: 175px;
        right: 175px;
        top: 0;
    }

    .home .blogs .docker {
        position: absolute;
        overflow-y: auto;
        width:  100%;
        top: 150px;
        left: 0;
        bottom: 0;
    }

    .home .blogs .line {
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        position: absolute;
        height: 100%;
        top: 0;
    }

    .home .blogs .body {
        width: 100%;
        display: table;
        transition: all .3s cubic-bezier(.15,.9,.34,.95);
    }

    .home .blogs .body .item {
        margin-bottom: 40px;
        float: left;
        width: 20%;
    }

    .home .blogs .body .item .avatar {
        width: 90%;
        height: 250px;
        margin-left: 5%;
        background-size: cover;
        background-position: 50%;
    }

    .home .blogs .body .item .title {
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 90%;
        margin-left: 5%;
        margin-top: 20px;
        font-weight: bold;
        color: #000;
    }
    
    .home .blogs .body .item .lock:after {
        width: 100%;
    }

    .home .blogs .body .item .flag {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 90%;
        margin-left: 5%;
        color: #999;
        font-size: 12px;
        font-weight: bold;
    }

    .home .blogs .body .item .date {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 90%;
        margin-left: 5%;
        color: #999;
        font-size: 12px;
    }
</style>