const webpack = require('webpack')
const base = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')


const config = Object.assign({}, base, {
    // hk使用了firebase实时性云数据库，这里先不使用
    // 通过配置DefinePlugin，那么这里面的标识就相当于全局变量，你的业务代码可以直接使用配置的标识。
    // 其实这里通过 DefinePlugin 来指定生产环境后，以便在压缩时可以让 UglifyJS 自动删除代码块内的警告语句。
    entry: {
        // 默认为客户端入口
        index: path.join(__dirname, './src/client-entry.js')
    },
    plugins: (base.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        new HtmlWebpackPlugin({
            // 使用的入口模板
            template: path.resolve(__dirname,'index.template.html'),
            filename: 'index.html',
            inject: 'body'
        })
    ]),
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 2,
                    name: 'common'
                }
            }
        }
    }
})

if(process.env.NODE_ENV === 'production'){
    // webpack2中配置一些生产环境特打包的优化常用方式
}

module.exports = config