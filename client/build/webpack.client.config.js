const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.base.config')
const merge = require('webpack-merge')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')

// const InsertWebpackPlugin = require('./insert-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const clientConfig = merge(base, {
  // hk使用了firebase实时性云数据库，这里先不使用
  // 通过配置DefinePlugin，那么这里面的标识就相当于全局变量，你的业务代码可以直接使用配置的标识。
  // 其实这里通过 DefinePlugin 来指定生产环境后，以便在压缩时可以让 UglifyJS 自动删除代码块内的警告语句。
  entry: {
      // 默认为客户端入口
      index: './src/entry-client.js'
  },
  plugins: [
      new webpack.DefinePlugin({
        'process.env.VUE_ENV': '"client"'
      }),
      new VueSSRClientPlugin(),
      new webpack.DllReferencePlugin({
        manifest: path.join(__dirname, '../public/dll/manifest.json')
      }),
      new CopyWebpackPlugin([{
        from: 'public/dll/vendor.*.js', to: 'js/', flatten: true
      }]),
      new HtmlWebpackPlugin({
        // 使用的入口模板
        template: path.resolve(__dirname, '../index.template.html'),
        filename: 'index.template.html',
        inject: 'body'
      })
      // new InlineManifestWebpackPlugin('runtime')
  ],
  optimization: {
    splitChunks: {
      // 针对所有模块
      chunks: 'all',
      // 拆分出的模块最小体积
      minSize: 30000,
      // 最少引用一次
      minChunks: 1,
      // 同一个页同时最大异步请求的模块数量不超过5个
      maxAsyncRequests: 5,
      // 入口同时请求同步模块数量
      maxInitialRequests: 3,
      cacheGroups: {
        // 抽离node_modules中的第三方模块
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // node_modules中引用了一次即作为第三方库提取，减少入口包体积
          minChunks: 1,
          priority: -10
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    },
    moduleIds: isProd ? 'hashed' : false
  }
})

if(process.env.NODE_ENV === 'production'){
  const seen = new Set()
  const nameLength = 4
  const hash = require('hash-sum')

  clientConfig.plugins.push(
    // 自定义chunkIdHash规则
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name
      }
      const modules = Array.from(chunk.modulesIterable)
      let len = nameLength
      let padStr = 'chunk-'
      let joinedHash
      joinedHash = hash(modules.map(m => m.id).join(modules.length > 1 ? '_' : '-'))
      while (seen.has(joinedHash.substr(0, len))) len++
      seen.add(joinedHash.substr(0, len))
      return joinedHash.substr(0, len).padStart(len + padStr.length, padStr)
    })
  )
}

module.exports = clientConfig