import { dbContext } from "../db/DbContext.js"
import { eventsService } from "../services/EventsService.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService {
  async removeTicket(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId).populate('profile event')
    if (ticket.accountId.toString() != userId) {
      throw new Forbidden('this aint yours cheif')
    } else if (!ticket) {
      throw new BadRequest('no ticket at: ' + ticketId)
    } else {
      const event = await eventsService.getEventById(ticket.eventId)
      if (event.isCanceled) throw new Forbidden('cant remove a cancelled event')
      await ticket.remove()
      event.capacity += 1
      await event.save()
      return 'removed ticket'
    }
  }
  async getEventTickets(eventId) {
    const ticket = await dbContext.Tickets.find({ eventId }).populate('profile')
    return ticket
  }
  async getMyTickets(accountId) {
    const ticket = await dbContext.Tickets.find({ accountId }).populate('event')
    return ticket
  }
  async createTicket(body) {
    const event = await eventsService.getEventById(body.eventId)
    if (event.isCanceled == true) {
      throw new Forbidden('Cant make a ticket when its canceled')
    } else if (event.capacity <= 0) {
      throw new BadRequest('you cant get a ticket for a sold out event')
    } else {
      const ticket = await dbContext.Tickets.create(body)
      event.capacity -= 1
      await event.save()
      await ticket.populate('profile')
      return ticket
    }
  }

}

export const ticketsService = new TicketsService()