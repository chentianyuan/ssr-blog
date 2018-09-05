<template>
  <div class="page-home">
    Home
  </div>
</template>

<script>
export default {
  asyncData({ store, route }) {
    return Promise.all([
      // store.dispatch('fetchTextAction')
    ])
  }
}
</script>

<style lang="less">
</style>
