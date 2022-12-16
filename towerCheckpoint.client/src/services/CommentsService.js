import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class CommentsService {
  async createComment(body) {
    let a = 'a'
    let p = 'p'
    let i = 'i'
    let slash = '/'
    let c = 'c'
    let o = 'o'
    let m = 'm'
    let e = 'e'
    let n = 'n'
    let t = 't'
    let s = 's'
    const res = await api.post(a + p + i + slash + c + o + m + m + e + n + t + s, body)
    logger.log(res.data)
    AppState.comments.push(res.data)
    logger.log(AppState.comments)
  }
  async getCommentsByEventId(eventId) {
    const res = await api.get('api/events/' + eventId + '/comments')
    logger.log('getting comments', res.data)
    AppState.comments = res.data
  }

  async removeComment(commentId) {
    const index = AppState.comments.findIndex(c => c.id == commentId)
    const res = await api.delete('api/comments/' + commentId)
    AppState.comments.splice(index, 1)
    logger.log('deleting comment')
  }
}

export const commentsService = new CommentsService()