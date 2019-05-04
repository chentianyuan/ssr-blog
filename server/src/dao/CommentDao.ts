import { Injectable } from "@decorators/di"
import { getRepository } from "typeorm"
import Comment from "../entities/Comment"

@Injectable()
export default class CommentDao {
  // 插入一条评论
  public async insertComment (comment) {
    return await getRepository(Comment)
    .createQueryBuilder()
    .insert()
    .into(Comment)
    .values(comment)
    .execute()
  }

  // 查询所有非文章评论
  public async getAllLeaveComment () {
    return await getRepository(Comment)
    .createQueryBuilder('comment')
    .leftJoinAndSelect('comment.post', 'post')
    // 查询为空的列不能使用id = :id的形式，使用is表达式
    .where('comment.postId is :post', {post: null})
    .select()
    .getMany()
  }


  // 删除某篇文章的所有评论
  async deleteCommentById (postId: number): Promise<any> {
    return await getRepository(Comment)
    .createQueryBuilder()
    .delete()
    .where('postId = :id', {id: postId})
    .execute()
  }
}
