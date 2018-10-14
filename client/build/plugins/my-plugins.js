
// @file: plugin/myplugin.js
const pluginName = 'MyPlugin'

// tapable是webpack自带的package，是webpack的核心实现
// 不需要单独install，可以在安装过webpack的项目里直接require
// 拿到一个同步hook类
const { SyncHook } = require('tapable')

class MyPlugin {
  constructor (options) {
    console.log('@plugin 实例化' + options)
  }

  apply (compiler) {
    console.log('插件执行阶段')
    // 在compiler上添加一个新的钩子叫myPlugin
    // 所有钩子类的构造函数都接收一个可选的参数，这个参数是一个由字符串参数组成的数组
    compiler.hooks['myPlugin'] = new SyncHook(['data'])
    // 监听environment阶段，触发myplugin插件，进而触发自定义钩子
    compiler.hooks.environment.tap(pluginName, compilation => {
      compiler.hooks.myPlugin.call("It's my plugin's hook excute")
      console.log('@environment')
    })

    // 事件钩子其实就是类似 MVVM 框架的生命周期函数，在特定阶段能做特殊的逻辑处理。了解一些常见的事件钩子是写 webpack 插件的前置条件
    // after-plugins 设置完一组初始化插件之后
    // after-resolvers 设置完resolvers之后
    // run 读取记录之前
    // compiler 创建新的compilation之前
    // compilation compilation创建完成时
    // emit 在生成资源并输出到目录之前
    // after-emit 生成资源并输出到目录之后
    // done 完成编译后
    compiler.plugin('emit', (compilation, callback) => {
       // 在生成资源并输出到目录之前完成某些逻辑
       console.log('资源打包完成')
    })
  }
}

module.exports = MyPlugin