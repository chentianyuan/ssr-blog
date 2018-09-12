import 'reflect-metadata'
import * as express from 'express'
import { createConnection } from 'typeorm'
import * as bodyParser from 'body-parser'
import * as cookieParse from 'cookie-parser'

createConnection().then(async connection => {
  // 这里可以写实体操作相关的代码
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(cookieParse())
  app.listen(3000)

  console.log("Express application is up and running on port 3000")

}).catch(error => console.log("TypeORM connection error: ", error))