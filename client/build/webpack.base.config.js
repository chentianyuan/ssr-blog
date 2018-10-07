
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const lessExtract = new ExtractTextWebpackPlugin('css/less.css')
// const PrerenderSpaPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSpaPlugin.PuppeteerRenderer
const styleLintPlugin = require('stylelint-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
	mode: isProd ? 'production' : 'development',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name]-[chunkhash].js', // 防缓存
		// publicPath处理静态资源时转为绝对路径
		publicPath: '/dist/',
		// 或者使用clean-webpack-plugin,处理生成的[hash].hot-update.js/json文件
		// hotUpdateChunkFilename: 'hot/hot-update.js',
		// hotUpdateMainFilename: 'hot/hot-update.json'
	},
	module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
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
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
			}, {
				test: /\.js$/,
				type: 'javascript/auto',
				loader: 'babel-loader',
        exclude: /node_modeules/
      }, 
      {
        test: /\.css$/,
        exclude: [
          path.resolve(__dirname, "./node_modules/element-ui/lib/theme-chalk/index.css")
        ],
        use: isProd ? ExtractTextPlugin.extract({
          use: 'css-loader?minimize',
          // use: ['style-loader', 'css-loader'],
          fallback: 'vue-style-loader'
        }) : ['vue-style-loader', 'css-loader', 'postcss-loader']
      },
      {
				test: /\.less$/,
				use: isProd ? ExtractTextPlugin.extract({
          use: 'css-loader?minimize',
          fallback: 'vue-style-loader'
				}) : ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
				// 图片打包
				test: /\.(?:jpg|png|gif)$/,
				// 此时的name决定图片打包后的路径,使用相对路径
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(eot|woff|ttf)$/,
        loader: 'file-loader'
      }
		]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[md5:contenthash:hex:20].css',
      allChunks: true
    }),
    new styleLintPlugin({
      cache: true,
      files: ['src/style/*.l?(e|c)ss', 'src/views/**/*.vue', 'src/components/**/*.vue']
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
			'@': path.resolve(__dirname, '../src'),
			'vue$': 'vue/dist/vue.min.js'
		}
	},
	devtool: isProd ? false : '#cheap-module-source-map'
}