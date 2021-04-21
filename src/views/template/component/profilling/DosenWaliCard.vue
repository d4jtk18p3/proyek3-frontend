<template>
  <v-card
    class="rounded-lg"
  >
    <v-row class="px-0 py-2  ma-0" :style="{background : currentTheme.colorSecondaryVariant}">
      <v-col cols="12" align-self="center" class="px-1 py-0 ma-0">
        <div
          class="text-caption text-center text-uppercase font-weight-bold"
          :style="{color : currentTheme.colorPrimary}"
        >Dosen Wali</div>
      </v-col>
    </v-row>
    <v-row class="px-0 py-3 ma-0" :style="{background : currentTheme.surface}">
      <v-col align-self="center">
        <div :style="{color : currentTheme.onSurface}" class="text-center text-subtitle-1 font-weight-bold">{{namaDosen}}</div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "DosenWaliCard",
  props: {
    namaDosen: {
      type: String,
      required: false,
      default: "Nama Dosen  "
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  }
}
</script>

<style scoped>

</style>
