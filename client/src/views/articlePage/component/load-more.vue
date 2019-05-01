<script>
let descs = ['数据加载中...', '没有更多数据了']
export default {
  name: 'loadMore',
  render (createElement) {
    let desc = this.noMoreData ? descs[1] : descs[0]
    return this.noMoreData ? createElement('div', {
      attrs: {
        class: 'page-article--loadMore'
      }
    }, desc) : this.$props.loadMore ? createElement('div', {
      attrs: {
        class: 'page-article--loadMore'
      }
    }, desc) : ''
  },
  props: {
    loadMore: Boolean,
    noMoreData: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less">
.page-article--loadMore {
  text-align: center;
  padding: 12px 0;
  cursor: pointer;
  color: #ccc;
}
</style>
