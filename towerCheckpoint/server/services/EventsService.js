import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"


class EventsService {
  async getEventById(id) {
    const event = await dbContext.Events.findById(id).populate('creator')
    if (!event) throw new BadRequest('no event found at: ' + id)
    return event
  }
  async getAll() {
    const events = await dbContext.Events.find().populate('creator')
    return events
  }
  async create(body) {
    const event = await dbContext.Events.create(body)
    await event.populate('creator')
    return event
  }
}

export const eventsService = new EventsService()