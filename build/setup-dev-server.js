const path = require('path')
const webpack = require('webpack')
const MFS = require('memory-fs')

// 导出的clientConfig已经是merge了base.config的配置项
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

// 服务端commonjs规范，接收一个express实例，和其他选项对象
module.exports = function setupDevServer(app, opts){
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
        stats: {
            colors: true,
            chunks: false
        }
    })

    // 对该服务器使用该中间件
    app.use(devMiddleware)

    clientCompiler.plugin('done', () => {
        console.log('done')
        // 读取index.html,并解析
        // 获取devmiddleware对应的文件系统，已不是默认的本地文件系统
        const fs = devMiddleware.fileSystem
        const filePath = path.join(clientConfig.output.path, 'index.template.html')
        if (fs.existsSync(filePath)) {
            const index = fs.readFileSync(filePath, 'utf-8')
            // 传入打包后的模板
            // 也就是webpack.client.config.js通过html plugin打包出的html躯壳，注入了打包后的客户端脚本index.js
            opts.indexUpdated(index)
        }
    })

    // 热更新中间件，对已编译的前端文件监听并热更新
    app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }))

    // 监听和更新服务端渲染
    // 服务端编译
    const serverCompiler = webpack(serverConfig)
    // 必须引入该模块，得到服务端文件系统
    const mfs = new MFS()
    const outputPath = path.join(clientConfig.output.path, 'vue-ssr-server-bundle.json')
    serverCompiler.outputFileSystem = mfs
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err
        stats = stats.toJson()
        if (stats.errors.length) return
        // 服务端渲染 具体实现函数在 server.js 中的createRenderer
        // 从内存中获取出 server-bundle.js 文件
        // 通过该 server-bundle.js 去生成renderer
        // opts 中的 bundleUpdated 和 indexUpdated 函数一个返回html模板，一个返回bundle.js
        opts.bundleUpdated(JSON.parse(mfs.readFileSync(outputPath, 'utf-8')))
    })
}

 