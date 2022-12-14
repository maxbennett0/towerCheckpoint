<template>
  <div class="container-fluid">
    <div class="row">
      <h1 v-if="activeEvent">{{ activeEvent.name }}</h1>
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
    onMounted(() => {
      getEventById()
    })
    return {
      activeEvent: computed(() => AppState.activeEvent)
    }
  }
};
</script>


<style lang="scss" scoped>

</style>