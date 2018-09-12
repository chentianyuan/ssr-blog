<template>
  <el-container class="page-home">
    <el-button type="success">成功按钮</el-button>
  </el-container>
</template>

<script>
export default {
  asyncData ({ store, route }) {
    return Promise.all([
      // store.dispatch('fetchTextAction')
    ])
  },
  mounted () {
  }
}
</script>

<style>
.page-home {
}
</style>
