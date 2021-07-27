<template>
  <v-app :style="{background : currentTheme.background}">
    <side-bar v-if="!isMobile" :items="isUserDosen ? sideBarItemsDsn : sideBarItemsMhs"/>
    <nav-bar/>
    <v-main>
      <v-container :class="isMobile? 'pa-5' : 'pa-12'">
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

import * as Keycloak from "keycloak-js"
import SideBar from "@/views/shared/navigation/SideBar"
import NavBar from "@/views/shared/navigation/NavBar"
import { mapGetters, mapActions } from "vuex"

/*
  Token Access interval adalah 5 jam maka
  dilakukan perhitungan sebagai berikut :
  1000 (1 seconds) * 60 (1 minute) & 60 (1 hour) * 5
 */
const TOKEN_ACCESS_INTERVAL = (1000 * 60 * 60 * 5) - (1000 * 6)
const initOptions = {
  url: "https://keycloak.ca9db134.nip.io/auth", realm: "polban-realm", clientId: "template", onLoad: "login-required"
}
export default {
  name: "TemplateMain",
  components: {
    SideBar,
    NavBar
  },
  created () {
    const tasks = []
    if (this.$route.meta.requiresAuth) {
      tasks.push(this.waitAuthenticated())
    }
    Promise.all(tasks).then(result => {
      this.isLoading = false
      this.cekUserRoles()
    })
  },
  data () {
    return {
      isAuthenticated: "",
      isLoading: true,
      sideBarItemsDsn: [
        { text: "Dashboard Tugas", icon: "mdi-chart-bar", to: "/monitoring/dosen/dashboard-tugas" },
        { text: "Monitoring Tugas", icon: "mdi-clipboard-check-multiple-outline", to: "/monitoring/dosen/monitoring-tugas" }
      ],
      sideBarItemsMhs: [
        { text: "Dashboard Mahasiswa", icon: "mdi-school-outline", to: "/monitoring/mahasiswa/dashboard" },
        { text: "Monitoring Tugas Mahasiswa", icon: "mdi-monitor-multiple", to: "/monitoring/mahasiswa/matakuliah" }
      ],
      isUserDosen: false
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    divText () {
      if (this.isAuthenticated) {
        return "anda sudah masuk dan terautentikasi dengan token " + this.$keycloak.token
      }
      return "anda belum login , aya coba login"
    },
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
    identity: function () {
      return this.$store.getters.identity
    }
  },
  methods: {
    ...mapActions({
      sychronize: "theme/sychronizeCurrentTheme"
    }),
    async login () {
      this.isLoading = true
      if (this.isAuthenticated) {
        await this.$keycloak.logout()
      } else {
        const loginResult = await this.$keycloak.login()
        console.log(loginResult)
      }
      this.isAuthenticated = this.$keycloak.authenticated
      this.isLoading = false
    },
    async initKeycloak () {
      console.log("Start initialize keyclocak")
      const keycloak = Keycloak(initOptions)
      this.isLoading = true
      console.log("Starting")
      try {
        await keycloak.init({ onLoad: initOptions.onLoad })
      } catch (e) {
        console.log(e)
      }
      setInterval(() => {
        keycloak.updateToken(70)
          .then()
          .catch((error) => {
            console.log(error)
          })
      }, TOKEN_ACCESS_INTERVAL)
      console.log("keycloak udah")
      this.isAuthenticated = keycloak.authenticated
      this.$keycloak = keycloak
      console.log(this.$keycloak)
      this.isLoading = false
    },
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
    },
    cekUserRoles () {
      var roles = this.identity.realm_access.roles
      for (var i in roles) {
        if (roles[i] === "dosen") {
          this.isUserDosen = true
        }
      }
      console.log("roles " + this.isUserDosen)
    }
  },
  watch: {
    $keycloak: (value) => {
      console.log(value)
    }
  }
}
</script>
