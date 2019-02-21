// 项目引入的vue或者vuex之类的，我们只是使用它们，并不会改变它们的源码，它们本身也不会运行，那么我们就可以把这些模块拆分出来提前打包
const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// customPlugin
const Myplugin = require('./plugins/my-plugins')
const ListenMyPlugin = require('./plugins/listen-my-plugin')

const InsertPlugin = require('./plugins/Insert-webpack-plugin')

// dll打包单独配置
let config = {
  mode: 'production',
  entry: {
    vendor: ['vue', 'vuex', 'axios', 'vue-router', 'element-ui']
  },
  output: {
    path: path.join(__dirname, '../public/dll'),
    filename: '[name].dll.js',
    library: '[name]_library',
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    // Dllplugin插件，将生成一个manifest.json文件
    // 该文件供webpack.base.config文件中加入的DllReferencePlugin使用，使我们所编写的源文件能正确访问到我们所需要的静态资源(运行时依赖包)
    // 也就是以上所有的vendor文件
    new webpack.DllPlugin({
      path: path.join(__dirname, '../public/dll', '[name]-manifest.json'),
      name: '[name]_library'
    }),
    // 压缩打包
    new webpack.NoEmitOnErrorsPlugin(),
    // 分析插件
    // new BundleAnalyzerPlugin(),
    // new Myplugin("Plugin is instancing."),
    // new ListenMyPlugin(),
    new InsertPlugin({
      name: 'dll'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  }
}

module.exports = config