import { Injectable } from '@decorators/di'
import { Controller, Response, Body, Post, Request, Get } from '@decorators/express'
import PostService from '../service/PostService'
import { SuccessMsg, FailedMsg } from '../model/message'

// 注入功能支持
@Injectable()
// 控制器前缀
@Controller('/api')
// 控制器实现
export default class PostController {
  constructor (private postService: PostService) {
    // 注入了PostServer便于使用
  }

  // 装饰器直接读取该对应的Controller触发时的回调所获取的值
  @Post('/post/list')
  async selectAllPost <T>(@Request() req, @Response() res, @Body() body): Promise<T> {
    let { isLogin } = req.session
    // ret为service中执行的sql所获取的数据对象
    if (isLogin) {
      const ret: any = await this.postService.findAllPost()
      // TODO：数据未返回，服务端渲染身份鉴权
      res.json(new SuccessMsg('查询成功', ret))
    } else {
      res.json(new FailedMsg('请先登录', null))
    }
    return
  }

  @Post('/post/insert')
  async insertNewPost <T>(@Request() req, @Response() res, @Body() body): Promise<T> {
    let { text } = body
    if (req.session.isLogin) {
      await this.postService.insertPost({ admin: req.session.admin, postText: text, insterTime: new Date().getTime()})
      res.json(new SuccessMsg('插入成功', null))
    } else {
      res.json(new FailedMsg('请先登录', null))
    }
    return
  }
}
