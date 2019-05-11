const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    vendor: [
      'vue',
      'vue-router',
      'vuex',
      'axios'
    ]
  },
  output: {
    path: path.join(__dirname, '../public/dll'),
    filename: '[name].[hash].js',
    library: '_dll_[name]' // 全局变量名，其他模块会从此变量上获取里面模块
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.join(__dirname, '../public/dll', 'manifest.json') // 动态链接库映射文件
    })
  ]
}