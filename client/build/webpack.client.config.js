const webpack = require('webpack')
const base = require('./webpack.base.config')
const merge = require('webpack-merge')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const clientConfig = merge(base, {
  // hk使用了firebase实时性云数据库，这里先不使用
  // 通过配置DefinePlugin，那么这里面的标识就相当于全局变量，你的业务代码可以直接使用配置的标识。
  // 其实这里通过 DefinePlugin 来指定生产环境后，以便在压缩时可以让 UglifyJS 自动删除代码块内的警告语句。
  entry: {
      // 默认为客户端入口
      index: './src/entry-client.js'
  },
  plugins: (base.plugins || []).concat([
      new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
          'process.env.VUE_ENV': '"client"'
      }),
      new VueSSRClientPlugin()
      // new HtmlWebpackPlugin({
      //     // 使用的入口模板
      //     template: path.resolve(__dirname, '../index.template.html'),
      //     filename: 'index.template.html',
      //     inject: 'body'
      // })
  ]),
  optimization: {
    // 通过设置 optimization.runtimeChunk: true 来为每一个入口默认添加一个只包含 runtime 的 chunk
    runtimeChunk: true,
    splitChunks: {
      // 通过设置 optimization.splitChunks.chunks: "all" 来启动默认的代码分割配置项
      chunks: 'all',
      cacheGroups: {
        libs: {
          // 基础类库
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        },
        elementUI: {
          // elementui单独打包
          name: 'chunk-elementUI',
          priority: 20,
          test: /[\\/]node_modules[\\/]element-ui[\\/]/
        },
        commons: {
          // 其他公用业务代码
          name: 'vendors',
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 2,
          name: 'common',
          priority: 5
        }
      }
    }
  }
})

if(process.env.NODE_ENV === 'production'){
    // webpack2中配置一些生产环境特打包的优化常用方式
}

module.exports = clientConfig