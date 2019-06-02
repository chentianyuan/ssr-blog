<template>
  <div id="app" class="root" ref="root" @scroll="scrollHandler">
    <!-- 顶部导航 -->
    <guide-header :classList="[isDone ? 'hide-header' : '']" v-show="!hideHeader"></guide-header>
    <!-- canvas背景 -->
    <canvas-bg></canvas-bg>
    <!-- 路由导航 -->
    <keep-alive :exclude="['article']">
      <router-view></router-view>
    </keep-alive>
    <!-- 站脚 -->
    <div class="footer-outer--wrap">
      <common-footer :hide="hideFooter"></common-footer>
    </div>
  </div>
</template>

<script>
import guideHeader from './components/guide-header.vue'
import canvasBg from './components/canvas-bg'
import commonFooter from './components/common-footer'

// 新增节流函数
let timer = null
let throttle = function (fn, ms = 300) {
  timer = null
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      fn.call(this)
      timer = null
    }, ms)
  }
}
export default {
  name: 'app',
  components: {
    guideHeader, canvasBg, commonFooter
  },
  data () {
    return {
      isDone: false,
      preLoc: 0
    }
  },
  computed: {
    hideHeader () {
      const whiteList = ['Home', 'Not-Found']
      let path = this.$route.name
      return whiteList.includes(path)
    },
    hideFooter () {
      const whiteList = ['Home']
      let path = this.$route.name
      return whiteList.includes(path)
    },
    loadMoreFlag: {
      get () {
        return this.$store.getters.getloadMoreFlag
      },
      set (n) {
        return this.$store.commit('LOADMOREFLAG', n)
      }
    }
  },
  methods: {
    scrollHandler: throttle(function (e) {
      const root = this.$refs.root
      if (root.scrollTop > 60) {
        this.isDone = root.scrollTop > this.preLoc
      } else {
        this.isDone = false
      }
      this.preLoc = root.scrollTop
      // scrollHeight 获取元素内容高度 最大
      // scrollTop 获取元素滚动的距离
      // clientHeight 获取可见高度
      if (root.scrollHeight - root.scrollTop < root.clientHeight + 5 && !this.loadMoreFlag) {
        this.loadMoreFlag = true
      }
    }, 100)
  }
}
</script>

<style lang="less">
@import "~@/styles/font.less";
@import "~@/styles/common.less";
html, body, #app {
  overflow: auto;
  height: 100%;
}
.root {
  min-height: 100vh;
  overflow: hidden;
}
.footer-outer--wrap {
  height: 50px;
}
.swim-text {
  cursor: initial;
  user-select: none;
  animation: swim 2s ease-out forwards;
}

@keyframes swim {
  from {
    margin-top: 0px;
    opacity: 1;
  }
  to {
    margin-top: -100px;
    opacity: 0;
  }
}
</style>
