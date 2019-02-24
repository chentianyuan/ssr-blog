<template>
  <el-main class="page-home--main">
    <section class="page-home--main-input-wrap">
      <div class="page-home--main-wrap">
        <div class="input-wrap">
          <el-input
            :autosize="{ minRows: 4, maxRows: 6 }"
            suffix-icon="el-icon-edit"
            class="page-home--textarea"
            placeholder="输入想发表的意见"
            v-model="textarea"
            type="textarea"
          >
          </el-input>
          <span :class="textLength > 200 ? 'tail warning' : 'tail'">{{ textLength }}/200</span>
        </div>
      </div>
      <el-row class="page-home--row">
        <el-button @click="submitComment" type="primary" :loading="loading">发布</el-button>
      </el-row>
    </section>
    <section class="page-home--main-content-wrap">
      <div class="page-home--main-comment" v-for="(item, index) in speechList" :key="index">
        <el-row class="comment-header">
          <div class="header-avatar">
            <img :src="require('@/static/imgs/common/avatar.png?resize=42x46')">
          </div>
          <div class="header-content">
            <div class="user-name">
              <a>{{ item.admin }}</a>
            </div>
            <div class="meta-info">
              <a>其他</a>
            </div>
          </div>
          <div class="header-more">
            <svg data-v-e069ff9a="" t="1529034629100" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1948" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" class="icon"><path data-v-e069ff9a="" d="M804.606221 432.282401c120.691803 0 119.469975 187.388854-1.465374 187.388854C682.449044 619.671255 683.426301 432.282401 804.606221 432.282401z" p-id="1949" fill="#b8c1cc"></path><path data-v-e069ff9a="" d="M511.428995 432.282401c120.691803 0 119.469975 187.388854-1.465374 187.388854C389.271818 619.671255 390.249075 432.282401 511.428995 432.282401z" p-id="1950" fill="#b8c1cc"></path><path data-v-e069ff9a="" d="M218.251769 432.282401c120.691803 0 119.469975 187.388854-1.465374 187.388854C96.094592 619.671255 97.071849 432.282401 218.251769 432.282401z" p-id="1951" fill="#b8c1cc"></path></svg>
          </div>
        </el-row>
        <el-row class="comment-content">
          <span>{{ item.text }}</span>
        </el-row>
        <el-row class="comment-bottom">
          <div class="like-action">
            <div class="action-box">
              <svg data-v-2750dac2="" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" class="icon like-icon"><g data-v-2750dac2="" fill="none" fill-rule="evenodd"><path data-v-2750dac2="" d="M0 0h20v20H0z"></path> <path data-v-2750dac2="" stroke="#8A93A0" stroke-linejoin="round" d="M4.58 8.25V17h-1.4C2.53 17 2 16.382 2 15.624V9.735c0-.79.552-1.485 1.18-1.485h1.4zM11.322 2c1.011.019 1.614.833 1.823 1.235.382.735.392 1.946.13 2.724-.236.704-.785 1.629-.785 1.629h4.11c.434 0 .838.206 1.107.563.273.365.363.84.24 1.272l-1.86 6.513A1.425 1.425 0 0 1 14.724 17H6.645V7.898C8.502 7.51 9.643 4.59 9.852 3.249A1.47 1.47 0 0 1 11.322 2z"></path></g></svg>
              <span>赞</span>
            </div>
          </div>
          <div class="comment-action">
            <div class="comment-box">
              <svg data-v-2750dac2="" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" class="icon comment-icon"><g data-v-2750dac2="" fill="none" fill-rule="evenodd"><path data-v-2750dac2="" d="M0 0h20v20H0z"></path> <path data-v-2750dac2="" stroke="#8A93A0" stroke-linejoin="round" d="M10 17c-4.142 0-7.5-2.91-7.5-6.5S5.858 4 10 4c4.142 0 7.5 2.91 7.5 6.5 0 1.416-.522 2.726-1.41 3.794-.129.156.41 3.206.41 3.206l-3.265-1.134c-.998.369-2.077.634-3.235.634z"></path></g></svg>
              <span>33</span>
            </div>
          </div>
        </el-row>
      </div>
    </section>
  </el-main>
</template>

<script>
import api from '@/api'
export default {
  props: {
    speechList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // 文本
      textarea: '',
      loading: false
    }
  },
  methods: {
    submitComment () {
      let tipInfo = {
        title: '',
        type: '',
        duration: 2000,
        position: 'bottom-right'
      }
      if (this.textarea.length) {
        this.loading = true
        api.speech.insertSpeech({ text: this.textarea }).then(res => {
          if (!res.hasError) {
            this.$store.commit('speech/SET_SPEECH_LIST', [{ text: this.textarea }])
            tipInfo.title = '插入成功'
            tipInfo.type = 'success'
            this.$notify(tipInfo)
          }
          this.loading = false
          this.textarea = ''
        })
      } else {
        tipInfo.title = '好好说话'
        tipInfo.type = 'warning'
        this.$notify(tipInfo)
      }
    }
  },
  computed: {
    textLength () {
      return this.textarea.length
    }
  }
}
</script>

<style lang="less">
.page-home--main {
  padding: 0 0 20px;
  height: -webkit-fill-available;
  .page-home--main-input-wrap {
    padding: 20px;
    .input-wrap {
      position: relative;
      .tail {
        position: absolute;
        right: 15px;
        bottom: 5px;
        color: #c0c4cc;
        font-size: .1rem;
      }
      .warning {
        color: red;
      }
    }
  }
  .page-home--row {
    text-align: right;
    margin: .1rem;
  }
  .page-home--main-content-wrap {
    .page-home--main-comment {
      width: 100%;
      background-color: #fff;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
      margin-bottom: .08rem;
      .comment-header {
        padding: .16rem .2rem 0 .2rem;
        display: flex;
        align-items: center;
        .header-avatar {
          img {
            width: .42rem;
            height: .42rem;
            border-radius: 50%;
          }
        }
        .header-content {
          margin-left: .12rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .user-name > a {
            font-size: .14rem;
            font-weight: 600;
            color: #2e3135;
          }
          .meta-info > a {
            font-size: .13rem;
            color: #8a9aa9;
            cursor: default;
          }
        }
        .header-more {
          position: relative;
          margin: 0 -1px 0 auto;
        }
      }
      .comment-content {
        margin: .024rem .24rem 0;
        word-break: break-word;
        text-rendering: optimizeLegibility;
        span {
          font-size: .14rem;
          line-height: 1.5;
          white-space: pre-wrap;
          color: #17181a;
        }
      }
      .comment-bottom {
        display: flex;
        position: relative;
        margin-top: .16rem;
        height: 34px;
        border-top: 1px solid #ebebeb;
        .like-action, .comment-action {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1 1 50%;
          height: 100%;
          cursor: pointer;
          color: #8a93a0;
        }
        .action-box, .comment-box {
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            margin-left: .3em;
            font-size: .13rem;
            font-weight: 500;
            color: #8a93a0;
          }
        }
        svg {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
}
</style>
