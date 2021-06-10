<template>
  <v-app :style="{background : currentTheme.background}">
    <side-bar v-if="!isMobile"/>
    <nav-bar/>
    <v-main>
      <v-container fluid :class="isMobile? 'pa-5' : 'pa-12'">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex"
import NavBar from "@/views/shared/navigation/NavBar"
import SideBar from "@/views/shared/navigation/SideBar"

export default {
  name: "AdminMain",
  components: { SideBar, NavBar },
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
