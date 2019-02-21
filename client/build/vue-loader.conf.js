'use strict'
const utils = require('./utils')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: !isProd,  // 该参数提供给 css-loader, postcss-loader, less-loader, stylus-loader, sass-loader，用于生成 sourcemap
    extract: isProd
  }),

  // 是否启用 cssSourceMap，develop 模式下使用 css-loader 生成 sourcemap，production 模式下使用 optimize-css-assets-webpack-plugin 生成 sourcemap
  cssSourceMap: !isProd,

  // If you have problems debugging vue-files in devtools,
  // set this to false - it *may* help
  // https://vue-loader.vuejs.org/en/options.html#cachebusting
  cacheBusting: true,

  // 如果设置为 false，模版中 HTML 标签之间的空格将会被忽略。
  preserveWhitespace: false,

  // 在模版编译过程中，编译器可以将某些属性，如 src 路径，转换为 require 调用，以便目标资源可以由 webpack 处理。默认配置会转换 <img> 标签上的 src 属性和 SVG 的 <image> 标签上的 xlink：href 属性。
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
