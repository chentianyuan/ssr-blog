import { Injectable } from "@decorators/di"
import CommentDao from "../dao/CommentDao"

@Injectable()
export default class CommentService {
  constructor (private commentDao: CommentDao) {}

  insertComment (comment) {
    return this.commentDao.insertComment(comment)
  }

  getAllLeaveComment () {
    return this.commentDao.getAllLeaveComment()
  }
}