<template>
  <section class="art-content">
      {{ this.article.title }}
  </section>
</template>

<script>
export default {
    name: 'article',
    data () {
        return {
            article: {

            }
        }
    },
    created () {
        this.article.title = `这篇是文章${this.$route.params.articleId}`
    }
}
</script>

<style lang="less" scoped>
    .art-content{
        font-size: 0.16rem;
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 0;
    }
</style>
