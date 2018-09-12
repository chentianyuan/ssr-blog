// vue开发插件
// Vue.js 的插件应当有一个公开方法 install 。
// 这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
export default {
  install: (Vue, { router }) => {
    Vue.location = Vue.prototype.$location = {
      to: url => {
        try {
          const route = router.match(url)
          if (route.path === location.pathname) return
          router.push({ path: url })
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}
