<template>
    <div class="SuperText">
        <div 
            class="super-line"
            :style="{
                width: lock ? '100%' : 0,
                top
            }"
        />
        <slot/>
    </div>
</template>

<script>
    export default {
        name: "SuperText",
        props: {
            lock: {
                type: Boolean,
                default: false
            },
            top: {
                type: String,
                default: "40%"
            }
        }
    }
</script>

<style>
    .SuperText {
        position: relative;
    }
    
    .SuperText .super-line {
        position: absolute;
        border-bottom: 2px solid #000;
        transition: all .3s cubic-bezier(.15,.9,.34,.95);
        z-index: 10;
        left: 0;
    }
</style>