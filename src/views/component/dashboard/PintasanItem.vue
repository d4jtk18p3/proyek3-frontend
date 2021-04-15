<template>
  <v-card
    class="rounded-card rounded-lg"
    elevation="10"
  >
    <v-row class="pa-4 ma-0" :style="{background : currentTheme.colorSecondary}">
      <v-col align-self="center" class="pa-0 ma-0"
      :cols="isMobile ? '10' : '12'">
        <div
          class="text-h5 text-uppercase font-weight-medium"
          :style="{color : currentTheme.colorOnSecondary}"
        >{{ mataKuliah }}</div>
        <div
        v-if="isMobile"
          class="caption text-capitalize font-weight-thin"
          :style="{color : currentTheme.colorOnSecondary}"
        >{{dosen}}</div>
      </v-col>
      <v-col cols="2" class="pa-0 ma-0" v-if="isMobile">
        <v-avatar color="#C4C4C4">
          <span class="white--text headline font-weight-bold">{{kodeDosen}}</span>
        </v-avatar>
      </v-col>
      <v-col cols="12" class="pa-0 ma-0" v-if="!isMobile">
        <div
          class="text-subtitle-1 text-capitalize font-weight-medium"
          :style="{color : currentTheme.colorOnSecondary}"
        >{{dosen}}</div>
      </v-col>
    </v-row>
    <div class="pa-4" :style="{background : currentTheme.surface}" v-if="!isMobile">
      <v-row>
        <v-col offset="9">
          <v-avatar color="#C4C4C4">
            <span class="white--text headline font-weight-bold">{{kodeDosen}}</span>
          </v-avatar>
        </v-col>
      </v-row>
    </div>
  </v-card>
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
    },
    kodeDosen: {
      type: String,
      required: false,
      default: "UT"
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
