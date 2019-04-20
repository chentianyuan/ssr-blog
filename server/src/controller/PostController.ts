import { Injectable } from '@decorators/di'
import { Controller, Response, Body, Post, Request, Get } from '@decorators/express/lib'
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
  async selectAllPost <T>(@Request() req, @Response() res, @Body() body): Promise<void> {
    // let { isLogin } = req.session
    // ret为service中执行的sql所获取的数据对象
    const ret: any = await this.postService.findAllPost()
    // TODO：数据未返回，服务端渲染身份鉴权
    if (ret) {
      res.send(new SuccessMsg('查询成功', ret))
    } else {
      res.send(new FailedMsg('查询失败', null))
    }
    return
  }

  @Post('/post/insert')
  async insertNewPost <T>(@Request() req, @Response() res, @Body() body): Promise<void> {
    let { title, descript = '', content, meta, tags } = body
    try {
      console.log(123)
      await this.postService.insertPost({ title, descript, content, meta, tags })
      res.send(new SuccessMsg('插入成功', null))
    } catch (e) {
      console.log(e)
      res.send(new FailedMsg('插入失败', null))
    }
    return
  }
}