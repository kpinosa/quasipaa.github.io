<template>
    <div class="App">
        <Head/>
        <Loading/>
        <router-view/>
    </div>
</template>

<script>
    import Head from "@/components/head.vue"
    import Loading from "@/components/loading.vue"
    
    // @Vue
    export default {
        name: "App",
        components: {
            Head,
            Loading
        }
    }
</script>

<style>
    @font-face {
        font-family: FMBook;
        src: url(./assets/FM-Book.otf);
    }
    
    @font-face {
        font-family: FMMedium;
        src: url(./assets/FM-Medium.otf);
    }
    
    * {
        margin: 0;
        padding: 0;
        font-size: 14px;
        font-family: FMBook, FMMedium, Microsoft YaHei, sans-serif;
    }

    body {
        background-color: #f8f9fa;
    }

    a {
        text-decoration: none;
        vertical-align: baseline;
    }

    input, select {
        outline: none;
    }

    button, .mhover {
        cursor: pointer;
        outline: none;
    }

    .v-shadow {
        box-shadow: 0px 1px 2px 0px rgba(60, 64, 67, 0.3), 
            0px 2px 6px 2px rgba(60, 64, 67, 0.15);
        background-color: #fff;
    }

    .scroll::-webkit-scrollbar { width: 0 !important; }
    .scroll { overflow: -moz-scrollbars-none; }
    .scroll { -ms-overflow-style: none; }

    .uncopy {
        user-select: none;
    }

    .disable {
        filter: grayscale(100%);
    }
    
    .strikethrough:after {
        transition: all .2s cubic-bezier(.15,.9,.34,.95);
        background-color: #000;
        position: absolute;
        height: 2px;
        display: block;
        content: '';
        top: 45%;
        left: 0;
        width: 0;
    }
    
    .strikethrough:hover:after {
        width: 100%;
    }
</style>