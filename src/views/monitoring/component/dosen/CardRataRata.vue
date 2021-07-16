<template>
  <v-card
    class="rounded-lg mb-4"
  >
    <v-row class="pa-4 ma-0" :style="{background : currentTheme.colorSecondary}">
      <v-col cols="12" class="pa-0 ma-0">
        <div
          class="text-subtitle-1 text-center text-uppercase font-weight-bold"
          :class="isMobile? 'text-subtitle-2' : 'text-subtitle-1' "
          :style="{color : currentTheme.colorPrimary}"
        >Rata-Rata {{this.titleCard}}</div>
      </v-col>
    </v-row>
    <div class="pa-3" :style="{background : currentTheme.surface}">
      <div :style="{color : currentTheme.onSurface}" class="text-center text-h4">{{RataRata}}</div>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "CardRataRata",
  props: {
    RataRata: {
      type: String,
      required: false,
      default: "50%"
    },
    titleCard: {
      type: String,
      required: false,
      default: "Mahasiswa"
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
