<template>
<v-col cols="12">
  <v-card
    class="pa-3 rounded-card rounded-lg mb-2"
    elevation="1"
  >
    <v-row class="pl-4 pt-1" :style="{background : currentTheme.colorSecondary}">
      <v-col align-self="center" class="pa-0 pb-1 ma-0"
      :cols="isMobile ? '10' : '12'">
        <div
          class="text-h6 text-uppercase font-weight-bold"
          :style="{color : currentTheme.colorOnSecondary}"
        >{{ mataKuliah }}</div>
        <div
        v-if="isMobile"
          class="text-caption text-capitalize font-weight-medium"
          :style="{color : currentTheme.colorOnSecondary}"
        >{{dosen}}</div>
      </v-col>
      <v-col cols="12" class="pa-0 pb-1 ma-0" v-if="!isMobile">
        <div
          class="text-caption text-capitalize font-weight-medium"
          :style="{color : currentTheme.colorOnSecondary}"
        >{{dosen}}</div>
      </v-col>
    </v-row>
  </v-card>
</v-col>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "PintasanItem",
  props: {
    mataKuliah: {
      type: String,
      required: false,
      default: "Model Data"
    },
    dosen: {
      type: String,
      required: false,
      default: "Urip Teguh Setijohatmo, BSCS., M.Kom."
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
