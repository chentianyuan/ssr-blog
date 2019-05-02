<template>
  <div class="leave-message" @click="$emit('on-wrapLink')">
    <div class="leave-message-wrap" @click.stop>
      <section class="leave-message-info">
        <input type="text" placeholder="称呼*" v-model="params.name"/>
        <input type="text" placeholder="邮箱（不会公开）*" v-model="params.email"/>
        <input type="text" placeholder="友链*（http, https:// 开头）" v-model="params.link" />
      </section>
      <section class="leave-message-text">
        <textarea  @focus="focuText = true" @blur="focuText = false" v-model="params.content" class="leave-message-text-textarea" name="content" cols="30" rows="10"  placeholder="来了老弟~"></textarea>
      </section>
      <div class="leave-message-btn">
        <button @click.stop="$emit('on-submit', params);content = ''" v-show="showBtn">评论</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leave-message',
  data () {
    return {
      focuText: false,
      params: {
        content: '',
        name: '',
        email: '',
        link: ''
      }
    }
  },
  computed: {
    showBtn () {
      return Boolean(this.params.content || this.focuText)
    }
  }
}
</script>

<style lang="less">
.leave-message {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: hsla(0, 0%, 100%, .9);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .3s;
  &-wrap {
    width: 800px;
    height: 200px;
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
    }
  }
}
</style>
