
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        index: path.join(__dirname,'src/index.js')
    },
    output: {
        path: path.join(__dirname,'/dist'),
        filename: 'bundle.js',
        // 或者使用clean-webpack-plugin,处理生成的[hash].hot-update.js/json文件
        hotUpdateChunkFilename: 'hot/hot-update.js',
		hotUpdateMainFilename: 'hot/hot-update.json'
    },
    module: {
        rules:[
            {
                test: /\.vue$/,
                type: 'javascript/auto',
                loader: 'vue-loader'
            },{
                test: /\.js$/,
                type: 'javascript/auto',
                loader: 'babel-loader',
                exclude: /node_modeules/
            },{
                test: /\.less$/,
                type: 'javascript/auto',
                use: ['vue-style-loader','css-loader','postcss-loader','less-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            // 使用的入口模板
            template: path.resolve(__dirname,'index.html'),
            filename: 'index.html',
            inject: 'body'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname,'./dist'),
        port: 8080,
        // 页面热更新(局部)，而不是整体刷新
        hot: true
    },
    resolve:{
        extensions: ['*', '.js', '.vue', '.json'],
        // vuejs包含两种使用方式，standalone和runtime-only，runtime-only不包含template编译
        // NPM包默认导出的是runtime-only build.因此为了要使用独立构建，在webpack配置中需要添加下面的代码
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devtool:'source-map'
}