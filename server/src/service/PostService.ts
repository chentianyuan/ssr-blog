// entities用于创建数据库实体
// dao用于最基本的数据库操作
// service文件才是真正进行sql语句组合操作的文件
// controller属于服务端路由生成项目api

import { Injectable } from '@decorators/di'
import PostDao from '../dao/PostDao'

@Injectable()
export default class PostService {
  constructor(private postDao: PostDao) {
    // 每生成一个该类的对象，就会自动为其注入参数中的属性
    // 该类也可以看做一个默认的由自身创建的对象
  }

  // 插入数据
  insertPost (params) {
    return this.postDao.insertPost(params)
  }

  // 返回所有
  findAllPost () {
    return this.postDao.getAllPost()
  }

  // 文章查询
  getPostById (id: string | number) {
    return this.postDao.getPostById(id)
  }
  
  // 查询文章数量
  getPostCount (tagId?: number) {
    return this.postDao.getPostCount(tagId)
  }

  // 文章分页查询
  getPaginationPost (pageIndex: number, pageSize: number) {
    return this.postDao.getPaginationPost(pageIndex, pageSize)
  }

  // 增加阅读量
  viewsCountAdd (id: number) {
    return this.postDao.viewsCountAdd(id)
  }

  // 增加点赞数
  likesCountAdd (id: number) {
    return this.postDao.likesCountAdd(id)
  }

  // 增加评论数
  commentsCountAdd (id: number) {
    return this.postDao.commentsCountAdd(id)
  }

  findPostByTag (pageIndex: number, pageSize: number, tagId: number) {
    return this.postDao.findPostByTag(pageIndex, pageSize, tagId)
  }

  deletePostById (id: number) {
    return this.postDao.deletePostById(id)
  }
}
