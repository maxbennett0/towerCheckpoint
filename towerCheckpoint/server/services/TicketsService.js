import { dbContext } from "../db/DbContext.js"
import { eventsService } from "../services/EventsService.js"
import { Forbidden } from "../utils/Errors.js"

class TicketsService {
  async getMyTickets() {
    const ticket = await dbContext.Tickets.find().populate('profile')
    const foundTickets = ticket.filter(t => t.accountId == t.profile._id)
    return foundTickets
  }
  async createTicket(body) {
    const event = await eventsService.getEventById(body.eventId)
    if (event.isCanceled == true) throw new Forbidden('Cant make a ticket when its canceled')

    const ticket = await dbContext.Tickets.create(body)
    event.capacity -= 1
    await event.save()
    await ticket.populate('profile')
    return ticket
  }

}

export const ticketsService = new TicketsService()