<template>
  <div>
    <el-form-item class="page-login--title">
      <h2>{{ yiyan.source }}<span>{{ yiyan.author }}</span></h2>
      <p>{{ yiyan.text }}</p>
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    yiyan: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="less">
.page-login--title {
  text-align: center;
}
</style>
