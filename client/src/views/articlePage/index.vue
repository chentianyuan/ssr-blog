<template>
  <div :class="['page-article', 'hack-padding']" ref="scrollWrap">
    <main class="page-article--main">
      <!-- 文章列表 -->
      <article-list :articles="articleArray"></article-list>
      <section class="page-article--slide">

        <!-- <div class="hot-title">热门文章</div>
        <div class="hot-article">
          <h3 v-for="(hot, key) in hotArticles" :key="key">
            <route-link>article.title</route-link>
          </h3>
        </div> -->

        <div class="page-article--tag-title">标签</div>
        <div class="page-article--tag-list">
          <a v-for="(tag, key) in tags" :key="key" @click="changeList">
            {{ tag.tagName }}
            <i>({{tag.tagCount}})</i>
          </a>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import articleList from './component/artivle-list'
import { PATHS, request } from '@/api'
export default {
  components: {
    articleList
  },
  data () {
    return {
      isDone: false,
      hotArticles: [],
      articleArray: []
      // tags: ['vue', 'react', 'webpack', 'pwa'].map(str => String.prototype.toUpperCase.call(str[0]) + str.slice(1))
    }
  },
  methods: {
    changeList () {},
    scrollHandler (e) {
      let wrap = this.$refs.scrollWrap
      console.log(wrap.scrollTop)
    }
  },
  watch: {
    'global.loadMoreFlag': function () {
      console.log('加载更多')
    }
  },
  computed: {
    tags () {
      return ['vue', 'react', 'webpack', 'pwa'].map(str => ({
        tagName: String.prototype.toUpperCase.call(str[0]) + str.slice(1),
        tagCount: Math.floor(Math.random() * 20)
      }))
    },
    global () {
      return this.$store.state.global
    }
  },
  mounted () {
    request.get(PATHS.article.getAllarticles).then(res => {
      console.log(res)
    })
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
  box-sizing: border-box;
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
    flex-shrink: 0;
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
