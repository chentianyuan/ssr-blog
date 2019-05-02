<template>
  <header :class="['component--blog-header', ...classList]">
    <section class="box">
      <div>
        <router-link
        :class="['title', currentRoute === nav.link ? 'active-title' : '']"
        v-for="(nav, key) in defaultNav"
        :key="key"
        :to="{path: nav.link}">{{nav.title}}</router-link>
      </div>
      <div class="searchBox" v-if="false"></div>
    </section>
  </header>
</template>

<script>
const defaultNav = [
  { title: '首页', link: '/' },
  { title: '文章', link: '/articlePage' },
  { title: '项目', link: '/projectPage' },
  { title: '关于', link: '/aboutPage' },
  { title: '留言板', link: '/leaveBoard' }
]
export default {
  props: {
    classList: Array
  },
  data () {
    return {
      defaultNav
    }
  },
  computed: {
    currentRoute () {
      return this.$route.path
    }
  }
}
</script>

<style lang="less">
.component--blog-header {
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
  color: #909090;
  height: 60px;
  overflow: hidden;
  width: 100%;
  position: fixed;
  z-index: 2;
  // transition: .3s;
  transition: all .5s;
  .box {
    width: 900px;
    margin: 0 auto;
    height: 59px;
    .flex-initial(space-between, center);
    a {
      display: inline-block;
      height: 59px;
      transition: .3s;
      padding: 0 20px;
      position: relative;
      color: #8c8c8c;
      line-height: 59px;
      font-size: 20px;
    }
    .active-title {
      color: #3fb76c;
    }
  }
}
.hide-header {
  transform: translateY(-100%);
}
</style>
