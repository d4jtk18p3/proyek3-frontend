<template>
  <v-app>
    <side-bar/>
    <nav-bar/>
    <v-main>
      <v-container>
        <div v-if="isLoading">Loading ...</div>
        <v-row v-else>
          <div>{{divText}}</div>
          <v-btn @click="login">{{buttonText}}</v-btn>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import * as Keycloak from "keycloak-js"
import SideBar from "@/views/component/UI/SideBar"
import NavBar from "@/views/component/UI/NavBar"

/*
  Token Access interval adalah 5 jam maka
  dilakukan perhitungan sebagai berikut :
  1000 (1 seconds) * 60 (1 minute) & 60 (1 hour) * 5
 */
const TOKEN_ACCESS_INTERVAL = (1000 * 60 * 60 * 5) - (1000 * 6)
const initOptions = {
  url: "https://keycloak.ca9db134.nip.io/auth", realm: "Polban-Realm", clientId: "template", onLoad: "check-sso"
}
export default {
  name: "App",
  components: {
    SideBar,
    NavBar
  },
  created () {
    if (!this.$keycloak) {
      this.initKeycloak()
    }
  },
  data () {
    return {
      isAuthenticated: "",
      isLoading: false
    }
  },
  computed: {
    buttonText () {
      if (this.isAuthenticated) {
        return "logout"
      }
      return "login"
    },
    divText () {
      if (this.isAuthenticated) {
        return "anda sudah masuk dan terautentikasi dengan token " + this.$keycloak.token
      }
      return "anda belum login , aya coba login"
    }
  },
  methods: {
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
      const keycloak = Keycloak(initOptions)
      this.isLoading = true
      console.log("Starting")
      try {
        await keycloak.init({ onLoad: initOptions.onLoad })
        console.log("beres")
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
