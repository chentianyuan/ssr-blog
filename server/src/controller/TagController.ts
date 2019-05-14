import PostService from "../service/PostService"
import TagService from "../service/TagService"
import { Injectable } from "@decorators/di"
import { Controller, Get, Response, Request, Body, Post } from "@decorators/express"
import { SuccessMsg, FailedMsg } from "../model/message"

@Injectable()
@Controller('/api')
export default class TagController {
  constructor (private tagService: TagService, private postService: PostService) {
  }

  @Get('/tag/list')
  async selectAllTag (@Response() res, @Request() req, @Body() body): Promise<void> {
    try {
      let result: any = await this.tagService.findAllTag()
      result ? res.send(new SuccessMsg(result)) : res.send(new FailedMsg())
      return
    } catch (e) {}
  }

  @Post('/tag/detail')
  async selectOneTag (@Response() res, @Body() body): Promise<void> {
    let { id } = body
    try {
      let result: any = await this.tagService.findOneTag({tagId: id})
      result ? res.send(new SuccessMsg(result)) : res.send(new FailedMsg())
    } catch (e) {}
  }

  @Post('/tag/delete')
  async deleteOneTag (@Response() res, @Body() body): Promise<void> {
    let { tagId } = body
    try {
      let result: any = await this.tagService.deleteTag(tagId)
      result ? res.send(new SuccessMsg(result)) : res.send(new FailedMsg())
    } catch (e) {}
  }

  @Post('/tag/rename')
  async renameTag (@Response() res, @Body() body): Promise<void> {
    try {
      let result: any = await this.tagService.renameTag(body)
      result ? res.send(new SuccessMsg(result)) : res.send(new FailedMsg())
    } catch (e) {}
  }

  @Post('/tag/insert')
  async insertTag (@Response() res, @Body() body): Promise<void> {
    try {
      let result: any = await this.tagService.insertTag(body)
      result ? res.send(new SuccessMsg(result)) : res.send(new FailedMsg())
    } catch (e) {}
  }
}