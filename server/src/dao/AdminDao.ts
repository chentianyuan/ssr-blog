// dao中存储了所有对entities实体的基本操作

import { Injectable } from '@decorators/di'
import { getRepository as getRep } from 'typeorm'
import '../entities/Admin'

@Injectable()
export default class AdminDao {
  findUserAcountByNameAndPwd (admin: string, password: string) {
    // 先通过getRepository方法获取到admin实体
    return getRep
  }
}
