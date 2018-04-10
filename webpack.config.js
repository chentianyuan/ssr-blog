
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const lessExtract = new ExtractTextWebpackPlugin('css/less.css')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        index: path.join(__dirname,'src/index.js')
    },
    output: {
        path: path.join(__dirname,'/dist'),
        filename: 'bundle.js',
        publicPath:'/',
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
                use: lessExtract.extract({
                    use: ['vue-style-loader','css-loader','postcss-loader','less-loader']
                })
            },{
                // 图片打包
                test: /\.(?:jpg|png|gif)$/,
                loader: 'url-loader?limit=8192&name=static/[name].[hash:6].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            // 使用的入口模板
            template: path.resolve(__dirname,'index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new PrerenderSpaPlugin({
            staticDir: path.join(__dirname,'./dist'),
            indexPath: path.join(__dirname, 'dist', 'index.html'),
            routes: ['/','/hotNews','/findNews'],
            // 定时捕获
            renderer: new Renderer({
                renderAfterTime: 1000
                // 监听到自定事件时捕获
                // captureAfterDocumentEvent: 'custom-post-render-event',
                // headless: true
                // 查询到指定元素时捕获
                // captureAfterElementExists: '#content',
            })
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname,'./dist'),
        port: 8080,
        // 页面热更新(局部)，而不是整体刷新
        hot: true,
        // history模式返回所需
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'https://www.apiopen.top/satinApi',
                // rewrite
                pathRewrite: {'^/api' : ''},
                changeOrigin: true
            }
        }
    },
    resolve:{
        extensions: ['*', '.js', '.vue', '.json'],
        // vuejs包含两种使用方式，standalone和runtime-only，runtime-only不包含template编译
        // NPM包默认导出的是runtime-only build.因此为了要使用独立构建，在webpack配置中需要添加下面的代码
        alias: {
            'vue$': 'vue/dist/vue.min.js'
        }
    },
    devtool:'source-map'
}