import { Injectable } from "@decorators/di"
import { getRepository } from "typeorm"
import User from "../entities/User"

@Injectable()
export default class UserDao {
  // 登录验证
  public async LoginVerify (username: string, password: string) {
    return await getRepository(User)
    .createQueryBuilder()
    .select()
    .where('username = :username', { username })
    .andWhere('password = :password', { password })
    .getOne()
  }
}
