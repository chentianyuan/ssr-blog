// dao中存储了所有对entities实体的基本操作
// 在dao的操作中处理查询数据
// service中处理返回的数据

import { Injectable } from '@decorators/di'
import { getRepository as getRep, getConnection } from 'typeorm'
import Post from '../entities/Post'
import Tag from '../entities/Tag'
import { Meta } from '../model/postModel'

@Injectable()
export default class PostDao {
  // 新增一篇文章
  async insertPost (post: Post): Promise<any> {
    let postInstance = new Post()
    postInstance = Object.assign(postInstance, post)
    postInstance.tags = []
    // ManyToMany先插入Tag表
    let tag: Tag
    for (tag of post.tags) {
      postInstance.tags.push(tag)
    }
    // 插入Post表
    // 会生成一张中间表，以关系所属者的id为主键
    return await getRep(Post).manager.save(postInstance)
  }

  // 获取一篇文章
  async getPostById (id: String | Number): Promise<any> {
    return await getRep(Post)
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.tags', 'tags')
    // 需要select()收尾
    .select()
    .where('post.id = :postId', {postId: id})
    .getOne()
  }

  // 获取所有文章信息
  async getAllPost (): Promise<any> {
    return await getRep(Post)
    // 或者只使用find()查询
    // findAndCount返回[ 所有查询结果， 结果数量 ]
    .createQueryBuilder('post')
    // 左连接查询
    .leftJoinAndSelect('post.tags', 'tags')
    .getMany()
  }

  // 文章分页查询
  async getPaginationPost (pageIndex: number, pageSize: number): Promise<any> {
    return await getRep(Post)
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.tags', 'tags')
    .select()
    .skip(pageIndex * pageSize)
    .take(pageSize)
    // descend 降序 asc升序
    .orderBy('post.created_at', 'DESC')
    .getMany()
  }

  // 添加浏览记录
  async viewsCountAdd (postId: number): Promise<any> {
    // wtffffffffff佛慈悲
    return await getRep(Post).manager.query(`UPDATE post SET metaViews= metaViews + 1 WHERE id = ${postId}`)
    // return await getRep(Post).manager.update(Meta, {id: postId}, {views: 1})
    // return await getRep(Tag).manager.increment(Tag, {id: 54}, 'count', 1)
    // return await getRep(Post).manager.increment(Meta, {views: 0}, 'views', 1)
    // return await getRep(Post)
    // .createQueryBuilder()
    // .update(Meta)
    // .where('id = :id', {id: postId})
    // .createQueryBuilder()
    // .set({
    //   views: 1
    // })
    // .execute()
    // return await getRep(Post)
    // .createQueryBuilder()
    // .relation(Post, 'meta')
    // .of({id: postId})
    // .set({metaViews: 1})
  }

  // 点赞数
  async likesCountAdd (postId: number): Promise<any> {
    return await getRep(Post).manager.query(`UPDATE post SET metaLikes = metaLikes + 1 WHERE id = ${postId}`)
  }

  // 评论数
  async commentsCountAdd (postId: number): Promise<any> {
    return await getRep(Post).manager.query(`UPDATE post SET metaComments = metaComments + 1 WHERE id = ${postId}`)
  }
}
