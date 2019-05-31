import { Injectable } from "@decorators/di"
import { Controller, Response, Body, Post, Get, Request } from "@decorators/express"
import { SuccessMsg, FailedMsg } from "../model/message"
import User from "../entities/User"
import UserService from "../service/UserService"
import jwt = require('jsonwebtoken')

@Injectable()
@Controller('/api')
export default class UserController {
  constructor (private userService: UserService) {}

  @Post('/user/verify')
  async getLoginInfo (@Response() res, @Body() body: User) {
    let result: any = await this.userService.LoginVerify(body.username, body.password)
    if (result) {
      const userToken = {
        username: body.username,
        loginAt: new Date().toLocaleString()
      }
      // 签发token
      // 过期时间48个小时
      const token = jwt.sign(userToken, 'ssh', { expiresIn: '7d' })
      res.send(new SuccessMsg(Object.assign(result, { token }), '登录成功'))
    } else {
      res.send(new FailedMsg(null, '登录失败'))
    }
    return
  }

  @Get('/user/mini-info')
  async getUserInfo (@Request() req, @Response() res) {
    if (req.decoded) {
      res.send(new SuccessMsg({ decoded: req.decoded }, '用户已登录'))
    } else {
      res.send(new FailedMsg(null, '未登录'))
    }
  }
}
