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
}
