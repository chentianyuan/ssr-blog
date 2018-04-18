const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.base.config')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = Object.assign({},base,{
    target: 'node',
    devtool: false,
    entry: './src/server-entry.js',
    output: Object.assign({},base.output,{
        // 输出路径更名
        filename: 'server-bundle.js',
        // 指定模块机制，服务端无法使用ES6的import机制
        libraryTarget:'commonjs2'
    }),
    //外部依赖，不需要打包进 server-bundle.js
    externals: Object.keys(require('./package.json').dependencies),
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("process.env.NODE_ENV || 'development'")
        }),
        // new HtmlWebpackPlugin({
        //     // 使用的入口模板
        //     template: path.resolve(__dirname,'index.template.html'),
        //     filename: 'index.html',
        //     inject: 'body'
        // })
    ]
})
