import 'reflect-metadata'
import * as express from 'express'
import { createConnection } from 'typeorm'
import * as bodyParser from 'body-parser'
import * as cookieParse from 'cookie-parser'
import { attachControllers } from '@decorators/express'

// test
// import AdminController from './src/controller/AdminController'

// 导入所有控制器数组
import controllers from './src/controller/index'

// createConnection会自动搜寻根目录下的ormconfig.json配置文件，进行数据库连接和建表
createConnection().then(async connection => {
  // 这里可以写实体操作相关的代码
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(cookieParse())

  // 注册所有控制器，实现路由控制
  attachControllers(app, controllers)

  // 404
  app.use(function (req, res, next) {
    const err: any = new Error('Not Found')
    err.status = 404
    // 额外传入的参数会在下一个中间件被发现
    next(err)
  })

  // 500
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      code: err.status,
      msg: err.toString()
    })
  })

  app.listen(3000)

  console.log("Express application is up and running on port 3000")

}).catch(error => console.log("TypeORM connection error: ", error))