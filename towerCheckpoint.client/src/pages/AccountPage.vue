<template>
  <div class="container-fluid bg-dark">
    <h1 class="text-light">My Events</h1>
    <div class="row">
      <div v-for="t in myTickets" class="col-3 border">
        <EventCard :event="t.event" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import EventCard from "../components/EventCard.vue";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
export default {
  setup() {

    async function getMyTicketEvents() {
      try {
        await ticketsService.getMyTicketEvents()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getMyTicketEvents();
    })

    return {
      account: computed(() => AppState.account),
      event: computed(() => AppState.events),
      myTickets: computed(() => AppState.myTickets)
    };
  },
  components: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
