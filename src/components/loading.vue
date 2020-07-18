<template>
    <div 
        class="loading"
        :style="{
            zIndex: ready ? -100 : 100,
            opacity: ready ? 0 : 1  
        }"
    >
        <div class="name">
            Mr.Panda
        </div>
        <div class="line">
            <div 
                class="roand"
                :style="{
                    width: width + '%'
                }"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: "Loading",
        data() {
            return {
                width: 0
            }  
        },
        computed: {
            loading() { return this.$store.state.loading },
            ready() { return this.$store.state.ready }
        },
        watch: {
            loading(x) {
                this.width = this.width + 50
            }  
        },
        mounted() {
            setTimeout(() => {
                this.width = this.width + 50
            }, 500)
        }
    }
</script>

<style>
    .loading {
        transition: 0.5s;
        background-color: rgb(149 149 150 / 38%);
        text-align: center;
        position: fixed;
        top: 150px;
        left: 80px;
        bottom: 150px;
        right: 80px;
    }
    
    .loading .name {
        margin-top: 30vh;
        font-size: 1.2rem;
        text-transform: uppercase;
    }
    
    .loading .line {
        width: 15rem;
        height: 5px;
        background-color: #fff;
        margin: 0 auto;
        margin-top: 20px;
        position: relative;
    }
    
    .loading .line .roand {
        background-color: #000;
        transition: 3s;
        position: absolute;
        height: 100%;
        width: 0;
        top: 0;
        left: 0;
    }
</style>