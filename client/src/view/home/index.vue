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
import * as speech from '@/store/module/speech'
import homeHeader from './components/homeHeader'
import homeFooter from './components/homeFooter'
import homeMain from './components/homeMain'

export default {
  asyncData ({ store, router }) {
    console.log(store, '***')
    let payload = [{ text: 'a' }, { text: 'b' }, { text: 'c' }]
    // 触发模块下的actions
    return store.dispatch('speech/GET_SPEECH_LIST', payload)
  },
  components: {
    homeHeader, homeFooter, homeMain
  },
  computed: {
    ...mapGetters(speech.name, [
      'speechList'
    ])
  }
}
</script>

<style>
.page-home {

}
</style>
