<script>
let desc = '© 2019 - ytc的博客 - Powered by SSR & Express'
export default {
  name: 'common-footer',
  // 定义无状态组件，没有响应式数据
  functional: true,
  render (createElement, context) {
    return context.props.hide ? '' : createElement('div', {
      attrs: {
        class: 'component--common-footer'
      }
    }, desc)
  },
  props: {
    hide: {
      type: Boolean,
      require: true
    }
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
  border-top: solid #f1f1f1 1px;
  background-color: #fff;
}
</style>
