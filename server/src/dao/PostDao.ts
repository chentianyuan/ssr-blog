// dao中存储了所有对entities实体的基本操作

import { Injectable } from '@decorators/di'
import { getMongoRepository as getRep } from 'typeorm'
import Post from '../entities/Post'

@Injectable()
export default class PostDao {
  // 插入一条数据
  async insertPost ({ admin, postText, insterTime }) {
    // 先通过getRepository方法获取到Post实体
    return await getRep(Post)
    .insertOne({
      text: postText,
      admin: admin,
      time: insterTime
    })
  }

  // 获取集合所有信息 
  async getAllPost () {
    return await getRep(Post)
    // 或者只使用find()查询
    // findAndCount返回[ 所有查询结果， 结果数量 ]
    .find()
  }
}
