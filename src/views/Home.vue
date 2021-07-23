<template>
  <v-app :style="{background : '#272343'}" >
    <nav-bar/>
    <v-main>
      <v-container :class="isMobile? 'pa-5' : 'pa-12'" style="background-color : yellow;" class="fill-height">
        <v-row align="end" style="background-color : red;" align-content="center" class="fill-height">
              <p class="text-h4 font-weight-bold white--text">Selamat Datang</p>
        </v-row>
        <v-row style="background-color : blue;">
          <v-col align="center">
            <p class="text-h4 font-weight-bold white--text">Selamat Datang</p>
          </v-col>
          <v-col align="center">
            <p class="text-h4 font-weight-bold white--text">Selamat Datang</p>
          </v-col>
          <v-col align="center">
            <p class="text-h4 font-weight-bold white--text">Selamat Datang</p>
          </v-col>
          <v-col align="center">
            <p class="text-h4 font-weight-bold white--text">Selamat Datang</p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex"
import NavBar from "@/views/shared/navigation/NavBar"
export default {
  name: "Home",
  components: { NavBar },
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
