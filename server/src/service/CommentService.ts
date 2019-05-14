import { Injectable } from "@decorators/di"
import CommentDao from "../dao/CommentDao"
import { Comment } from "../interface/comment"

@Injectable()
export default class CommentService {
  constructor (private commentDao: CommentDao) {}

  insertComment (comment: Comment) {
    return this.commentDao.insertComment(comment)
  }

  getAllLeaveComment () {
    return this.commentDao.getAllLeaveComment()
  }

  deleteCommentById (postId: number) {
    return this.commentDao.deleteCommentById(postId)
  }
}