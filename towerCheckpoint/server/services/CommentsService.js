import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"


class CommentsService {
  async removeComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (comment.creatorId != userId) {
      throw new Forbidden('cant add comment that isnt yours')
    }
    await comment.delete()
    return 'deleted comment'
  }
  async getEventComments(eventId) {
    const comment = await dbContext.Comments.find({ eventId }).populate('creator')
    return comment
  }
  async createComment(body) {
    const event = await eventsService.getEventById(body.eventId)
    if (event.isCanceled) {
      throw new Forbidden('you cant add a comment to a cancelled event')
    }
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator')
    return comment
  }

}

export const commentsService = new CommentsService()