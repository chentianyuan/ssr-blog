import { Injectable } from "@decorators/di"
import { Controller, Response, Body, Post, Get, Request } from "@decorators/express"
import { SuccessMsg, FailedMsg } from "../model/message"
import User from "../entities/User"
import ViewService from "../service/ViewService"

@Injectable()
@Controller('/api')
export default class ViewController {
  constructor (private viewService: ViewService) {}

  @Post('/view/addView')
  async addView (@Response() res, @Body() body: User) {
    let result: any = await this.viewService.addView()
    if (result) {
      res.send(new SuccessMsg(result, '调用成功'))
    } else {
      res.send(new FailedMsg(null, 'server error'))
    }
    return
  }

  @Get('/view/checkView')
  async checkView (@Request() req, @Response() res) {
    let result: any = await this.viewService.checkView()
    if (result) {
      res.send(new SuccessMsg(result, '调用成功'))
    } else {
      await this.viewService.insertView()
      result = await this.viewService.checkView()
      res.send(new SuccessMsg(result, '调用成功'))
    }
    return
  }
}
