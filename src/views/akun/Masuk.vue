<template>
  <v-row class="justify-center">
    <v-col  xl="4" lg="6" md="8" sm="10" xs="12">
      <v-card class="rounded-0" elevation="10">
        <v-row style="background:#ECEBEE" class="px-0 py-1 ma-0" >
          <v-col cols="12" class="top d-flex justify-center align-center">
            <img src="../../assets/polban.png" alt="Logo Polban"/>
            <div class="ml-2 text-subtitle-2" style="color:#272343">Politeknik Negeri Bandung</div>
          </v-col>
        </v-row>
        <v-row class="px-0 py-2  ma-0">
          <v-col cols="12" class="d-flex justify-center mt-5">
            <div style="color:#272343" class="text-h5 font-weight-bold">Masuk</div>
          </v-col>
          <v-col cols="12" class="pa-0 mt-5">
            <v-form
              ref="form"
              method="post"
              :action=action
            >
              <v-row class="pa-0 ma-0">
                <v-col :cols="isMobile? '12' : '10'" :offset="isMobile? '0' : '1'" :class="isMobile? 'px-5' : ''" class="pt-0 mt-1">
                  <v-text-field
                    v-model="username"
                    filled
                    dense
                    :rules="[rules.emptyUsername]"
                    :color="currentTheme.colorPrimary"
                    label="Masukan username anda disini"/>
                </v-col>
                <v-col :cols="isMobile? '12' : '10'" :offset="isMobile? '0' : '1'" :class="isMobile? 'px-5' : ''" class="pt-0 mt-1">
                  <v-text-field
                    :aria-autocomplete="false"
                    dense
                    filled
                    v-model="password"
                    :rules="[rules.emptyPassword]"
                    :append-icon="
                          isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'
                        "
                    :type="isPasswordShown ? 'text' : 'password'"
                    class="input-group--focused"
                    :color="currentTheme.colorPrimary"
                    label="Password Baru"
                    @click:append="isPasswordShown = !isPasswordShown"/>
                </v-col>
                <v-col cols="4" offset="4" class="d-flex justify-center">
                  <v-btn
                    :color="currentTheme.colorSecondary"
                    style="color: white"
                    :disabled="!isInputValid"
                    type="submit"
                  >
                    Submit
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
        <v-row style="background:#ECEBEE" class="px-0  ma-0 mt-5 py-6" >
          <v-col cols="12" class="top d-flex justify-center align-center pa-0 ma-0">
            <div class="ml-2 text-subtitle-2 message-text">Lupa password?</div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import * as Keycloak from "keycloak-js"
import { mapGetters } from "vuex"

export default {
  data: () => ({
    action: undefined,
    username: "",
    password: "",
    rules: {
      emptyPassword: (value) => !!value || "Password tidak boleh kosong",
      emptyUsername: (value) => !!value || "Username tidak boleh kosong"
    },
    isPasswordShown: false
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
      await this.$router.push({ path: "/akun" })
      window.location.reload()
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
    isInputValid () {
      return true
    }
  }
}
</script>

<style scoped>

.top img{
  width: 40px;
  height: 40px;
}

.message-text{
  color: rgba(39,35,67,0.72);
}
</style>
