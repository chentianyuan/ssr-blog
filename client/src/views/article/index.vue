<template>
  <section class="article-main hack-padding">
    <!-- 文章部分 -->
    <div class="markdown article-main-wrap" v-html="markdown"></div>
    <!-- 文章detail -->
    <div class="article-main-detail">
      <p>本文于{{new Date(post.created_at).toLocaleString()}}发布，浏览量{{post.meta ? post.meta.views : 'x'}}次</p>
      <p v-if="post.tags && post.tags.length">标签：<router-link :to="{path: `/articlePage?tag=${tag.id}`}" v-for="(tag, key) in post.tags" :key="key">{{tag.tagName}}&nbsp;&nbsp;</router-link></p>
      <p>作者：ytc</p>
      <p>链接：{{href}}</p>
      <p>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</p>
    </div>
    <!-- 华丽丽的分割线 -->
    <div class="splitter-line"></div>
    <!-- 统计区 -->
    <div class="statistics-line">
      <div class="statistics-line-left">
        <span :class="['statistics-line-left-like', isLiked ? 'coral' : '']" @click="likeHandler"><i class="iconfont icon">{{ isLiked ? '&#xe63a;' : '&#xe7aa;' }}</i>{{post.meta ? post.meta.likes : -1}}人喜欢</span>
        <span class="statistics-line-left-comment" v-if="post.meta && post.meta.comments">{{post.meta.comments}}条评论</span>
      </div>
    </div>
    <!-- 发射区 -->
    <div class="article-main-comment">
      <div class="article-main-comment-wrap">
        <section class="article-main-comment-info">
          <input type="text" placeholder="称呼*" v-model="params.name"/>
          <input type="text" placeholder="邮箱（不会公开）*" v-model="params.email"/>
          <input type="text" placeholder="友链*（http, https:// 开头）" v-model="params.link" />
        </section>
        <section class="article-main-comment-text">
          <textarea  @focus="focuText = true" @blur="focuText = false" v-model="params.content" class="article-main-comment-text-textarea" name="content" cols="30" rows="10"  placeholder="来了老弟~"></textarea>
        </section>
        <div class="article-main-comment-btn">
          <transition name="fade">
            <button v-show="showBtn" @click="submit">评论</button>
          </transition>
        </div>
      </div>
    </div>
    <!-- 沙发区 -->
    <div class="article-main-show-comment">
      <div class="comment-item" v-for="(comment, key) in commentList" :key="key">
        <div class="comment-left">
          <img :src="require('@/static/imgs/common/avatar.png')">
        </div>
        <div class="comment-right">
          <div class="comment-meta">
            {{comment.created_at | getLocalTime}}
          </div>
          <div class="comment-content">
            {{comment.content}}
          </div>
          <div class="commet-user">
            <a href="javascript:">{{comment.name}}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import marked from 'marked'
