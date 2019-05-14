import { Injectable } from "@decorators/di"
import UserDao from "../dao/UserDao"

@Injectable()
export default class UserService {
  constructor (private userDao: UserDao) {}

  async LoginVerify (username: string, password: string) {
    return await this.userDao.LoginVerify(username, password)
  }
}