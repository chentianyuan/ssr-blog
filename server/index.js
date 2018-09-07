
const isProd = process.env.NODE_ENV === 'production'
const fs = require('fs')
const path = require('path')
const express = require('express')

const resolve = file => path.resolve(__dirname, file)
const app = express()

let indexHTML
let renderer
// let serverBundle

if (isProd) {
	var bundle = fs.readFileSync(resolve('./dist/vue-ssr-server-bundle.json'), 'utf-8')
	indexHTML = fs.readFileSync(resolve('./index.template.html'), 'utf-8')
	// 传入带有<!--vue-ssr-outlet-->插槽的模板和打包好的服务端文件，创建renderer
	renderer = require('vue-server-renderer').createBundleRenderer(bundle, {
		template: indexHTML
	})
} else {
	// 开发环境
	// express + webpack-dev-middleware 自定义实现 webpack-dev-server 服务功能
	require('../build/setup-dev-server')(app, {
		indexUpdated: index => {
			// 等同于fs.readFileSync(resolve('./dist/index.html'),'utf-8')
			indexHTML = index
		},
		bundleUpdated: bundle => {
			// 创建一个渲染容器   
			renderer = require('vue-server-renderer').createBundleRenderer(bundle, {
				template: indexHTML
			})
		}
	})
}

const serve = (path, cache) => express.static(resolve(path), {
	maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

// 带有/favicon.ico结尾的绝对路径转到./dist/static/avatar.0c85f1.png下
if (isProd) {
} else {
	// 开发模式下，资源缓存在根目录内存中，不用再指向dist
	app.use('/favicon.ico', serve('./static/avatar.0c85f1.png'))
	app.use('/static', serve('./dist/static'))
}
// app.use(express.static('dist'))

app.get('*', (req, res) => {
	if (!renderer) {
		return res.end('waiting for compilation... refresh in a moment.')
	}
	const context = {
		url: req.url,
		req,
		res
	}
	// context注入
	// const App = createApp(context)
	console.log('进入路由')
	res.setHeader('Content-Type', 'text/html')
	renderer.renderToString(context, (err, html) => {
		console.log(err, html)
		if (err) {
			console.error(err);
			res.status(500).end('服务器内部错误');
			return;
		}
		res.end(html);
	})
})

const port = process.env.PORT || 1226
app.listen(port, () => {
	console.log(`server started at localhost:${port}`)
})