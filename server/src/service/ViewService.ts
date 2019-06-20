import { Injectable } from "@decorators/di"
import ViewDao from "../dao/ViewDao"

@Injectable()
export default class UserService {
  constructor (private viewDao: ViewDao) {}

  async addView () {
    return await this.viewDao.addView()
  }

  async checkView () {
    return await this.viewDao.checkView()
  }

  async insertView () {
    return await this.viewDao.newView()
  }
}