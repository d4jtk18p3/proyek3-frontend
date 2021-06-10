<template>
  <v-form
    ref="form"
    method="post"
    :action=action>
    <v-text-field
      name="username"
      label="Email/Username">
    </v-text-field>

    <v-text-field
      name="password"
      type="password">
    </v-text-field>

    <v-btn type="submit">
      masuk
    </v-btn>
  </v-form>
</template>

<script>
import * as Keycloak from "keycloak-js"

export default {
  data: () => ({
    action: undefined
  }),

  async created () {
    this.action = this.$route.query.action

    const keycloak = Keycloak({
      url: "https://akun.6766998f.nip.io/keycloak-proxy/auth",
      realm: "staging",
      clientId: "public"
    })
    const auth = await keycloak.init({ onLoad: "check-sso" })

    if (auth || !this.action) {
      this.$router.push({ path: "/akun" })
      window.location.reload()
    }
  }
}
</script>
