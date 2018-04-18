// import createApp from './src';

const isProd = process.env.NODE_ENV === 'production'
const fs = require('fs')
const path = require('path')
const express = require('express')
// const createApp = require('../src/index.js')

const resolve = file => path.resolve(__dirname,file)
const app = express()

let indexHTML
let renderer

if(isProd){
    var bundle = fs.readFileSync(resolve('./dist/server-bundle.js'),'utf-8')
        indexHTML = fs.readFileSync(resolve('./dist/index.html'),'utf-8')  
    renderer = require('vue-server-renderer').createBundleRenderer(bundle,{
        template: indexHTML
    })
}

const serve = (path,cache) => express.static(resolve(path),{
    maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

app.use('/dist', serve('./dist'))
app.use('/favicon.ico',serve('./dist/static/avatar.0c85f1.png'))
// app.use('/static',serve('./dist/static'))
// app.use(express.static('dist'))

app.get('*',(req,res)=>{
    if(!renderer){
        return res.end('waiting for compilation... refresh in a moment.')
    }
    const context = { url: req.url }
    // context注入
    // const App = createApp(context)
    res.setHeader("Content-Type","text/html")
    renderer.renderToString(context, (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).end('服务器内部错误');
            return;
        }
        // 嵌入初始 store 的状态 转至server-entry.js
        // if (context.initialState) {
        //     console.log(context.initialState)
        //     res.write(
        //     `<script>window.__INITIAL_STATE__=${
        //         context.initialState
        //     }</script>`
        //     )
        // }
        res.end(html);
    })
})

const port = process.env.PORT || 1226
app.listen(port, ()=>{
    console.log(`server started at localhost:${port}`)
})