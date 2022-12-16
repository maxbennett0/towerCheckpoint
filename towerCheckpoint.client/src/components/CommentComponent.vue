<template>
  <div>
    <img class="img-fluid rounded-circle comment-img elevation-2" :src="comment.creator.picture" alt="Account Picture">
    <div class="bg-white elevation-2 mx-3">
      <h6>
        {{ comment.body }}
      </h6>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
export default {
  setup() {
    return {
    }
  }
};
</script>


<style lang="scss" scoped>

</style>