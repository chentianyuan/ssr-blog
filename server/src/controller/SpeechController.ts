import { Injectable } from '@decorators/di'
import { Controller, Response, Body, Post, Request } from '@decorators/express'
import SpeechService from '../service/SpeechService'
import { SuccessMsg, FailedMsg } from '../model/message'

// 注入功能支持
@Injectable()
// 控制器前缀
@Controller('/api')
// 控制器实现
export default class SpeechController {
  constructor (private speechService: SpeechService) {
    // 注入了SpeechServer便于使用
  }

  // 装饰器直接读取该对应的Controller触发时的回调所获取的值
  @Post('/speech/findAll')
  async selectAllSpeech <T>(@Request() req, @Response() res, @Body() body): Promise<T> {
    // ret为service中执行的sql所获取的数据对象
    if (req.session.isLogin) {
      const ret: any = await this.speechService.findAllSpeech()
      res.json(new SuccessMsg('查询成功', ret))
    } else {
      res.json(new FailedMsg('请先登录', null))
    }
    return
  }

  @Post('/speech/insert')
  async insertNewSpeech <T>(@Request() req, @Response() res, @Body() body): Promise<T> {
    let { text } = body
    if (req.session.isLogin) {
      await this.speechService.insertSpeech(req.session.admin, text)
      res.json(new SuccessMsg('插入成功', null))
    } else {
      res.json(new FailedMsg('请先登录', null))
    }
    return
  }
}
