<template>
  <div :class="['page-article', 'hack-padding']" ref="scrollWrap">
    <main class="page-article--main">
      <!-- 文章列表 -->
      <article-list :articles="articleArray"></article-list>
      <section class="page-article--slide">

        <div>
          <h3 class="page-article--article-title">热门文章</h3>
          <div class="page-article--article-list">
            <p v-for="(article, key) in gethotArticles" :key="key">
              <router-link :to="{path: `/article/${article.id}`}">{{ article.descript }}</router-link>
            </p>
          </div>
        </div>

        <div class="stickyWrap" ref="tagWrap" :style="{'margin-top': '15px'}">

          <h3 class="page-article--tag-title">标签</h3>
          <div class="page-article--tag-list">
            <a class="tag-a" v-for="(tag, key) in tags" :key="key" @click.stop="relatedArticle(tag)">
              {{ tag.tagName }}
              <i>({{tag.tagCount}})</i>
            </a>
          </div>

          <div class="page-article--small-nav">
            <div class="dash"></div>
            <div>
              <router-link to="/aboutPage">我</router-link>
              <i>•</i>
              <router-link to="/leaveBoard">留言墙</router-link>
              <i>•</i>
              <router-link to="/">归档</router-link>
            </div>
          </div>
        </div>
      </section>
    </main>
    <load-more-footer :loadMore="this.global.loadMoreFlag" :noMoreData="noMoreData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ArticleList from './component/artivle-list'
import LoadMoreFooter from './component/load-more'
import { PATHS, request } from '@/api'

const pageSize = 8
export default {
  // 不可省略，keep-alive忽略需要
  name: 'article',
  asyncData ({ context, store, route }) {
    let headerParams = {
      params: { num: 7 },
      context
    }
    return store.dispatch('getHotPosts', headerParams)
  },
  components: {
    ArticleList, LoadMoreFooter
  },
  data () {
    return {
      isDone: false,
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
    ...mapGetters([
      'gethotArticles'
    ]),
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
    console.log(this.$refs.tagWrap.getBoundingClientRect())
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
  &--tag-title, &--article-title {
    font-size: 16px;
  }
  &--tag-list, &--article-list {
    margin-top: 10px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 6px;
    .tag-a {
      display: inline-block;
      padding: 10px;
    }
    a:hover {
      text-decoration: underline;
    }
    p {
      font-weight: 400;
      line-height: 40px;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  &--small-nav {
    margin-top: 20px;
    width: 100%;
    position: relative;
    color: #797979;
    .dash {
      width: 35%;
      height: 1px;
      background: #f1f1f1;
      margin-bottom: 20px;
    }
    a {
      padding: 0 5px;
      color: #797979;
    }
  }
}
.stickyWrap {
  position: sticky;
  top: 60px;
}
</style>
