<template>
  <v-card
    :style="{background: currentTheme.colorSecondaryVariant , color: currentTheme.colorPrimary}"
    class="pa-3"
  >
    <div
      class="text-center text-subtitle-1 font-weight-bold"
    >IP Kumulatif</div>
    <div
      class="text-center text-h3 mt-2 font-weight-bold"
    >{{ip}}</div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "IPKCard",
  props: {
    ip: {
      type: String,
      required: false,
      default: "4.0"
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  }
}
</script>

<style scoped>

</style>
