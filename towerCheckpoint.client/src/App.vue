<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <ModalComponent id="exampleModal">
    <EventForm />
  </ModalComponent>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import EventForm from "./components/EventForm.vue"
import ModalComponent from "./components/ModalComponent.vue"
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, ModalComponent, EventForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
