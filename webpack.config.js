
const path = require('path')

module.exports = {
    //mode: process.env.NODE_ENV,
    entry: {
        index: path.join(__dirname,'src/index.js')
    },
    output: {
        path: path.join(__dirname,'/dist'),
        filename: 'bundle.js'
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
        
    ],
    resolve:{
        extensions: ['*', '.js', '.vue', '.json'],
        // vuejs包含两种使用方式，standalone和runtime-only，runtime-only不包含template编译
        // NPM包默认导出的是runtime-only build.因此为了要使用独立构建，在webpack配置中需要添加下面的代码
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
}