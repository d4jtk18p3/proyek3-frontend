<template>
    <v-row class="justify-center">
      <v-col  xl="4" lg="6" md="8" sm="10" xs="12">
        <v-card class="rounded-0" elevation="10">
          <v-row style="background:#ECEBEE" class="px-0 py-1 ma-0" >
            <v-col cols="12" class="top d-flex justify-center align-center">
              <img src="../../../../assets/polban.png" alt="Logo Polban"/>
              <div class="ml-2 text-subtitle-2" style="color:#272343">Politeknik Negeri Bandung</div>
            </v-col>
          </v-row>
          <v-row class="px-0 py-2  ma-0">
            <v-col cols="12" class="d-flex justify-center mt-5">
              <div style="color:#272343" class="text-h5 font-weight-bold">Masuk</div>
            </v-col>
            <v-col cols="12" class="pa-0 mt-5">
              <v-form
                method="post"
                :action="action">
                <v-row class="pa-0 ma-0">
                  <v-col :cols="isMobile? '12' : '10'" :offset="isMobile? '0' : '1'" :class="isMobile? 'px-5' : ''" class="pt-0 mt-1">
                    <v-text-field
                      v-model="email"
                      name="username"
                      filled
                      dense
                      :color="currentTheme.colorPrimary"
                      label="Masukan email anda disini"/>
                  </v-col>
                  <v-col :cols="isMobile? '12' : '10'" :offset="isMobile? '0' : '1'" :class="isMobile? 'px-5' : ''" class="pt-0 mt-1">
                    <v-text-field
                      v-model="password"
                      name="password"
                      type="password"
                      filled
                      dense
                      :color="currentTheme.colorPrimary"
                      label="Masukkan password disini"/>
                  </v-col>
                  <v-col cols="1" v-if="!isMobile"/>
                  <v-col cols="4" offset="4" class="d-flex justify-center">
                    <v-btn
                      :color="currentTheme.colorSecondary"
                      style="color: white"
                      type="submit"
                    >
                      Masuk
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
          <v-row style="background:#ECEBEE" class="px-0  ma-0 mt-5 py-2" >
            <v-col cols="12" class="top d-flex justify-center align-center pa-0 ma-0">
              <div class="ml-2 text-subtitle-2 message-text">Kami akan mengirim anda email</div>
            </v-col>
            <v-col cols="12" class="top d-flex justify-center align-center pa-0 mt-0 mt-n1">
              <div class="ml-2 text-subtitle-2 message-text">untuk mengubah password</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <SuccessDialog @dismiss-dialog="onDismissDialog" v-if="dialog" :email="email"/>
    </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import SuccessDialog from "@/views/auth/component/forgetPassword/SuccessDialog"
import * as Keycloak from "keycloak-js"

export default {
  name: "ForgetPassword",
  components: { SuccessDialog },
  data () {
    return {
      rules: {
        isEmail: (value) => !!value || "Email tidak boleh kosong",
        isEmailValid: (value) => value.includes("@") || "Email tidak valid"
      },
      email: "",
      password: "",
      dialog: false,
      action: null
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
      return !(this.rules.isEmail(this.email) !== true || this.rules.isEmailValid(this.email) !== true)
    }
  },
  async created () {
    if (this.$route.query.action) {
      this.action = this.$route.query.action
      return
    }

    try {
      const initOptions = {
        url: "https://akun.6766998f.nip.io/auth", realm: "development", clientId: "public", onLoad: "login-required"
      }
      const keycloak = Keycloak(initOptions)

      await keycloak.init({ onLoad: initOptions.onLoad })

      setInterval(() => {
        keycloak.updateToken(70)
      }, 6000)
    } catch (e) {
      console.log(e)
    }
  },
  mounted () {
  },
  methods: {
    async requestResetPassword () {
      // this.$router.push({
      //   name:
      // })
      // this.dialog = true
    },
    onDismissDialog () {
      this.$router.push({
        path: "/template/dashboard"
      })
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
