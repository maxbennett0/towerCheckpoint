<template>
  <div v-if="activeEvent" class="container-fluid bg-dark">
    <div class="row">
      <div class="col-4 p-2">
        <img class="img-fluid border" :src="activeEvent.coverImg" alt="">
      </div>
      <div class="col-8 p-2 text-start">
        <h3>{{ activeEvent.name }}</h3>
        <h4>{{ activeEvent.location }}</h4>
        <p>{{ activeEvent.description }}</p>
        <div>
          <div class="d-flex justify-content-around">
            <p v-if="activeEvent.capacity > 0" class="text-start fs-3"><span class="text-primary fs-3">{{
                activeEvent.capacity
            }}</span> spots left</p>
            <p v-else class="text-start fs-3"><s><span class="text-primary fs-3">{{ activeEvent.capacity }}</span> spots
                left</s></p>

            <button v-if="activeEvent.isCanceled" disabled class="btn btn-warning">Canceled<i
                class="mdi mdi-ticket mx-2"></i></button>
            <button v-else-if="activeEvent.capacity <= 0" class="btn btn-warning" disabled>Capacity Filled<i
                class="mdi mdi-ticket mx-2"></i></button>
            <button v-else-if="account.id && !foundMe" class="btn btn-warning" @click="attendEvent">Attend Event<i
                class="mdi mdi-ticket mx-2"></i></button>
            <button v-else-if="foundMe" class="btn btn-danger" @click="removeTicket(foundMe.id)">Remove Ticket<i
                class="mdi mdi-ticket mx-2"></i></button>

          </div>
        </div>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col-12 bg-secondary p-3">
        <div>
          <!-- NOTE v-for tickets somehow -->
          <img v-for="e in event" class="img-fluid attending-img rounded-circle" :title=activeEvent.creator.name
            :src=activeEvent.creator.picture alt="">
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-8 mt-4 p-3 bg-secondary">
        <div class="row">
          <div class="col-12 p-3">
            <p class="text-end text-success mx-2">Join The Conversation</p>
            <textarea v-model="editable.body" type="text" name="body" id="body" cols="129" rows="5"
              placeholder="Tell the people..."></textarea>
          </div>
          <div class="col-12 d-flex justify-content-end">
            <button class="btn btn-success" @click="createComment(editable.value)">Post Comment</button>
          </div>
        </div>
        <div class="row">
          <div v-for="c in comments" class="col-12 d-flex my-3">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from '../services/TicketsService.js'
import { commentsService } from '../services/CommentsService.js'
import { useRoute } from "vue-router";

export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    async function getEvents() {
      try {
        await eventsService.getEvents()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    async function getCommentsByEventId() {
      try {
        await commentsService.getCommentsByEventId(route.params.eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    async function getTicketsByEventId() {
      await ticketsService.getTicketsByEventId(route.params.eventId)
    }
    onMounted(() => {
      getEventById(),
        getEvents(),
        getCommentsByEventId(),
        getTicketsByEventId()
    })
    return {
      editable,
      activeEvent: computed(() => AppState.activeEvent),
      event: computed(() => AppState.events),
      foundMe: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),

      async attendEvent() {
        try {
          await ticketsService.attendEvent({ eventId: route.params.eventId })
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },
      async removeEvent(ticketId) {
        try {
          await ticketsService.removeTicket(ticketId)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },
      async createComment() {
        try {
          editable.value.eventId = route.params.eventId
          await commentsService.createComment(editable.value)
          editable.value = {}
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.attending-img {
  height: 6vh;
}

.comment-img {
  height: 15vh;
  width: 15vh;
}
</style>