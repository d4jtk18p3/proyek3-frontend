<template>
  <v-card
    class="rounded-card rounded-lg mb-2"
    elevation="1"
  >
    <v-row class="pl-4 pt-1 ma-0" :style="{background : currentTheme.colorSecondary}">
      <v-col align-self="center" class="pa-0 ma-0"
      :cols="isMobile ? '10' : '12'">
        <div
          class="text-h6 text-uppercase font-weight-bold"
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
      <v-col cols="12" class="pa-0 pb-1 ma-0" v-if="!isMobile">
        <div
          class="text-caption text-capitalize font-weight-medium"
          :style="{color : currentTheme.colorOnSecondary}"
        >{{dosen}}</div>
      </v-col>
    </v-row>
    <div class="pa-4" :style="{background : currentTheme.surface}" v-if="!isMobile">
      <v-row>
        <v-col offset="9">
          <v-avatar color="#C4C4C4">
            <span class="text-h6 font-weight-bold" color=currentTheme.onBackground>{{kodeDosen}}%</span>
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
      type: Number,
      required: false,
      default: 95
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
