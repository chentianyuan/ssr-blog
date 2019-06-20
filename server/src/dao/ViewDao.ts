import { Injectable } from "@decorators/di"
import { getRepository } from "typeorm"
import View from "../entities/View"

@Injectable()
export default class ViewDao {
  // 浏览量
  public async checkView () {
    return await getRepository(View)
    .createQueryBuilder()
    .select()
    .where('id = 1')
    .getOne()
  }

  // 浏览量 +1
  public async addView () {
    return await getRepository(View).manager.query(`UPDATE view SET view_times= view_times + 1 WHERE id = 1`)
  }

  // 新增浏览记录
  public async newView () {
    return await getRepository(View)
    .createQueryBuilder()
    .insert()
    .into(View)
    .values([{id: 1, view_times: 0}])
    .execute()
  }
}
