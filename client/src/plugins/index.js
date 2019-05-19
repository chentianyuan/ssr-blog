// vue开发插件
// Vue.js 的插件应当有一个公开方法 install 。
// 这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的入参对象
export default {
  install: (Vue, { router }) => {
    let eventBus = new Vue()
    Vue.location = Vue.prototype.$location = {
      to: url => {
        try {
          const route = router.match(url)
          if (route.path === location.pathname) return
          if (['not-found', null].includes(route.name)) {
            window.location.href = url
          }
          router.push({ path: url })
        } catch (err) {
          console.error(err)
        }
      },
      on: (eventName, cb) => eventBus.$on(eventName, cb),
      emit: (...args) => eventBus.$emit(args[0], ...args.slice(1))
    }
  }
}
