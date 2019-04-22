// entities用于创建数据库实体
// dao用于最基本的数据库操作
// service文件才是真正进行sql语句组合操作的文件
// controller属于服务端路由生成项目api

import { Injectable } from '@decorators/di'
import TagDao from '../dao/TagDao'

@Injectable()
export default class TagService {
  constructor(private tagDao: TagDao) {
    // 每生成一个该类的对象，就会自动为其注入参数中的属性
    // 该类也可以看做一个默认的由自身创建的对象
  }

  // 插入数据
  insertTag (params) {
    return this.tagDao.insertTag(params)
  }

  // 返回所有
  findAllTag () {
    return this.tagDao.getAllTags()
  }

  // 查找一个tag
  findOneTag (tag) {
    return this.tagDao.findOneTag(tag)
  }

  updateTag (tag) {
    return this.tagDao.updateTag(tag)
  }
}
