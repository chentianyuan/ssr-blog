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
    </section>
    <section class="page-home--main-content-wrap">
      <div v-for="(item, index) in speechList" :key="index">{{ item.text }}</div>
    </section>
  </el-main>
</template>

<script>
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
      textarea: ''
    }
  },
  mounted () {},
  computed: {
    textLength () {
      return this.textarea.length
    }
  }
}
</script>

<style lang="less">
.page-home--main {
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
</style>
