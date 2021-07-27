<template>
  <v-app :style="{background : currentTheme.background}">
    <side-bar v-if="!isMobile" :items="sideBarItems"/>
    <nav-bar/>
    <v-main>
      <v-container fluid :class="isMobile? 'pa-5' : 'pa-12'">
        <router-view/>
      </v-container>
      <v-overlay :value="isLoading">
      <v-progress-circular
       indeterminate size="32"
       :color="currentTheme.colorSecondary">
      </v-progress-circular>
      </v-overlay>
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
  created () {
    const tasks = []
    if (this.$route.meta.requiresAuth) {
      tasks.push(this.waitAuthenticated())
    }
    Promise.all(tasks).then(result => {
      this.isLoading = false
    })
  },
  data () {
    return {
      isAuthenticated: "",
      isLoading: true,
      sideBarItems: [
        { text: "Daftar via Form", icon: "mdi-account-plus", to: "/admin/add-user/form" },
        { text: "Daftar via Excel", icon: "mdi-account-multiple-plus", to: "/admin/add-user/excel" }
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  },
  methods: {
    async waitAuthenticated () {
      return new Promise((resolve) => {
        const unwatch = this.$store.watch(state => {
          return this.$store.getters.identity
        }, value => {
          if (!value) {
            return
          }
          // if (!value.isActive) {
          //   this.$router.replace({ path: "/reset-password" })
          // }
          unwatch()
          resolve()
        }, {
          immediate: true
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
