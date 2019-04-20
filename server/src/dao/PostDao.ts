// dao中存储了所有对entities实体的基本操作

import { Injectable } from '@decorators/di'
import { getRepository as getRep } from 'typeorm'
import Post from '../entities/Post'

@Injectable()
export default class PostDao {
  // 新增一篇文章
  async insertPost (post): Promise<any> {
    // console.log(post.tags)
    post.tags = 'vue,javascript'
    // 先通过getRepository方法获取到Post实体
    return await Promise.all([
      getRep(Post)
      .createQueryBuilder()
      .insert()
      .values(post)
      .execute()
    ])
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
    .createQueryBuilder()
    .select()
    .getMany()
  }
}
