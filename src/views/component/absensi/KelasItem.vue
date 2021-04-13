<template>
  <v-card
    :style="{background: '#FB8C00'}"
    class="pa-3"
  >
    <div
      class="text-center text-h6"
      :style="{color: currentTheme.onSurface}"
    >3A - D4 Teknik Informatika</div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "KelasItem",
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  }
}
</script>

<style scoped>

</style>
