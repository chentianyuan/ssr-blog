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
          <a v-for="(tag, key) in tags" :key="key" @click.stop="relatedArticle(tag)">
            {{ tag.tagName }}
            <i>({{tag.tagCount}})</i>
          </a>
        </div>
      </section>
    </main>
    <load-more-footer :loadMore="this.global.loadMoreFlag" :noMoreData="noMoreData" />
  </div>
</template>

<script>
import ArticleList from './component/artivle-list'
import LoadMoreFooter from './component/load-more'
import { PATHS, request } from '@/api'

const pageSize = 8
export default {
  // 不可省略，keep-alive忽略需要
  name: 'article',
  components: {
    ArticleList, LoadMoreFooter
  },
  data () {
    return {
      isDone: false,
      hotArticles: [],
      articleArray: [],
      tagsList: [],
      loadMore: false,
      noMoreData: false,
      pageIndex: 1
    }
  },
  watch: {
    'global.loadMoreFlag': {
      handler (n, o) {
        if (n) {
          this.pageIndex += 1
          this.loadPost()
        }
      }
    },
    '$route': function (n, o) {
      if (/articlePage/.test(n.fullPath)) {
        // 缓存组件不会被销毁
        this.refresh()
      }
    }
  },
  computed: {
    loadType () {
      return this.$route.query.tag ? 'byTag' : 'byPost'
    },
    tags () {
      return this.tagsList.map(({ tagName, count, id }) => ({
        tagName: String.prototype.toUpperCase.call(tagName[0]) + tagName.slice(1),
        tagCount: count,
        id
      }))
    },
    tagId () {
      return this.$route.query.tag
    },
    global () {
      return this.$store.state.global
    }
  },
  mounted () {
    request.get(PATHS.tag.getAlltags).then(res => {
      this.tagsList = res.data
    })
    this.loadPost()
  },
  activated () {
    this.refresh()
    console.log('触发activited钩子')
  },
  deactivated () {
    console.log('触发deactivited钩子')
  },
  beforeDestroy () {
    console.log('触发beforeDestroy钩子')
  },
  methods: {
    loadPost () {
      let paths = {
        'byTag': PATHS.article.getArticleByPaginationWithTag,
        'byPost': PATHS.article.getArticleByPagination
      }
      request.post(paths[this.loadType], Object.assign({
        pageIndex: this.pageIndex,
        pageSize
      }, this.tagId ? { tagId: this.tagId } : {})).then(res => {
        this.articleArray = this.articleArray.concat(res.data.postList)
        if (this.pageIndex * pageSize < res.data.count) {
          this.$store.commit('LOADMOREFLAG', false)
        } else {
          this.noMoreData = true
        }
      })
    },
    relatedArticle (tag) {
      this.$router.push(`${this.$route.path}?tag=${tag.id}`)
    },
    refresh () {
      this.noMoreData = false
      this.$store.commit('LOADMOREFLAG', false)
      this.articleArray = []
      this.loadPost()
    }
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
