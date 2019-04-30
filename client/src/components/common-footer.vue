<script>
let desc = '© 2018 - ytc的博客 - Powered by SSR & express'
export default {
  name: 'common-footer',
  functional: true,
  render (createElement, context) {
    return createElement('div', {
      attrs: {
        class: 'component--common-footer'
      }
    }, desc)
  }
}
</script>

<style lang="less">
.component--common-footer {
  width: 100%;
  text-align: center;
  color: #666;
  font-size: 12px;
  line-height: 50px;
  border: solid #f1f1f1 1px;
  background-color: #fff;
}
</style>
