<template>
  <div id="app" class="root">
    <blog-header v-if="!isHomePage"></blog-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import blogHeader from './components/blogHeader.vue'
export default {
  name: 'app',
  components: {
    blogHeader
  },
  computed: {
    isHomePage () {
      const whiteList = ['app', 'Not-Found']
      let path = this.$route.name
      return whiteList.includes(path)
    }
  }
}
</script>

<style lang="less">
@import "~@/styles/font.less";
@import "~@/styles/common.less";
html, body, #app {
  overflow: hidden;
  height: 100%;
}
.root {
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;
  font-family: -apple-system,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Arial,sans-serif;
}
</style>
