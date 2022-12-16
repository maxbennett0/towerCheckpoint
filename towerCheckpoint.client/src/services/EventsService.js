import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventsService {
  async getEvents() {
    const res = await api.get('api/events')
    logger.log(res.data)
    AppState.events = res.data
  }

  async getEventById(eventId) {
    const res = await api.get('api/events/' + eventId)
    logger.log(res.data)
    AppState.activeEvent = res.data
  }

  async createEvent(body) {
    const res = await api.post('api/events/', body)
    AppState.events.push(res.data)
    return res.data
  }

  async removeEvent(eventId) {
    const res = await api.delete('api/events/' + eventId)
    logger.log('deleting event')
    AppState.events = AppState.events.filter(e => e.id !== eventId)
  }
}

export const eventsService = new EventsService()