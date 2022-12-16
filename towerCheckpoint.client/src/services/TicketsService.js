import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"
import Pop from "../utils/Pop.js"


class TicketsService {
  async attendEvent(eventId) {
    const res = await api.post('api/tickets', eventId)
    logger.log('creating ticket', res.data)
    AppState.tickets.push(res.data)
    AppState.myTickets.push(res.data)
    AppState.activeEvent.capacity--
    logger.log(AppState.myTickets)
  }
  async getTicketsByEventId(eventId) {
    const res = await api.get('api/events/' + eventId + '/tickets')
    logger.log('getting tickets by event id', res.data)
    AppState.tickets = res.data
  }

  async getMyTicketEvents() {
    try {
      const res = await api.get('account/tickets')
      logger.log('get ticket events', res.data)
      AppState.myTickets = res.data
    } catch (error) {
      logger.error(error)
      Pop.error(error.message)
    }
  }
  async removeTicket(ticketId) {
    if (await Pop.confirm('Delete?', 'You Sure About This?')) {
      const res = await api.delete('api/tickets/' + ticketId)
      logger.log(res.data)
      AppState.tickets = AppState.tickets.filter(t => t.id !== ticketId)
      AppState.myTickets = AppState.myTickets.filter(t => t.id !== ticketId)
      logger.log(AppState.myTickets, AppState.myTickets)
      AppState.activeEvent.capacity++
      return res
    }
  }
}

export const ticketsService = new TicketsService()