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
              <div style="color:#272343" class="text-h5 font-weight-bold">Lupa Password?</div>
            </v-col>
            <v-col cols="12" class="pa-0 mt-5">
              <v-form
              @submit.prevent="requestResetPassword()"
              >
                <v-row class="pa-0 ma-0">
                  <v-col :cols="isMobile? '12' : '10'" :offset="isMobile? '0' : '1'" :class="isMobile? 'px-5' : ''" class="pt-0 mt-1">
                    <v-text-field
                      v-model="email"
                      filled
                      dense
                      :rules="[rules.isEmail, rules.isEmailValid]"
                      :color="currentTheme.colorPrimary"
                      label="Masukan email anda disini"/>
                  </v-col>
                  <v-col cols="1" v-if="!isMobile"/>
                  <v-col cols="4" offset="4" class="d-flex justify-center">
                    <v-btn
                      :color="currentTheme.colorSecondary"
                      :rules="[rules.isEmail,rules.isEmailValid]"
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
      <SuccessDialog @dismiss-dialog="onDismissDialog" v-if="dialog" title="Email berhasil dikirim"  :message="successMessage"/>
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="32" :color="currentTheme.colorSecondary"></v-progress-circular>
      </v-overlay>
    </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import SuccessDialog from "@/views/shared/dialog/InformationDialog"
import { requestResetPasswordEmail } from "@/datasource/network/auth/auth"
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
      dialog: false,
      isLoading: false,
      successMessage: ""
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
  methods: {
    async requestResetPassword () {
      this.isLoading = true
      const result = await requestResetPasswordEmail(this.email)
      this.isLoading = false
      if (result instanceof Error) {
        console.log(`Error with result ${result}`)
        return
      }
      this.successMessage = "Sukses mengirim email ke " + this.email
      this.dialog = true
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
