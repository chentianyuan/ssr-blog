<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  // 页面容器
  data () {
    return {}
  }
}
</script>

<style>
@import './static/a.less';
* {
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
}
</style>
