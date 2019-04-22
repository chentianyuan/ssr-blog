import { Injectable } from "@decorators/di"
import { getRepository as getRep } from "typeorm"
import Tag from "../entities/Tag"

@Injectable()
export default class TagDao {
  // 获取所有Tag
  async getAllTags () {
    getRep(Tag)
    .createQueryBuilder()
    .select()
    .getMany()
  }

  // 插入一条tag
  async insertTag (tag: Tag) {
    return await getRep(Tag).manager.save(tag)
  }

  // tag count属性++
  async updateTag (tag) {
    return await getRep(Tag).manager.increment(Tag, {tagName: tag.tagName}, 'count', 1)
  }

  async findOneTag (tag) {
    let tagName = tag.tagName
    return await getRep(Tag)
    .createQueryBuilder()
    .select()
    .where('tagName = :tagName', { tagName })
    .getOne()
  }
}