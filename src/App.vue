<template>
  <div id="prerenderWrap">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:'app'
  // 页面容器
}
</script>

<style lang="less">
  *{
    padding:0;
    margin:0;
  }
  a{
    text-decoration: none;
  }
</style>
