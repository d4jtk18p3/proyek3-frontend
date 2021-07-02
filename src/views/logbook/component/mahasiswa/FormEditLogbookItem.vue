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
          color="error"
          class="white--text mt-5 mr-16"
          elevation="5"
          @click.stop="openConfirmDialogBatal"
        >
          Batal
        </v-btn>
        <v-btn
          color="#59DCDC"
          class="white--text mt-5"
          elevation="5"
          :disabled="this.progress!=100"
          @click.stop="openConfirmDialogSimpan"
        >
          Simpan
        </v-btn>

        <v-dialog
          v-model="confirmdialogsimpan"
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
                @click="closeConfirmDialogSimpan"
              >
                tidak
              </v-btn>
              <v-btn
                outlined
                :color="isDark ? currentTheme.onSurface:'#272343'"
                @click="openDialogSimpan"
                :loading="this.loading"
              >
                ya
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="successdialogsimpan"
          width="500"
          persistent
        >
          <v-card
          :dark="isDark">
            <v-card-title class="headline font-weight-light"
            :class="currentTheme.colorPrimary">
              Logbook Berhasil Diubah
            </v-card-title>

            <v-card-text>
              data logbook yang anda ubah telah disimpan ke dalam sistem, terima kasih dan tetap semangat!
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                outlined
                :color="isDark ? currentTheme.onSurface:'#272343'"
                @click="closeSuccessDialogSimpan"
              >
                ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="errordialogsimpan"
          width="500"
          persistent
        >
          <v-card
          :dark="isDark">
            <v-card-title class="headline font-weight-light red--text"
            :class="currentTheme.colorPrimary">
              Logbook Gagal Diubah
            </v-card-title>

            <v-card-text>
              data logbook yang anda ubah tidak dapat disimpan ke dalam sistem karena <strong>{{this.errormessages}}</strong> Silakan periksa kembali bahwa data yang dimasukkan benar
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                outlined
                :color="isDark ? currentTheme.onSurface:'#272343'"
                @click="closeErrorDialogSimpan"
              >
                ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="confirmdialogbatal"
          width="500"
          persistent
        >
          <v-card
          :dark="isDark">
            <v-card-title class="headline font-weight-light">
              Apakah anda yakin ingin dibatalkan?
            </v-card-title>

            <v-card-text>
              semua perubahan yang telah dilakukan akan hilang.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                outlined
                color="error"
                @click="closeConfirmDialogBatal"
              >
                tidak
              </v-btn>
              <v-btn
                outlined
                :color="isDark ? currentTheme.onSurface:'#272343'"
                @click="onClickYaBatal"
              >
                ya
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
  name: "FormEditLogbookItem",
  components: { VueEditor },
  props: {
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
    idEntriLogbook: {
      type: String,
      required: false
    },
    idLogbooks: {
      type: String,
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
      confirmdialogsimpan: false,
      successdialogsimpan: false,
      errordialogsimpan: false,
      put: true,
      confirmdialogbatal: false,
      loading: false,
      errormessages: ""
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
    openConfirmDialogSimpan () {
      this.confirmdialogsimpan = true
    },
    closeConfirmDialogSimpan () {
      this.confirmdialogsimpan = false
    },
    openSuccessDialogSimpan () {
      this.confirmdialogsimpan = false
      this.successdialogsimpan = true
    },
    closeSuccessDialogSimpan () {
      this.successdialogsimpan = false
      this.$router.push({
        path: "/logbook/mylogbook"
      })
      this.$router.go(1)
    },
    openErrorDialogSimpan () {
      this.confirmdialogsimpan = false
      this.errordialogsimpan = true
    },
    closeErrorDialogSimpan () {
      this.errordialogsimpan = false
      this.loading = false
    },
    async openDialogSimpan () {
      // kode untuk menghubungi ke backend
      this.loading = true
      var stringDate = this.pickerValue.picker.split("-")
      var date = stringDate[0] + "/" + stringDate[1] + "/" + stringDate[2]
      console.log(this.idLogbooks)
      var newDataLogbook = {
        tanggal: date,
        kegiatan: this.kegiatan,
        hasil: this.hasil,
        kesan: this.kesan
      }
      console.log(newDataLogbook)
      this.put = await BackEndEntri.editEntryLogbookMhs(this.idLogbooks, this.idEntriLogbook, newDataLogbook)
      console.log(this.put.error)
      if (this.put.error === 400) {
        this.errormessages = this.put.message
        this.openErrorDialogSimpan()
      }
      if (this.put.status === 200) {
        this.openSuccessDialogSimpan()
      }
    },
    openConfirmDialogBatal () {
      this.confirmdialogbatal = true
    },
    closeConfirmDialogBatal () {
      this.confirmdialogbatal = false
    },
    onClickYaBatal () {
      this.$router.push({
        path: "/logbook/mylogbook"
      })
      this.$router.go(1)
    }
  }
}
</script>

<style>
</style>
