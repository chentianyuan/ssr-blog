<template>
  <div class="message-board hack-padding">
    <button :class="['message-board-btn', btnShow ? 'animate' : '']" @click="btnShowHandler">我要留言!</button>
    <section class="message-board-wrap">
      <div class="message-board-wrap-item" v-for="(message, key) in getmessageItems" :key="key">
        <h5>{{message.created_at | getLocalTime}}</h5>
        <p>{{message.content}}</p>
        <span>--{{message.name}}</span>
        <div class="bgcircle"></div>
      </div>
      <transition name="fade">
        <leave-message v-show="boardShow" @on-wrapLink="wrapLink" @on-submit="submit" />
      </transition>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import LeaveMessage from '@/components/leave-message.vue'
import { PATHS, request } from '@/api'
export default {
  asyncData ({ context, store, route }) {
    return Promise.all([store.dispatch('getLeaveMessageList', { context })])
  },
  data () {
    return {
      btnShow: false,
      boardShow: false
    }
  },
  computed: {
    ...mapGetters([
      'getmessageItems'
    ])
  },
  components: {
    LeaveMessage
  },
  methods: {
    ...mapMutations([
      'MESSAGEITEMS'
    ]),
    btnShowHandler () {
      this.btnShow = true
      setTimeout(() => {
        this.boardShow = true
        this.btnShow = false
      }, 500)
    },
    wrapLink () {
      this.boardShow = false
    },
    submit (params) {
      isValid(params).then(vaildRes => {
        return request.post(PATHS.comment.insertLeaveMessage, vaildRes)
      }).then(res => {
        if (!res.hasError) {
          this.MESSAGEITEMS(this.getmessageItems.concat([Object.assign(params, {
            created_at: new Date().toISOString()
          })]))
        }
      }).catch(alert).finally(() => {
        this.boardShow = false
      })
    }
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

</script>

<style lang="less">
.message-board {
  width: 900px;
  margin: 0 auto;
  overflow: hidden;
  &-btn {
    font-size: 1em; // em的换算是根据当前元素字体大小来换算的 而rem固定根据根元素字体大小换算
    display: block;
    background-color: #ff0081;
    color: #fff;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    position: relative;
    padding: 10px 20px;
    margin: 30px auto;
    box-shadow: 0 2px 25px rgba(255, 0, 130, .5); // inside outside distant color
    &:focus {
      outline: 0;
    }
    &:active {
      transform: scale(0.9);
      background-color: #e60074;
      box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
    }
    &::before, &::after {
      position: absolute;
      content: '';
      display: block;
      width: 140%;
      height: 100%;
      left: -20%;
      z-index: -1000;
      transition: all ease-in-out 0.5s;
      background-repeat: no-repeat;
    }
    &::before {
      display: none;
      top: -75%;
      background-image: radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, transparent 20%, #ff0081 20%, transparent 30%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, transparent 10%, #ff0081 15%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%);
      background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
    }
    &::after {
      display: none;
      bottom: -75%;
      background-image: radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, transparent 10%, #ff0081 15%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%);
      background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
    }
    &.animate::before {
      display: block;
      animation: topBubbles ease-in-out 0.75s forwards;
    }
    &.animate::after {
      display: block;
      animation: bottomBubbles ease-in-out 0.75s forwards;
    }
  }
  &-wrap {
    display: flex;
    flex-wrap: wrap;
    &-item {
      position: relative;
      height: 210px;
      padding: 10px;
      flex-basis: 23%;
      margin: 1%;
      border: 1px solid #f1f1f1;
      box-sizing: border-box;
      cursor: pointer;
      overflow: hidden;
      h5 {
        height: 30px;
        color: #7f7f7f;
        font-size: 12px;
      }
      p {
        height: 124px;
        overflow: hidden;
        line-height: 24px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        text-indent: 24px;
        word-wrap: break-word;
      }
      span {
        display: block;
        text-align: right;
        color: #7f7f7f;
        margin-top: 14px;
      }
      .bgcircle {
        position: absolute;
        transform: scale(0);
        transition: all .3s;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: rgba(241, 241, 241, 0.2);
        z-index: -1;
      }
      &:hover .bgcircle {
        transform: scale(2);
        background-color: rgba(241, 241, 241, 1);
      }
    }
  }
}

@keyframes topBubbles {
  0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }
  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;
  }
  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}

@keyframes bottomBubbles {
  0% {
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
  }
  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;
  }
  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}
</style>
