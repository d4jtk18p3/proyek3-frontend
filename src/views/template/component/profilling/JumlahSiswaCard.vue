<template>
  <v-card
    class="rounded-lg"
  >
    <v-row class="px-0 py-2  ma-0" :style="{background : '#FB8C00'}">
      <v-col cols="12" align-self="center" class="px-1 py-0 ma-0">
        <div
          class="text-caption text-center text-uppercase font-weight-bold"
          :style="{color : currentTheme.colorPrimary}"
        >Jumlah Mahasiswa</div>
      </v-col>
    </v-row>
    <v-row class="pa-0 ma-0" :style="{background : currentTheme.surface}">
      <v-col class="pr-1" align-self="center">
        <div :style="{color : currentTheme.onSurface}" class="text-end text-h3 font-weight-bold">{{data.total}}</div>
      </v-col>
      <v-col class="pl-1" align-self="center">
        <div :style="{color : currentTheme.onSurface}" class="text-start text-caption">{{data.pria}} Laki-Laki</div>
        <div :style="{color : currentTheme.onSurface}" class="text-start text-caption">{{data.perempuan}} Perempuan</div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "JumlahSiswaCard",
  props: {
    data: {
      type: Object,
      required: false,
      default: () => {
        return {
          total: 0,
          pria: 0,
          perempuan: 0
        }
      }
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
