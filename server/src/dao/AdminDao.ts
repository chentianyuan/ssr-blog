// dao中存储了所有对entities实体的基本操作

import { Injectable } from '@decorators/di'
import { getMongoRepository as getRep } from 'typeorm'
import Admin from '../entities/Admin'

@Injectable()
export default class AdminDao {
  async findUserAcountByNameAndPwd (admin: string, password: string) {
    // 先通过getRepository方法获取到admin实体
    return await getRep(Admin)
    .findOne({
      admin, password
    })
  }
}
