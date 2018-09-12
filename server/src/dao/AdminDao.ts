// dao中存储了所有对entities实体的基本操作

import { Injectable } from '@decorators/di'
import { getRepository as getRep } from 'typeorm'
import Admin from '../entities/Admin'

@Injectable()
export default class AdminDao {
  findUserAcountByNameAndPwd (admin: string, password: string) {
    // 先通过getRepository方法获取到admin实体
    return getRep(Admin)
    // 创建查询结构体
    .createQueryBuilder()
    // 查询语句
    .select()
    // 条件语句
    .where('admin = :admin', { admin })
    .andWhere('password = :password', { password })
    .getOne()
  }
}
