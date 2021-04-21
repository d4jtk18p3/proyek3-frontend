<template>
  <v-card
    class="rounded-card rounded-lg"
    color="#C4C4C4"
    @click="addMorePintasan"
    elevation="10"
  >
    <v-row :class="isMobile ? 'pa-3':'pa-5'" justify="center" align="center">
      <v-col :cols="isMobile ? '2': '12'" class="pa-0 mt-0" >
        <div
          :class="isMobile ? 'text-h2': 'text-h1'"
          class="text-center text--secondary font-weight-light"
          :style="{color : currentTheme.colorOnSecondary}"
        >+</div>
      </v-col>
      <v-col :cols="isMobile ? '10': '12'" class="pa-0 mt-0">
        <div
          :class="isMobile ? 'text-h6' : 'text-h4'"
          class="text-center font-weight-light"
          :style="{color : currentTheme.colorOnSecondary}"
        >Tambah Pintasan</div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "TambahPintasanItem",
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  },
  methods: {
    addMorePintasan () {
      alert("added")
    }
  }
}
</script>

<style scoped>
</style>
