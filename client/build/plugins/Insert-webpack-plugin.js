// 1，webpack插件是一个独立的js模块，暴露带有apply方法的构造函数
// 2，函数原型上的 apply 方法会被注入 compiler 对象
// 3，compiler 对象上挂载了相应的 webpack 事件钩子
// 4，事件钩子的回调函数里能拿到编译后的 compilation 对象，如果是异步钩子还能拿到相应的 callback
const EntryPoint = require('webpack/lib/Entrypoint')
const Chunk = require('webpack/lib/Chunk')

class InsertWebpackPlugin {
  constructor (options) {
    this.options = options
  }

  // compiler 即 webpack 的编辑器对象，在调用 webpack 时，会自动初始化 compiler 对象
  apply (compiler) {
    const options = this.options
    // compilation 为编译好的文件
    // compilation 对象代表了一次单一的版本构建和生成资源
    // emit 属于在生成资源并输出到目录之前	
    compiler.plugin('emit', function (compilation, cb) {
      for(var asset in compilation.assets) {
        console.log(asset, '-----------')
      }
      cb()
    })
  }
}

module.exports = InsertWebpackPlugin