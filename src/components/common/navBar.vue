<template>
    <header class='navBar'>
        <slot></slot>
    </header>
</template>

<script>
export default {
    name:'navBar'
}
</script>

<style lang="less" scoped>
    .navBar{
        color: red;
    }
</style>
