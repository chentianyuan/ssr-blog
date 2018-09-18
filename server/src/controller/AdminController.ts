import { Injectable } from '@decorators/di'
import { Controller, Response, Body, Post, Get, Request } from '@decorators/express'
import AdminService from '../service/AdminService'
import { SuccessMsg, FailedMsg } from '../model/message'

// 注入功能支持
@Injectable()
// 控制器前缀
@Controller('/api')
// 控制器实现
export default class AdminController {
  constructor (private adminService: AdminService) {
    // 注入了AdminServer便于使用
  }

  // 装饰器直接读取该对应的Controller触发时的回调所获取的值
  @Post('/auth/admin')
  async adminLogin <T>(@Request() req, @Response() res, @Body() body): Promise<T> {
    const { admin, password } = body
    // ret为service中执行的sql所获取的数据对象
    const ret: any = await this.adminService.login(admin, password)
    console.log(ret)
    if (ret) {
      // 写入session信息，内存储存，因为通过了express-session中间件，获取的是当前用户的session
      req.session.user = ret.admin
      // 之后仅需验证req.isLogin即可
      req.session.isLogin = true
      res.json(new SuccessMsg('登录成功', ret))
    } else {
      res.json(new FailedMsg('用户名或密码输入错误', ret))
    }
    return
  }
}
