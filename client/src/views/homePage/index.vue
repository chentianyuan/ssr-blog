<template>
  <section class="page-home--wrap">
    <left-user>
      <template slot="icon">
        <a><i class="iconfont">&#xe64a;</i></a>
        <a><i class="iconfont">&#xe602;</i></a>
      </template>
    </left-user>
    <right-nav></right-nav>
  </section>
</template>

<script>
import leftUser from './components/leftUser.vue'
import rightNav from './components/rightNav.vue'
export default {
  components: {
    leftUser, rightNav
  }
}
</script>

<style lang="less">
.page-home--wrap {
  width: 100%;
  // height: calc(100% - 52px);
  height: -webkit-fill-available;
  box-sizing: border-box;
  .flex-initial(initial, initial);
}
</style>
