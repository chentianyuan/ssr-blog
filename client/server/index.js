
const isProd = process.env.NODE_ENV === 'production'
const fs = require('fs')
const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')

const resolve = file => path.resolve(__dirname, file)
const app = express()

let renderer
let readyPromise
const templatePath = resolve('../index.template.html')

if (isProd) {
  const clientManifest = require('../dist/vue-ssr-client-manifest.json')
	const bundle = require('../dist/vue-ssr-server-bundle.json')
	// 传入带有<!--vue-ssr-outlet-->插槽的模板和打包好的服务端文件，创建renderer
  const template = fs.readFileSync(templatePath, 'utf-8')
  renderer = require('vue-server-renderer').createBundleRenderer(bundle, {
    template,
    clientManifest
	})
} else {
	// 开发环境
	// webpack-dev-middleware + webpack-hot-middleware 自定义实现热更新服务功能
  readyPromise = require('../build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = require('vue-server-renderer').createBundleRenderer(bundle, options)
    }
  )
}

// Cache-control缓存
const serve = (path, cache) => express.static(resolve(path), {
	maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

if (isProd) {
} else {
	// 开发模式下，资源缓存在根目录内存中，不用再指向dist，由webpack-middle-ware提供
	// favicon接收一段buffer或者String
	app.use(favicon(resolve('../src/static/avatar.png')))
	app.use('/static', serve('./dist/static', false))
}

const render = (req, res) => {
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
	res.setHeader('Content-Type', 'text/html')
	renderer.renderToString(context, (err, html) => {
		if (err) {
			console.error(err);
			res.status(500).end('服务器内部错误');
			return;
		}
		res.end(html, 'utf-8');
	})
}

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

// todo: 404，500页面

const port = process.env.PORT || 1226
app.listen(port, () => {
	console.log(`server started at localhost:${port}`)
})