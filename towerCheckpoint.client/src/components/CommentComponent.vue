<template>
  <img class="img-fluid rounded-circle comment-img elevation-2" :title="comment.creator.name"
    :src="comment.creator.picture" alt="Account Picture">
  <div class="bg-white elevation-2 mx-3 p-3 background-tile">
    <h6>
      <div>
        {{ comment.body }}
      </div>
      <div v-if="comment.creator.id == account.id" class="text-end"><i
          class="mdi mdi-delete selectable text-danger fs-3" @click="removeComment(comment.id)"></i>
      </div>
    </h6>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import { commentsService } from "../services/CommentsService.js";
import Pop from "../utils/Pop.js";
export default {
  props: {
    comment: { type: Object, required: true }
  },
  setup() {
    return {

      account: computed(() => AppState.account),

      async removeComment(commentId) {
        if (await Pop.confirm('Delete?', 'ahahaha your comment is so sexy, dont delete it...')) {
          try {
            await commentsService.removeComment(commentId)
          } catch (error) {
            logger.error(error)
            Pop.error(error.message)
          }
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.comment-img {
  height: 15vh;
  width: 15vh;
}

.background-tile {
  width: 100%;
}
</style>