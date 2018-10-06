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
@import './style/base.less';
body {
  overflow: hidden;
}
.root {
  background-color: #f4f5f5;
  min-height: 100vh;
  overflow: hidden;
  font-family: -apple-system,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Arial,sans-serif;
}
</style>
