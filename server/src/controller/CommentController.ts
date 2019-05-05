import { Injectable } from "@decorators/di"
import CommentService from "../service/CommentService"
import { Controller, Request, Response, Body, Post, Get } from "@decorators/express"
import { SuccessMsg, FailedMsg } from "../model/message"
import { Comment } from '../interface/comment'

@Injectable()
@Controller('/api')
export default class CommentController {
  constructor (private commentService: CommentService) {}

  @Post('/comment/insertComment')
  async insertComment (@Request() req, @Response() res, @Body() body: Comment) {
    let comment = {
      name: body.name,
      email: body.email,
      link: body.link,
      content: body.content,
      // 实体名是什么，入参需对应
      post: body.post
    }
    let result: any = await this.commentService.insertComment(comment)
    if (result) {
      res.send(new SuccessMsg(result, '插入成功'))
    } else {
      res.send(new FailedMsg(null, '插入失败'))
    }
    return
  }

  @Get('/comment/getleaveComment')
  async getAllLeaveComment (@Response() res) {
    let result: any = await this.commentService.getAllLeaveComment()
    if (result) {
      res.send(new SuccessMsg(result, '获取成功'))
    } else {
      res.send(new FailedMsg(null, '获取失败'))
    }
    return
  }
}
