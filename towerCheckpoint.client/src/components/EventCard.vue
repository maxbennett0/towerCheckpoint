<template>
  <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
    <div class="d-flex flex-column justify-content-center p-3">
      <img class="img-fluid" :src="event.coverImg" alt="">
    </div>
    <div class="d-flex flex-column justify-content-center p-2">
      <h4>{{ event.name }}</h4>
      <p>{{ event.location }}</p>
      <p>{{ event.startDate = new Date().toDateString() }}</p>
    </div>
    <div class="text-end d-flex justify-content-end">
      <p v-if="event.capacity > 0">{{ event.capacity }} spots left</p>
      <p v-else="event.capacity > 0"><s>{{ event.capacity }} spots left</s></p>
    </div>
  </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  props: {
    event: { type: Object, required: true }
  },
  setup() {
    return {
    }
  }
};
</script>


<style lang="scss" scoped>

</style>