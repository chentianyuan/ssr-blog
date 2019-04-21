// dao中存储了所有对entities实体的基本操作
// 在dao的操作中处理查询数据
// service中处理返回的数据

import { Injectable } from '@decorators/di'
import { getRepository as getRep } from 'typeorm'
import Post from '../entities/Post'
import Tag from '../entities/Tag'

@Injectable()
export default class PostDao {
  // 新增一篇文章
  async insertPost (post: Post): Promise<any> {
    let postInstance = new Post()
    postInstance = Object.assign(postInstance, post)
    postInstance.tags = []
    // ManyToMany先插入Tag表
    for (let item of post.tags) {
      let tag = new Tag()
      tag.tagName = item.tagName
      postInstance.tags.push(tag)
      await this.insertTag(tag)
    }
    // 插入Post表
    // 会生成一张中间表，以关系所属者的id为主键
    return await getRep(Post).manager.save(postInstance)
  }

  async insertTag (tag) {
    return await getRep(Tag).manager.save(tag)
  }

  // 获取一篇文章
  async getPostById ({ postId }): Promise<any> {
    return await getRep(Post)
    .createQueryBuilder()
    .select()
    .where('id = :postId', { postId })
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

  // 获取文章对应tags
  // async getPostTags (): Promise<any> {
  //   return await getRep
  // }
}
