const path = require('path')
const webpack = require('webpack')
const MFS = require('memory-fs')
const fs = require('fs')
const chokidar = require('chokidar')

// 导出的clientConfig已经是merge了base.config的配置项
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
  } catch (e) {}
}

// 服务端commonjs规范，接收一个express实例，和其他选项对象
module.exports = function setupDevServer (app, templatePath, cb) {
  let bundle
  let template
  let clientManifest

  let ready
  const readyPromise = new Promise(r => { ready = r })
  const update = () => {
    if (bundle && clientManifest) {
      // webpack-hot-middleware的watch和webpack-dev-middler的done无法判断哪个先执行
      // 但是第一次一定是watch先于done，但是watch执行的时候clientManifest是空的，因此状态依然不会转置
      ready()
      cb(bundle, {
        template,
        clientManifest
      })
    }
  }

  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    console.log('index.html template updated.')
    update()
  })

  // 热加载配置，webpack-dev-server服务端实现
  clientConfig.entry.index = ['webpack-hot-middleware/client', clientConfig.entry.index]
  clientConfig.output.filename = '[name].js'
  // 需要HMR的加持，实现模块热更新
  clientConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
  )

  // webpack编译器
  const clientCompiler = webpack(clientConfig)

  // 对已编译的前端文件监听打包
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
      // webpack-dev-middleware提供的publicPath需与webpack打包配置的publicPath保持一致，才能达到对比判断资源是否修改的功能。
      publicPath: clientConfig.output.publicPath,
      noInfo: true
  })

  // 对该服务器使用该中间件
  app.use(devMiddleware)

  clientCompiler.plugin('done', stats => {
      console.log('done', '--------')
      // 读取index.html,并解析
      stats = stats.toJson()
      stats.errors.forEach(err => console.error(err))
      stats.warnings.forEach(err => console.warn(err))
      if (stats.errors.length) return
      // 使用的模板就是默认模板
      // 也就是webpack.client.config.js通过html plugin打包出的html躯壳，注入了打包后的客户端脚本index.js
      // 获取devmiddleware对应的文件系统，已不是默认的本地文件系统
      clientManifest = JSON.parse(readFile(
        devMiddleware.fileSystem, 
        'vue-ssr-client-manifest.json'
      ))
      update()
  })

  // 热更新中间件，对已编译的前端文件监听并热更新
  app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }))

  // 监听和更新服务端渲染
  // 服务端编译
  const serverCompiler = webpack(serverConfig)
  // 必须引入该模块，得到服务端文件系统
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
      console.log('watch', '--------')
      if (err) throw err
      stats = stats.toJson()
      if (stats.errors.length) return
  
      // server端放在mfs创建的内存空间中，client放在dev-middle-ware创建的内存空间
      bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
      update()
  })

  return readyPromise
}

 