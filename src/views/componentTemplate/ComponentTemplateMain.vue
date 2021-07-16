<template>
  <v-app :style="{background : currentTheme.background}">
    <SideBar v-if="!isMobile" :items="sidebarItems"/>
    <nav-bar/>
    <v-main>
      <v-container :class="isMobile? 'pa-5' : 'pa-12'">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import * as Keycloak from "keycloak-js"
import NavBar from "@/views/shared/navigation/NavBar"
import { mapGetters, mapActions } from "vuex"
import SideBar from "@/views/shared/navigation/SideBar"

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
    // this.sychronize("dani")
    // if (!this.$keycloak) {
    //   this.initKeycloak()
    // }
  },
  data () {
    return {
      isAuthenticated: "",
      isLoading: false,
      sidebarItems: [
        {
          text: "Theme"
        },
        {
          to: "/component-template/Typography",
          icon: "mdi-pencil",
          text: "Typography"
        },
        {
          text: "Components"
        },
        {
          icon: "mdi-tennis",
          text: "Base",
          subLinks: [
            {
              text: "Alert",
              to: "/component-template/alert"
            },
            {
              text: "Calendar",
              to: "/component-template/calendar"
            },
            {
              text: "ComboBox",
              to: "/component-template/combobox"
            },
            {
              text: "Dialog",
              to: "/component-template/dialog"
            },
            {
              text: "Paragraph",
              to: "/component-template/paragraph"
            },
            {
              text: "TextArea",
              to: "/component-template/textarea"
            },
            {
              text: "TextField",
              to: "/component-template/textfield"
            }
          ]
        },
        {
          icon: "mdi-dns",
          text: "Button",
          to: "/component-template/button"
        },
        {
          icon: "mdi-trending-down",
          text: "Graphics",
          to: "/component-template/grafik"
        }
      ]
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
    }
  },
  watch: {
    $keycloak: (value) => {
      console.log(value)
    }
  }
}
</script>
