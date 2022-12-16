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

            <button v-if="activeEvent.creator.id == account.id" id="cancel-button" class="btn btn-danger"
              @click="removeEvent(activeEvent.id)"><i class="mdi mdi-cancel"></i>
              Cancel
              Event</button>

          </div>
        </div>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col-12 bg-secondary p-3">
        <div>
          <p class="text-info fw-bold">See Who's Attending</p>
          <img v-for="t in tickets" class="img-fluid attending-img rounded-circle" :title=t.profile.name
            :src=t.profile.picture alt="">
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-8 mt-4 p-3 bg-secondary">
        <div class="row">
          <div class="col-12 p-3">
            <p class="text-end text-success mx-2 fw-bold">Join The Conversation</p>
            <textarea v-model="editable.body" type="text" name="body" id="body" cols="129" rows="5"
              placeholder="Tell the people..."></textarea>
          </div>
          <div class="col-12 d-flex justify-content-end">
            <button class="btn btn-success" @click="createComment(editable.value)">Post Comment</button>
          </div>
        </div>
        <div class="row">
          <div v-for="c in comments" class="col-12 d-flex my-3">
            <CommentComponent :comment="c" />
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
import { useRouter } from "vue-router";
import CommentComponent from "../components/CommentComponent.vue";

export default {
  setup() {
    const editable = ref({});
    const route = useRoute();
    const router = useRouter();

    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    async function getEvents() {
      try {
        await eventsService.getEvents();
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    async function getCommentsByEventId() {
      try {
        await commentsService.getCommentsByEventId(route.params.eventId);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    async function getTicketsByEventId() {
      await ticketsService.getTicketsByEventId(route.params.eventId);
    }
    onMounted(() => {
      getEventById(),
        getEvents(),
        getCommentsByEventId(),
        getTicketsByEventId();
    });
    return {
      editable,
      activeEvent: computed(() => AppState.activeEvent),
      event: computed(() => AppState.events),
      foundMe: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      myTickets: computed(() => AppState.myTickets),
      tickets: computed(() => AppState.tickets),

      async attendEvent() {
        try {
          await ticketsService.attendEvent({ eventId: route.params.eventId });
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      },
      async removeTicket(ticketId) {
        try {
          await ticketsService.removeTicket(ticketId);
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      },
      async removeEvent(eventId) {
        try {
          await eventsService.removeEvent(eventId)
          document.getElementById('cancel-button').disabled = true;
          router.push({ name: 'Home' })
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },
      async createComment() {
        try {
          editable.value.eventId = route.params.eventId;
          await commentsService.createComment(editable.value);
          editable.value = {};
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      }
    };
  },
  components: { CommentComponent }
};
</script>


<style lang="scss" scoped>
.attending-img {
  height: 6vh;
}
</style>