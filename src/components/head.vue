<template>
    <div class="head">
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
        <div class="link mhover">
            <span>GITHUB</span>
            <img src="@/assets/play.svg"/>
        </div>
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
        }
    }
</script>

<style>
    .head {
        width: 100%;
        height: 150px;
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

    .head .link img {
        margin-left: 10px;
    }
</style>