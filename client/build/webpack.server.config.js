const webpack = require('webpack')
const base = require('./webpack.base.config')
const merge = require('webpack-merge')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = merge(base, {
	target: 'node',
	// devtool: '#source-map',
	entry: './src/entry-server.js',
	output: {
		// 输出路径更名
		filename: 'server-bundle.js',
		// 指定模块机制，服务端无法使用ES6的模块机制
		libraryTarget: 'commonjs2'
	},
	//外部依赖，不需要打包进 server-bundle.js
	externals: nodeExternals({
		// do not externalize CSS files in case we need to import it from a dep
		whitelist: [/\.css$/]
	}),
	plugins: [
		new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"'
		}),
		new VueSSRServerPlugin()
	]
})
