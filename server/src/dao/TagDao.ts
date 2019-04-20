import { Injectable } from "@decorators/di"
import { getRepository } from "typeorm"
import Tag from "../entities/Tag"

@Injectable()
export default class TagDao {
  // 获取所有Tag
  async getAllTags () {
    getRepository(Tag)
    .createQueryBuilder()
    .select()
    .getMany()
  }
}