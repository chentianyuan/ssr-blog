import { Injectable } from '@decorators/di'
import { Controller, Response, Body, Post, Request, Get } from '@decorators/express/lib'
import PostService from '../service/PostService'
import TagService from '../service/TagService'
import CommentService from '../service/CommentService'
import { SuccessMsg, FailedMsg } from '../model/message'

// 注入功能支持
@Injectable()
// 控制器前缀
@Controller('/api')
// 控制器实现
export default class PostController {
  constructor (private postService: PostService, private tagService: TagService, private commentService: CommentService) {
    // 注入了PostServer便于使用
  }

  // 装饰器直接读取该对应的Controller触发时的回调所获取的值
  @Get('/post/list')
  async selectAllPost <T>(@Request() req, @Response() res, @Body() body): Promise<void> {
    // let { isLogin } = req.session
    // ret为service中执行的sql所获取的数据对象
    let result: any = await this.postService.findAllPost()
    // TODO：数据未返回，服务端渲染身份鉴权
    if (result) {
      res.send(new SuccessMsg(result, '查询成功'))
    } else {
      res.send(new FailedMsg(null, '查询失败'))
    }
    return
  }

  @Post('/post/insert')
  async insertNewPost <T>(@Request() req, @Response() res, @Body() body): Promise<void> {
    let { title, descript, content, meta, tags = '' } = body
    try {
      let tagStore = await this.tagService.insertOrUpdateTag(tags)
      // tagStore必须要有tagId与之对应，否则中间表不会插入新数据
      let result = await this.postService.insertPost({ title, descript, content, meta, tags: tagStore })
      res.send(new SuccessMsg(result, '插入成功'))
    } catch (e) {
      res.send(new FailedMsg('插入失败'))
    }
    return
  }

  @Post('/post/updateArticle')
  async updatePostById (@Response() res, @Body() body): Promise<void> {
    let { postId, title, descript, content, tags = '' } = body
    try {
      if (body.postId) {
        let tagStore = await this.tagService.insertOrUpdateTag(tags)
        let result = await this.postService.updatePostById({ id: Number(postId), title, descript, content, tags: tagStore })
        result ? res.send(new SuccessMsg(result)) : res.send(new FailedMsg())
      } else {
        res.send(new FailedMsg('参数错误'))
      }
    } catch (e) {}
  }

  @Post('/post/onepost')
  async getOnePost (@Request() req, @Response() res, @Body() body): Promise<void> {
    let { postId } = body
    try {
      if (postId) {
        let result = await this.postService.getPostById(postId)
        result ? res.send(new SuccessMsg(result)) : res.send(new FailedMsg())
      } else {
        res.send(new FailedMsg('参数错误'))
      }
    } catch (e) {}
    return
  }

  @Post('/post/pagination')
  async getPaginationPost (@Response() res, @Body() body): Promise<void> {
    let { pageSize, pageIndex } = body
    try {
      // pageIndex从0开始
      let result = await this.postService.getPaginationPost(pageIndex - 1, pageSize)
      let count = await this.postService.getPostCount();
      (result && count) ? res.send(new SuccessMsg(Object.assign({count}, {postList: result.reverse()}))) : res.send(new FailedMsg())        
    } catch (e) {}
    return
  }

  @Post('/post/pagination/withtag')
  async findPostByTag (@Response() res, @Body() body): Promise<void> {
    let { pageSize, pageIndex, tagId } = body
    try {
      // pageIndex从0开始
      let result = await this.postService.findPostByTag(pageIndex - 1, ~~pageSize, Number(tagId))
      let count = await this.postService.getPostCount(Number(tagId));
      (result && count) ? res.send(new SuccessMsg(Object.assign({count}, {postList: result.reverse()}))) : res.send(new FailedMsg())        
    } catch (e) {}
    return
  }

  @Post('/post/views')
  async addPostViewsCount (@Response() res, @Body() body): Promise<void> {
    let { postId } = body
    try {
      if (postId) {
        let result = await this.postService.viewsCountAdd(postId)
        result ? res.send(new SuccessMsg(result)) : res.send(new FailedMsg())
      } else {
        res.send(new FailedMsg('参数错误'))
      }
    } catch (e) {}
  }

  @Post('/post/likes')
  async addPostLikesCount (@Response() res, @Body() body): Promise<void> {
    let { postId } = body
    try {
      if (postId) {
        let result = await this.postService.likesCountAdd(postId)
        result ? res.send(new SuccessMsg(result)) : res.send(new FailedMsg())
      } else {
        res.send(new FailedMsg('参数错误'))
      }
    } catch (e) {}
  }

  @Post('/post/deleteArticle')
  async deletePostById (@Response() res, @Body() body): Promise<void> {
    let { postId } = body
    try {
      if (postId) {
        await this.commentService.deleteCommentById(postId)
        let result = await this.postService.deletePostById(postId)
        result ? res.send(new SuccessMsg(result)) : res.send(new FailedMsg())
      } else {
        res.send(new FailedMsg('参数错误'))
      }
    } catch (e) {}
  }
}

