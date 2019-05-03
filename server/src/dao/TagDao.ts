import { Injectable } from "@decorators/di"
import { getRepository as getRep } from "typeorm"
import Tag from "../entities/Tag"

@Injectable()
export default class TagDao {
  // 获取所有Tag
  async getAllTags () {
    return await getRep(Tag)
    .createQueryBuilder('tag')
    .select()
    .getMany()
  }

  // 获取所有tag和其对应的文章
  async getAllTagsWithPosts () {
    return await getRep(Tag)
    .createQueryBuilder('tag')
    .leftJoinAndSelect('tag.posts', 'posts')
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

  // 单个标签查找
  async findOneTag (tag) {
    let tagId = tag.tagId
    let tagName = tag.tagName
    return await getRep(Tag)
    .createQueryBuilder()
    .select()
    .where('id = :tagId', { tagId })
    .orWhere('tagName = :tagName', { tagName })
    .getOne()
  }
}