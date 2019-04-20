<template>
  <header class="component--blog-header">
    <section class="box">
      <nav>
        <router-link
        :class="['title', currentRoute === nav.link ? 'actived-title' : '']"
        v-for="(nav, key) in defaultNav"
        :key="key"
        :to="{path: nav.link}">{{nav.title}}</router-link>
      </nav>
      <div class="searchBox" v-if="false"></div>
    </section>
  </header>
</template>

<script>
const defaultNav = [
  { title: '首页', link: '/' },
  { title: '文章', link: '/articlePage' },
  { title: '其他', link: '/otherPage' },
  { title: '项目', link: '/projectPage' },
  { title: '关于', link: '/aboutPage' }
]
export default {
  data () {
    return {
      defaultNav,
      currentRoute: this.$route.path
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
  transition: .3s;
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
  }
}
</style>
