class ListenMyPlugin {
  apply (compiler) {
    // 在 compiler 的 environment 钩子被触发时，myyPlugin钩子被触发
    
    // 在myplugin钩子上订阅listenmyplugin事件，当myplugin被触发时，该事件会被执行
    compiler.hooks.myPlugin.tap('ListenMyPlugin', data => {
      console.log('@ListenMyPlugin', data)
    })
  }
}

module.exports = ListenMyPlugin
