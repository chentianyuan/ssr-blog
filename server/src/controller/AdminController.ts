import { Injectable } from '@decorators/di'
import { Controller, Response, Body, Post, Get } from '@decorators/express'
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
  @Get('/auth/admin')
  async adminLogin <T>(@Response() res, @Body() body): Promise<T> {
    // body = {
    //   admin: 'test',
    //   password: '123'
    // }
    body = {
      admin: 'test2',
      password: '456'
    }
    const { admin, password } = body
    console.log(admin, password, '------')
    // ret为service中执行的sql所获取的数据对象
    const ret: any = await this.adminService.login(admin, password)
    console.log(ret)
    if (ret) {
      res.json(new SuccessMsg('登录成功').setData({
        ret
      }))
    } else {
      res.json(new FailedMsg('用户名或密码输入错误'))
    }
    return
  }
}
