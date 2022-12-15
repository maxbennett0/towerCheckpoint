<template>
  <div v-if="activeEvent" class="container-fluid bg-dark">
    <div class="row">
      <div class="col-4 p-2">
        <img class="img-fluid border" :src="activeEvent.coverImg" alt="">
      </div>
      <div class="col-8 p-2">
        <h3>{{ activeEvent.name }}</h3>
        <h4>{{ activeEvent.location }}</h4>
        <p>{{ activeEvent.description }}</p>
        <div>
          <div class="d-flex justify-content-around">
            <p class="text-start fs-3"><span class="text-primary fs-3">{{ activeEvent.capacity }}</span> spots left</p>
            <button class="btn btn-warning" @click="attendEvent">Attend<i class="mdi mdi-human mx-2"></i></button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 bg-secondary p-3">
        <div>
          <!-- NOTE v-for tickets somehow -->
          <img v-for="e in event" class="img-fluid attending-img rounded-circle" src="https://thiscatdoesnotexist.com"
            alt="">
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-8 mt-4 p-3 bg-secondary">
        <div class="row">
          <div class="col-12 p-3">
            <p class="text-end text-success mx-2">Join The Conversation</p>
            <textarea name="comment" id="comment" cols="98" rows="5" placeholder="Tell the people..."></textarea>
          </div>
          <div class="col-12 d-flex justify-content-end">
            <button class="btn btn-success">Post Comment</button>
          </div>
        </div>
        <!-- NOTE add v-for comments on row -->
        <div class="row">
          <div class="col-12 d-flex my-3">
            <img class="img-fluid rounded-circle comment-img elevation-2" src="https://thiscatdoesnotexist.com" alt="">
            <div class="bg-white elevation-2 mx-3">
              <h6>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque laboriosam reiciendis iste voluptatem
                optio ratione nisi veritatis ea distinctio ipsa ad eligendi natus minima ex molestiae assumenda
                blanditiis, minus explicabo repellat? Quam unde ut iste autem odio corporis quisquam quasi laborum porro
                nihil consectetur modi soluta accusamus ad, voluptas neque?</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { useRoute } from "vue-router";
export default {
  setup() {
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
    onMounted(() => {
      getEventById(),
        getEvents()
    })
    return {
      activeEvent: computed(() => AppState.activeEvent),
      event: computed(() => AppState.events)
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