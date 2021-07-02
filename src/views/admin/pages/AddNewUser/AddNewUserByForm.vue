<template>
  <v-form ref="form">
    <v-container>
      <v-row :style="{ color: currentTheme.onBackground }">
        <v-col cols="12">
          <p class="text-h4 font-weight-bold">
            Pendaftaran Akun Baru via Formulir
          </p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" sm="8" md="6" lg="4">
          <p class="font-weight-bold colorPrimary">Role/Jenis Akun</p>
          <v-select
            v-model="role"
            :items="roles"
            solo
            placeholder="Silakan pilih role"
            dense
            :color="currentTheme.colorSecondary"
            :rules="[rulesRole.noEmpty]"
          ></v-select>
          <p class="font-weight-bold colorPrimary">Jenis Nomor Induk</p>
          <v-select
            v-model="induk"
            :items="induks"
            solo
            placeholder="Silakan pilih jenis nomor induk"
            dense
            :color="currentTheme.colorSecondary"
            :rules="[rulesJenisNomor.noEmpty]"
          ></v-select>
          <v-text-field
            v-model="nomor"
            label="NIP/NIM"
            :color="currentTheme.colorPrimary"
            :rules="[
              rulesNomorInduk.noEmpty,
              rulesNomorInduk.number,
              rulesNomorInduk.chara,
            ]"
            error-count="3"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="nama"
            label="Nama"
            :color="currentTheme.colorPrimary"
            :rules="[rulesNama.noEmpty]"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="email"
            label="E-mail"
            :color="currentTheme.colorPrimary"
            :rules="[rulesEmail.noEmpty, rulesEmail.isValid]"
            error-count="2"
            required
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" sm="8" md="6" lg="4" class="text-right">
          <v-btn
            :color="currentTheme.colorSecondary"
            width="100"
            style="color: white"
            :disabled="!isInputValid"
            @click="submitFormAccount"
            >Submit
          </v-btn>
        </v-col>
      </v-row>
      <SubmitSuccessDialog @dismiss-dialog="onDismissDialog" v-if="dialog" />
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex"
import { createOneAccount } from "@/datasource/network/admin/admin"
import SubmitSuccessDialog from "@/views/admin/component/AddNewUser/SubmitSuccessDialog"

export default {
  name: "AddNewUserByForm",
  components: { SubmitSuccessDialog },
  data () {
    return {
      role: "",
      roles: ["Dosen", "Mahasiswa", "Tata Usaha"],
      induk: "",
      nomor: "",
      nama: "",
      email: "",
      valid: false,
      dialog: false,
      induks: ["NIM", "NIP"],
      rulesRole: {
        noEmpty: (v) => v.length > 0 || "Role tidak boleh kosong."
      },
      rulesJenisNomor: {
        noEmpty: (v) => !!v || "Jenis nomor induk tidak boleh kosong."
      },
      rulesNomorInduk: {
        noEmpty: (v) => !!v || "Nomor induk tidak boleh kosong.",
        number: (v) =>
          /(^[0-9]*$)/.test(v) || "Nomor induk hanya berisi angka.",
        chara: (v) =>
          (v && v.length >= 9) || "Nomor induk harus diisi minimal 9 karakter"
      },
      rulesNama: {
        noEmpty: (v) => !!v || "Nama tidak boleh kosong."
      },
      rulesEmail: {
        noEmpty: (v) => !!v || "E-mail tidak boleh kosong.",
        isValid: (v) => /.+@.+/.test(v) || "E-mail harus valid"
      }
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    isInputValid () {
      return !(
        this.rulesRole.noEmpty(this.role) !== true ||
        this.rulesJenisNomor.noEmpty(this.induk) !== true ||
        this.rulesNomorInduk.noEmpty(this.nomor) !== true ||
        this.rulesNomorInduk.number(this.nomor) !== true ||
        this.rulesNomorInduk.chara(this.nomor) !== true ||
        this.rulesNama.noEmpty(this.nama) !== true ||
        this.rulesEmail.noEmpty(this.email) !== true ||
        this.rulesEmail.isValid(this.email) !== true
      )
    }
  },
  methods: {
    async submitFormAccount () {
      let role = this.role
      if (role === "Tata Usaha") {
        role = "tata_usaha"
      }
      try {
        const result = await createOneAccount(
          this.nomor,
          this.induk,
          this.nama,
          this.email,
          role
        )
        if (result instanceof Error) {
          throw result
        } else {
          console.log(result)
          // this.dialog = true
          alert("Akun baru berhasil di submit")
          this.reset()
        }
      } catch (error) {
        console.log(error)
      }
    },
    reset () {
      this.role = ""
      this.induk = ""
      this.nomor = ""
      this.nama = ""
      this.email = ""
      this.$refs.form.reset()
    },
    onDismissDialog () {
      // this.$router.push({
      //   path: "/template/dashboard"
      // })
      this.dialog = false
    }
  }
}
</script>

<style scoped>
.v-text-field >>> label {
  font-size: 1em;
  font-weight: bold;
}
.colorPrimary {
  color: #272343;
}
</style>
