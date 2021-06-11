<template>
  <v-app :style="{background : '#272343'}" >
    <v-main>
      <v-container :class="isMobile? 'pa-5' : 'pa-12'" class="fill-height">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "AuthMain",
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
