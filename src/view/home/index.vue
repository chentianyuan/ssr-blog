<template>
  <div class="page-home">
    <el-button type="success">成功按钮</el-button>
  </div>
</template>

<script>
export default {
  asyncData ({ store, route }) {
    return Promise.all([
      // store.dispatch('fetchTextAction')
    ])
  },
  mounted () {
    console.log(123)
  }
}
</script>

<style>
.page-home {
  background-color: aquamarine;
}
</style>
