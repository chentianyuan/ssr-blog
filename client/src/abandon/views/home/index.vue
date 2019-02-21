<template>
  <el-container class="page-home" :direction="'vertical'">
    <!-- 主页顶部 -->
    <home-header></home-header>
    <!-- 主页主体 -->
    <home-main
    :speechList="speechList"
    ></home-main>
    <!-- 主页底部 -->
    <home-footer></home-footer>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import * as speech from '@/store/modules/speech'
import homeHeader from './components/homeHeader'
import homeFooter from './components/homeFooter'
import homeMain from './components/homeMain'

export default {
  asyncData ({ store, router, context }) {
    // 触发模块下的actions
    return Promise.all([
      store.dispatch('speech/GET_SPEECH_LIST', { context })
    ])
  },
  components: {
    homeHeader, homeFooter, homeMain
  },
  computed: {
    ...mapGetters(speech.name, [
      'speechList'
    ]).reverse()
  }
}
</script>

<style>
.page-home {
  margin-top: 60px;
  overflow: hidden;
}
</style>
