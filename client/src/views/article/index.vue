<template>
  <section class="article-main hack-padding">
    <div class="markdown article-main-wrap" v-html="markdown"></div>
  </section>
</template>

<script>
import marked from 'marked'
import md from '~/data/article/01.js'
export default {
  name: 'article',
  data () {
    return {
      markdown: marked(md)
    }
  }
}
</script>

<style lang='less'>
@import "~@/styles/markdown.css";
.article-main {
  width: 900px;
  margin: 0 auto;
  padding-bottom: 20px;
  box-sizing: border-box;
  &-wrap {
    box-sizing: border-box;
    padding: 20px;
    margin: 10px auto 0;
    color: #333;
    border: 1px solid #f6f6f6;
  }
}
</style>
