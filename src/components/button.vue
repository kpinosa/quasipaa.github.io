<template>
    <button 
        class="button mhover" 
        @mouseover="lock = true" 
        @mouseout="lock = false"
        @click="click"
        :style="{
            color: lock ? '#000' : null
        }"
    >
        <div 
            class="angie" 
            :style="{
                width: lock ? '100%' : null
            }"
        />
        <span>
            {{ name }}
        </span>
    </button>
</template>

<script>
    export default {
        name: "Button",
        props: {
            name: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                lock: false
            }
        },
        methods: {
            click() {
                this.$emit("click")
            }
        }
    }
</script>

<style>
    .button {
        border: 0;
        right: 80px;
        color: #fff;
        background-color: #000;
        transition: all .3s cubic-bezier(.15,.9,.34,.95);
        position: relative;
    }

    .button .angie {
        transition: all .3s cubic-bezier(.15,.9,.34,.95);
        background-color: #fff;
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        width: 0;
        z-index: 0;
    }

    .button span {
        z-index: 1;
        position: relative;
    }
</style>