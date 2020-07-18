<template>
    <div 
        class="head animated"
        :class="ready ? 'fadeInDown' : null"
        :style="{
            opacity: ready ? 1 : 0
        }"
    >
        <div class="logo mhover strikethrough">
            <img 
                src="@/assets/logo.png"
                @click="$router.push('/')"
            />
        </div>
        <a 
            target="_blank"
            class="link mhover"
            href="https://github.com/quasipaa"
        >
            <span>GITHUB</span>
            <img src="@/assets/play.svg"/>
        </a>
    </div>
</template>

<script>
    export default {
        name: "Head",
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
        position: relative;
        margin-left: 80px;
        float: left;
    }
    
    .head .logo:after {
        top: 50%;
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