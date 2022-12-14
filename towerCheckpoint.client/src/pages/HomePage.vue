<template>
  <div class="container-fluid bg-dark">
    <div class="row">
      <div class="col-12 d-flex cover-img justify-content-start align-items-center border ">
        <div class="mx-3">
          <h3 class="text-light">Get Ahead Of The Scalpers</h3>
          <h3 class="text-light">Reserve Your Seat Now</h3>
          <h3 class="text-light">Real Events For Real People</h3>
        </div>
      </div>
      <div class="col-12 bg-dark d-flex justify-content-between my-3">
        <button @click="filterBy = 'concert'" class="btn btn-warning fw-bold fs-4 p-2">Concert</button>
        <button @click="filterBy = 'convention'" class="btn btn-warning fw-bold fs-4 p-2">Convention</button>
        <button @click="filterBy = 'sport'" class="btn btn-warning fw-bold fs-4 p-2">Sport</button>
        <button @click="filterBy = 'digital'" class="btn btn-warning fw-bold fs-4 p-2">Digital</button>
        <button @click="filterBy = ''" class="btn btn-warning fw-bold fs-4 p-2">All</button>
      </div>
    </div>
    <div class="row">
      <div v-for="e in event" class="col-3 bg-dark text-start border">
        <EventCard :event="e" />
      </div>
    </div>
  </div>
</template>

<script>
import { logger } from "../utils/Logger.js";
import { eventsService } from "../services/EventsService.js"
import Pop from "../utils/Pop.js";
import { onMounted, computed, ref } from "vue";
import { AppState } from "../AppState.js";
import EventCard from "../components/EventCard.vue"

export default {
  setup() {
    const filterBy = ref('')
    async function getEvents() {
      try {
        await eventsService.getEvents()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getEvents()
    })
    return {
      filterBy,
      event: computed(() => {
        if (filterBy.value == '') {
          return AppState.events
        } else {
          return AppState.events.filter(e => e.type == filterBy.value)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.cover-img {
  width: 100%;
  height: 50vh;
  background-position: center;
  object-fit: cover;
  background-image: url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
}
</style>
