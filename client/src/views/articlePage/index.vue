<template>
  <div class="page-article hack-padding">
    <main class="page-article--main">
      <!-- 文章列表 -->
      <article-list></article-list>
      <section class="page-article--slide">

        <!-- <div class="hot-title">热门文章</div>
        <div class="hot-article">
          <h3 v-for="(hot, key) in hotArticles" :key="key">
            <route-link>article.title</route-link>
          </h3>
        </div> -->

        <div class="page-article--tag-title">标签</div>
        <div class="page-article--tag-list">
          <a  v-for="(tag, key) in tags" :key="key">
            <route-link>{{ tag }}</route-link>
          </a>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import articleList from './component/artivle-list'
export default {
  components: {
    articleList
  },
  data () {
    return {
      hotArticles: [],
      tags: ['vue', 'react', 'webpack', 'pwa'].map(str => String.prototype.toUpperCase.call(str[0]) + str.slice(1))
    }
  },
  mounted () {
    console.log('mounted钩子')
  },
  activated () {
    console.log('触发activited钩子')
  },
  deactivated () {
    console.log('触发deactivited钩子')
  },
  beforeDestroy () {
    console.log('触发beforeDestroy钩子')
  }
}
</script>

<style lang="less">
@prefix: page-article;
.@{prefix} {
  &--main {
    display: flex;
    width: 900px;
    margin: 0 auto;
    justify-content: space-between;
  }
  &--slide {
    flex-basis: 250px;
    box-sizing: border-box;
    padding-top: 24px;
  }
  &--tag-title {
    font-size: 16px;
  }
  &--tag-list {
    margin-top: 10px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 6px;
    a {
      display: inline-block;
      padding: 10px;
    }
    a:hover {
      text-decoration: underline;
    }
  }
}
</style>
