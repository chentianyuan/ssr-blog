class ListenMyPlugin {
  apply (compiler) {
    // 在 myplugin environment 阶段被广播
    // 监听插件监听myPlugin事件
    compiler.hooks.myPlugin.tap('ListenMyPlugin', data => {
      console.log('@ListenMyPlugin', data)
    })
  }
}

module.exports = ListenMyPlugin
