const path = require('path')
const utils = require('./utils')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const lessExtract = new ExtractTextWebpackPlugin('css/less.css')
// const PrerenderSpaPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSpaPlugin.PuppeteerRenderer
const styleLintPlugin = require('stylelint-webpack-plugin')
const vueLoaderConfig = require('./vue-loader.conf')

const isProd = process.env.NODE_ENV === 'production'

let baseConfig = {
	mode: isProd ? 'production' : 'development',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name].[chunkhash].js', // 防缓存
		// publicPath处理静态资源时转为绝对路径
		publicPath: '/dist/'
	},
	module: {
    // noParse: /es6-promise\.js$/, // avoid webpack shimming process
		rules: [
			{
				test: /\.(vue|js)$/,
				loader: 'eslint-loader',
				enforce: 'pre',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../server'), path.resolve(__dirname, '../src')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
			},
			{
				test: /\.vue$/,
				type: 'javascript/auto',
        loader: 'vue-loader',
        options: vueLoaderConfig
			}, {
				test: /\.js$/,
				type: 'javascript/auto',
				loader: 'babel-loader?cacheDirectory',
        exclude: /node_modeules/
      }, 
      {
				// 图片打包
				test: /\.(jpg|png|gif|eot|woff|ttf)$/,
				// 此时的name决定图片打包后的路径,使用相对路径
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[ext]?[hash]'
        }
      },
      ...utils.styleLoaders({
        sourceMap: true,
        extract: false,
        usePostCSS: true
      })
		]
  },
  stats: isProd ? {} : 'errors-only',
  plugins: isProd ? [
    new MiniCssExtractPlugin({
      filename: `styles/[name].css`
    })
  ] : [
    new styleLintPlugin({
      cache: true,
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache'),
      files: ['src/style/*.l?(e|c)ss', 'src/views/**/*.vue', 'src/components/**/*.vue'],

    })
  ],
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
	resolve: {
		extensions: ['*', '.js', '.vue', '.json'],
		// vuejs包含两种使用方式，standalone和runtime-only，runtime-only不包含template编译
		// NPM包默认导出的是runtime-only build.因此为了要使用独立构建，在webpack配置中需要添加下面的代码
		alias: {
      '~': path.resolve(__dirname, '../'),
			'@': path.resolve(__dirname, '../src'),
			'vue$': 'vue/dist/vue.min.js'
		}
	},
  devtool: '#eval-cheap-module-source-map'
}

module.exports = baseConfig