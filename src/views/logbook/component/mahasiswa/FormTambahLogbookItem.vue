<template>
    <v-container >
      <v-row class="mt-0 mb-0">
        <v-col cols="12">
            Kegiatan
            <vue-editor
              v-model="kegiatan"
              class="mt-3 mb-0 elevation-2"
              @input="checkProgress"
              placeholder="Silakan isi dengan kegiatan yang anda lakukan..."
              :rules="[rules.kegiatan]"
              ></vue-editor>
        </v-col>
      </v-row>
      <v-row class="mt-0 mb-0">
        <v-col cols="12">
            Hasil
            <vue-editor
                v-model="hasil"
                class="mt-3 mb-0 elevation-2"
                @input="checkProgress"
                placeholder="Silakan isi dengan hasil dari kegiatan yang anda lakukan..."
                :rules="[rules.hasil]"
            ></vue-editor>
        </v-col>
      </v-row>
      <v-row class="mt-0 mb-0">
        <v-col cols="12">
            Kesan
            <vue-editor
                v-model="kesan"
                class="mt-3 mb-0 elevation-2"
                @input="checkProgress"
                placeholder="Silakan isi dengan kesan dari kegiatan yang anda lakukan..."
                :rules="[rules.kesan]"
            ></vue-editor>
        </v-col>
      </v-row>
      <v-row class="mt-0 mb-0" justify="center">
        <v-col cols="12">
          <v-progress-linear
          :value="this.progress"
          color="#59DCDC"
          ></v-progress-linear>
        </v-col>
      </v-row>
      <v-row class="mt-0 mb-0" justify="center">
        <v-btn
          color="#59DCDC"
          class="white--text mt-5"
          elevation="5"
          :disabled="this.progress!=100"
          @click.stop="openConfirmDialog"
        >
          Selesai
        </v-btn>
        <v-dialog
          v-model="confirmdialog"
          width="500"
          persistent
        >
          <v-card
          :dark="isDark">
            <v-card-title class="headline font-weight-light">
              Apakah Anda Sudah Yakin?
            </v-card-title>

            <v-card-text>
              pastikan semua isian yang anda isi valid.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                outlined
                color="error"
                @click="closeConfirmDialog"
              >
                tidak
              </v-btn>
              <v-btn
                outlined
                :color="isDark ? currentTheme.onSurface:'#272343'"
                @click="openDialog"
                :loading="this.loading"
              >
                ya
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="successdialog"
          width="500"
          persistent
        >
          <v-card
          :dark="isDark">
            <v-card-title class="headline font-weight-light"
            :class="currentTheme.colorPrimary">
              Logbook Berhasil Ditambahkan
            </v-card-title>

            <v-card-text>
              data logbook yang anda isi telah ditambahkan ke dalam sistem, terima kasih dan tetap semangat!
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                outlined
                :color="isDark ? currentTheme.onSurface:'#272343'"
                @click="closeSuccessDialog"
              >
                ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="errordialog"
          width="500"
          persistent
        >
          <v-card
          :dark="isDark">
            <v-card-title class="headline font-weight-light red--text"
            :class="currentTheme.colorPrimary">
              Logbook Gagal Ditambahkan
            </v-card-title>

            <v-card-text>
              data logbook yang anda isi tidak dapat ditambahkan ke dalam sistem karena <strong>{{this.errorMessages}}</strong> Silakan periksa kembali bahwa data yang dimasukkan benar
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                outlined
                :color="isDark ? currentTheme.onSurface:'#272343'"
                @click="closeErrorDialog"
              >
                ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex"
import { VueEditor } from "vue2-editor"
import BackEndEntri from "../../../../datasource/network/logbook/entri"
export default {
  name: "FormTambahLogbookItem",
  components: { VueEditor },
  props: {
    picker: {
      type: Date,
      required: false,
      default: () => {
        return new Date().toISOString().substr(0, 10)
      }
    },
    kegiatan: {
      type: String,
      required: false,
      default: () => {
        return ""
      }
    },
    hasil: {
      type: String,
      required: false,
      default: () => {
        return ""
      }
    },
    kesan: {
      type: String,
      required: false,
      default: () => {
        return ""
      }
    },
    identitas: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      progress: 0,
      rules: {
        kegiatan: value => !!value || "Field kegiatan harus diisi.",
        hasil: value => !!value || "Field hasil harus diisi.",
        kesan: value => !!value || "Field kesan harus diisi."
      },
      confirmdialog: false,
      successdialog: false,
      errordialog: false,
      post: null,
      loading: false,
      errorMessages: ""
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark",
      pickerValue: "logbook/getDatePickerValue"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  },
  mounted () {
    this.checkProgress()
  },
  methods: {
    checkProgress () {
      if (this.kegiatan !== "" || this.hasil !== "" || this.kesan !== "") {
        this.progress = 100 / 3
      }
      if ((this.kegiatan !== "" && this.hasil !== "") || (this.kegiatan !== "" && this.kesan !== "") || (this.kesan !== "" && this.hasil !== "")) {
        this.progress = 100 * 2 / 3
      }
      if (this.kegiatan !== "" && this.hasil !== "" && this.kesan !== "") {
        this.progress = 100
      }
      if (this.kegiatan === "" && this.hasil === "" && this.kesan === "") {
        this.progress = 0
      }
    },
    openConfirmDialog () {
      this.confirmdialog = true
    },
    closeConfirmDialog () {
      this.confirmdialog = false
    },
    openSuccessDialog () {
      this.confirmdialog = false
      this.successdialog = true
    },
    closeSuccessDialog () {
      this.successdialog = false
      this.$router.push({
        path: "/logbook/mylogbook"
      })
      this.$router.go(1)
    },
    openErrorDialog () {
      this.confirmdialog = false
      this.errordialog = true
    },
    closeErrorDialog () {
      this.errordialog = false
      this.loading = false
    },
    async openDialog () {
      // disini tambahin connect backend untuk add logbook

      this.loading = true
      console.log(this.pickerValue.picker)
      var stringDate = this.pickerValue.picker.split("-")
      var date = stringDate[0] + "/" + stringDate[1] + "/" + stringDate[2]
      console.log(date)
      var dataLogbook = {
        tanggal: date,
        kegiatan: this.kegiatan,
        hasil: this.hasil,
        kesan: this.kesan
      }
      console.log(dataLogbook)
      this.post = await BackEndEntri.addEntryLogbookMhs(this.identitas.nim, dataLogbook)
      console.log(this.post)
      if (this.post.error === 400) {
        this.errorMessages = this.post.message
        this.openErrorDialog()
      }
      if (this.post.status === 200) {
        this.openSuccessDialog()
      }
    }
  }
}
</script>

<style>
</style>
