<template>
  <!-- <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">Create Album</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div> -->
  <form @submit.prevent="createEvent()">
    <div class="modal-body">
      <div class="form-floating mb-3 elevation-5">
        <input v-model="editable.name" type="text" required class="form-control" id="name" placeholder="Event Name">
        <label for="name">Event Name</label>
      </div>
      <div class="form-floating mb-3 elevation-5">
        <input v-model="editable.description" type="text" required class="form-control" id="description"
          placeholder="Description">
        <label for="description">Description</label>
      </div>
      <div class="form-floating mb-3 elevation-5">
        <input v-model="editable.coverImg" type="url" required class="form-control" id="coverImg"
          placeholder="Cover Image">
        <label for="coverImg">Cover Image</label>
      </div>
      <div class="form-floating mb-3 elevation-5">
        <input v-model="editable.location" type="text" required class="form-control" id="location"
          placeholder="Location">
        <label for="location">Location</label>
      </div>
      <div class="form-floating mb-3 elevation-5">
        <input v-model="editable.capacity" type="number" required class="form-control" id="capacity"
          placeholder="Capacity">
        <label for="capacity">Capacity</label>
      </div>
      <div class="form-floating mb-3 elevation-5">
        <input v-model="editable.startDate" type="date" required class="form-control" id="startDate"
          placeholder="Starting Date">
        <label for="startDate">Start Date</label>
      </div>
      <div class="form-floating mb-3 elevation-5">
        <select v-model="editable.type" class="form-select" id="floatingSelect"
          aria-label="Floating label select example">
          <option selected value="concert">Concert</option>
          <option value="convention">Convention</option>
          <option value="sport">Sport</option>
          <option value="digital">Digital</option>
        </select>
        <label for="floatingSelect">Category</label>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary">Create Event</button>
    </div>
  </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";

export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    return {
      editable,
      async createEvent() {
        try {
          const event = await eventsService.createEvent(editable.value)
          editable.value = {}
          Modal.getOrCreateInstance('#exampleModal').hide()
          router.push({ name: 'EventDetails', params: { eventId: event.id } })
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

</style>