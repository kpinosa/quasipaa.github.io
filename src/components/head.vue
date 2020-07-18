<template>
    <div 
        class="head animated"
        :class="ready ? 'fadeInDown' : null"
        :style="{
            opacity: ready ? 1 : 0
        }"
    >
        <div 
            class="logo mhover"
            @mouseover="lock = true" 
            @mouseout="lock = false"
        >
            <SuperText 
                top="50%"
                :lock="lock"
            >
                <img 
                    src="@/assets/logo.png"
                    @click="$router.push('/')"
                />
            </SuperText>
        </div>
        <a 
            class="link mhover" 
            href="https://github.com/quasipaa"
        >
            <span>GITHUB</span>
            <img src="@/assets/play.svg"/>
        </a>
    </div>
</template>

<script>
    import SuperText from "@/components/superText.vue"
    
    // @Vue
    export default {
        name: "Head",
        components: {
            SuperText
        },
        data() {
            return {
                lock: false
            }
        },
        computed: {
            loading() { return this.$store.state.loading },
            ready() { return this.$store.state.ready }
        }
    }
</script>

<style>
    .head {
        width: 100%;
        height: 150px;
        transition: 0.5s;
    }

    .head .logo {
        margin-left: 80px;
        float: left;
    }

    .head .logo img {
        height: 150px;
    }

    .head .link {
        float: right;
        margin-right: 80px;
        padding-top: 69px;
        color: #000;
    }

    .head .link span {
        color: #555;
        font-size: 12px;
        text-transform: uppercase;
    }
    
    .head .link span:hover {
        color: #000;
    }

    .head .link img {
        margin-left: 10px;
    }
</style>