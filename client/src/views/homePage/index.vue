<template>
  <section class="page-home--wrap">
    <left-user>
      <template slot="icon">
        <a href="https://github.com/chentianyuan" target="_blank"><i class="iconfont">&#xe64a;</i></a>
        <a href="https://www.jianshu.com/u/933ffe49535e" target="_blank"><i class="iconfont">&#xe602;</i></a>
      </template>
    </left-user>
    <right-nav></right-nav>
    <blockquote class="view-count">访问量: {{view_times}}</blockquote>
  </section>
</template>

<script>
import leftUser from './components/leftUser.vue'
import rightNav from './components/rightNav.vue'
import { request, PATHS } from '@/api'
export default {
  asyncData ({ store, router, context }) {
    return request.get(PATHS.view.getViewCount, { context }).then(res => {
      return {
        view_times: !res.hasError ? res.data.view_times : 0
      }
    })
  },
  data () {
    return {
      view_times: 0
    }
  },
  mounted () {
    request.post(PATHS.view.addViewCount).then(res => {
      if (!res.hasError) this.view_times++
    })
  },
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
  .view-count {
    position: fixed;
    right: 0;
    top: 0;
  }
}
</style>
