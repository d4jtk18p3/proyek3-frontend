<template>
  <v-card
    :style="{background: bgcolor}"
    class="pa-3"
  >
    <div
      class="text-center text-h6"
      :style="{color: currentTheme.onSurface}"
    >{{ kelas }}</div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "KelasItem",
  props: ["kelas", "bgcolor"],
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  }
}
</script>

<style scoped>

</style>
