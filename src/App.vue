<template>
  <div id="app">
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
  @media screen and (max-width: 375px){
    html,body{
      font-size: 100px !important;
    }
  }
</style>
 