// import md from '~/data/article/01.js'
import { PATHS, request } from '@/api'
export default {
  data () {
    return {
      post: {},
      markdown: '',
      focuText: '',
      params: {
        content: '',
        name: '',
        email: '',
        link: ''
      },
      href: '',
      commentList: [],
      isLiked: false
    }
  },
  computed: {
    showBtn () {
      return Boolean(this.params.content || this.focuText)
    }
  },
  methods: {
    submit () {
      let self = this
      isValid(this.params).then(params => {
        return request.post(PATHS.comment.insertLeaveMessage, Object.assign({ post: self.post.id }, params))
      }).then(res => {
        return new Promise((resolve, reject) => {
          request.post(PATHS.article.commentsAdd, { postId: self.post.id }).then(result => {
            if (!result.hasError) {
              this.$set(this.post.meta, 'comments', this.post.meta.comments + 1)
              resolve(res)
            }
            reject('接口异常/(ㄒoㄒ)/~~')
          })
        })
      }).then(res => {
        if (res && !res.hasError) {
          alert('谢谢评论~')
          self.commentList.unshift(Object.assign({
            created_at: new Date().toISOString(),
            id: self.post.id
          }, self.params))
        }
        clear(self.params)
      }).catch(alert)
    },
    async likeHandler () {
      try {
        if (!this.isLiked) {
          let result = await request.post(PATHS.article.likesAdd, { postId: this.$route.params.id })
          if (!result.hasError) {
            // 喜欢接口
            localStorage.setItem('isLiked', true)
            this.$set(this.post.meta, 'likes', this.post.meta.likes + 1)
            this.isLiked = true
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.href = location.href
    let postId = this.$route.params.id
    let likeStore = localStorage.getItem('isLiked')
    this.isLiked = likeStore ? likeStore.toString() === 'true' : false
    request.post(PATHS.article.getOnearticle, { postId }).then(res => {
      this.post = res.data
      this.markdown = marked(res.data.content)
      this.commentList = res.data.comment.reverse()
    })
    request.post(PATHS.article.viewsAdd, { postId }).catch(console.log)
  }
}

const regexs = {
  email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, // eslint-disable-line
  url: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/ // eslint-disable-line
}

function isValid (params) {
  return new Promise((resolve, reject) => {
    let { name, email, link, content } = params
    if (!name.trim()) {
      reject('请输入昵称哦~~')
    }
    if (!email.trim()) {
      reject('请输入邮箱哦~~')
    }
    if (!regexs.email.test(email)) {
      reject('请输入正确邮箱格式哦~~')
    }
    if (link && !regexs.url.test(link)) {
      reject('请输入正确网址格式哦~~')
    }
    if (!content.trim()) {
      reject('请输入留言内容哦~~')
    }
    resolve(params)
  })
}

function clear (params) {
  Object.keys(params).forEach(key => {
    if (Object.prototype.toString.call(params[key]) !== 'Object object') {
      params[key] = ''
    } else {
      clear(params[key])
    }
  })
}
</script>

<style lang='less'>
@import "~@/styles/markdown.css";
.article-main {
  width: 900px;
  margin: 0 auto;
  padding-bottom: 20px;
  box-sizing: border-box;
  .splitter-line {
    height: 400px;
    background-image: url('~@/static/imgs/article/splitbk-mini.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
    margin-bottom: 10px;
  }
  .statistics-line {
    padding: 10px 20px;
    border: 1px solid #f6f6f6;
    .flex-initial(space-between, center);
    &-left {
      &-like {
        cursor: pointer;
        padding: 5px 20px;
        background-color: #f6f6f6;
        i {
          font-size: 16px;
          vertical-align: baseline;
          display: inline-block;
          margin-right: 3px;
        }
      }
      .coral {
        i {
          color: coral;
        }
      }
      &-comment {
        padding: 5px 20px;
        margin-left: 20px;
        background-color: #f6f6f6;
      }
    }
  }
  &-wrap {
    padding: 20px;
    margin: 10px auto 0;
    color: #333;
    border: 1px solid #f6f6f6;
    box-sizing: border-box;
  }
  &-detail {
    padding: 10px 20px;
    font-size: 14px;
    width: 900px;
    margin: 10px auto 10px;
    box-sizing: border-box;
    background: #fff;
    color: #333;
    border: 1px solid #f6f6f6;
    p {
      line-height: 32px;
    }
  }
  &-comment {
    display: flex;
    justify-content: center;
    align-items: center;
    &-wrap {
      width: 100%;
      padding: 0;
      box-sizing: border-box;
      margin-top: 10px;
      margin-bottom: 5px;
    }
    &-info {
      display: flex;
      justify-content: space-between;
      input {
        outline: none;
        font-size: 14px;
        text-indent: 5px;
        min-width: 220px;
        height: 30px;
        border: 1px solid #f1f1f1;
        &:focus {
          border-color: #0f9db7;
        }
      }
    }
    &-text {
      margin-top: 10px;
      textarea {
        width: 100%;
        outline: none;
        height: 100px;
        box-sizing: border-box;
        padding: 10px;
        resize: none;
        font-size: 14px;
        border: 1px solid #f1f1f1;
        &:focus {
          border-color: #0f9db7;
        }
      }
    }
    &-btn {
      button {
        float: right;
        margin-top: 10px;
        margin-right: 10px;
        height: 36px;
        width: 70px;
        background: #0f9db7;
        color: #fff;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        outline: 0;
        border: none;
        font-size: 1em;
        transition: 1s all;
      }
    }
  }
  &-show-comment {
    .comment-item {
      display: flex;
      margin-bottom: 20px;
      padding-bottom: 20px;
      position: relative;
      border-bottom: 1px dashed #f1f1f1;
      .comment-left {
        box-sizing: border-box;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          transform: translateY(10px);
        }
      }
      .comment-right {
        margin-left: 15px;
        flex: 1;
        .comment-user {
          display: flex;
          height: 40px;
          align-items: center;
        }
        .comment-content {
          color: #333;
          box-sizing: border-box;
          padding: 5px 0;
          line-height: 26px;
          font-size: 13px;
        }
        .comment-meta {
          display: flex;
          height: 30px;
          align-items: center;
          color: #666;
        }
      }
    }
  }
}
</style>
