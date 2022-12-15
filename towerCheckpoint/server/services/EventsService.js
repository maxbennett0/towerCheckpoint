import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"


class EventsService {
  async cancelEvent(id, userId) {
    const event = await dbContext.Events.findById(id)
    if (!event) throw new BadRequest('no event at id: ' + id)
    if (event.creatorId != userId) {
      throw new Forbidden('you cant delete an event that isnt yours')
    }
    if (event.isCanceled == true) {
      throw new BadRequest('cannot cancel a canceled event')
    }
    event.isCanceled = true
    event.save()
    return event
  }
  async editEvent(id, body, userId) {
    const event = await dbContext.Events.findById(id)
    if (!event) throw new BadRequest('no event at id:' + id)
    if (event.creatorId != userId) throw new Forbidden('dawg this aint yo event')
    if (event.isCanceled == true) throw new BadRequest('cannot cancel a canceled event')
    event.name = body.name ? body.name : event.name
    event.description = body.description ? body.description : event.description
    // event.isCanceled = body.isCanceled ? body.isCanceled : event.isCanceled
    event.save()
    return event
  }

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