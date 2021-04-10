<template>
  <v-app :style="{ background: currentTheme.background }">
    <side-bar />
    <nav-bar />
    <v-main>
      <v-container>
        <div v-if="isLoading">Loading ...</div>
        <v-row v-else>
          <div>{{ divText }}</div>
          <v-btn @click="login">{{ buttonText }}</v-btn>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import * as Keycloak from "keycloak-js"
import SideBar from "@/views/component/ui/SideBar"
import NavBar from "@/views/component/ui/NavBar"
import { mapGetters } from "vuex"
const initOptions = {
  url: "http://127.0.0.1:8080/auth",
  realm: "vue-test",
  clientId: "vue-app",
  onLoad: "check-sso"
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
        return (
          "anda sudah masuk dan terautentikasi dengan token " +
          this.$keycloak.token
        )
      }
      return "anda belum login , aya coba login"
    },
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
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
      try {
        await keycloak.init({ onLoad: initOptions.onLoad })
      } catch (e) {
        console.error(e)
      }
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
