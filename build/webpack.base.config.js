
const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const lessExtract = new ExtractTextWebpackPlugin('css/less.css')
// const PrerenderSpaPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSpaPlugin.PuppeteerRenderer

const isProd = process.env.NODE_ENV === 'production'


module.exports = {
    mode: isProd ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: '[name]-[chunkhash].js', // 防缓存
        // publicPath处理静态资源时转为绝对路径
        publicPath: '/dist/',
        // 或者使用clean-webpack-plugin,处理生成的[hash].hot-update.js/json文件
        // hotUpdateChunkFilename: 'hot/hot-update.js',
		// hotUpdateMainFilename: 'hot/hot-update.json'
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
                    use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
                })
            },{
                // 图片打包
                test: /\.(?:jpg|png|gif)$/,
                // 此时的name决定图片打包后的路径,使用相对路径
                loader: 'url-loader?limit=8192&name=static/[name].[hash:6].[ext]',
                // options:{
                //     publicPath: '/dist'
                // }
            }
        ]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        // new CleanWebpackPlugin(['dist']),
        // new PrerenderSpaPlugin({
        //     staticDir: path.join(__dirname,'./dist'),
        //     indexPath: path.join(__dirname, 'dist', 'index.html'),
        //     routes: ['/','/hotNews','/findNews'],
        //     // 定时捕获
        //     renderer: new Renderer({
        //         renderAfterTime: 1000
        //         // 监听到自定事件时捕获
        //         // captureAfterDocumentEvent: 'custom-post-render-event',
        //         // headless: true
        //         // 查询到指定元素时捕获
        //         // captureAfterElementExists: '#content',
        //     })
        // })
    ],
    resolve:{
        extensions: ['*', '.js', '.vue', '.json'],
        // vuejs包含两种使用方式，standalone和runtime-only，runtime-only不包含template编译
        // NPM包默认导出的是runtime-only build.因此为了要使用独立构建，在webpack配置中需要添加下面的代码
        alias: {
            '@': path.resolve(__dirname, '../src')
            // 'vue$': 'vue/dist/vue.min.js'
        }
    },
    devtool:'cheap-source-map'
}