<template>
  <div id="app" class="root">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
body {
  overflow: hidden;
}
.root {
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;
  font-family: -apple-system,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Arial,sans-serif;
}
</style>
