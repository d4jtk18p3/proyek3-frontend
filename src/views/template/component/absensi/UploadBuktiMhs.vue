<template>
    <v-dialog max-width="650">
      <template v-slot:activator="{on}">
        <v-btn color="info" v-on="on" dark>+ AJUKAN IZIN PERKULIAHAN</v-btn>
      </template>
      <v-card :loading="isLoading" max-height="1000" max-width="650" style="border-radius:15px">
        <div>
            <h1 align="center" >Ajukan Izin</h1>
             <v-form class="content" ref="form">
                 <v-row>
                    <v-col cols="12">
                      <img width="25px" height="25px" src="../../../../assets/1.png"/>
                      <p class="judul">Ajukan Izin untuk mata kuliah</p>
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="dates"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-combobox
                            v-model="dates"
                            chips
                            small-chips
                            label="Tanggal perkuliahan"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            :rules="[validateDate]"
                          ></v-combobox>
                        </template>
                        <v-date-picker
                          v-model="dates"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="updateValue"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                      <div
                        class="alert"
                        v-if="idPerkuliahan.length === 0"
                        >
                          <p>Mata kuliah wajib diisi</p>
                      </div>
                      <div
                        v-for='(jadwal, index) in jadwalMhs'
                        :key="index"
                        class="inside"
                      >
                        <v-checkbox
                          small color="#59DCDC"
                          class="ma-0 pa-0"
                          :label="`${jadwal.nama_mata_kuliah}`"
                          :v-model="jadwal.checked"
                          @change='selectedPerkuliahan(jadwal.id_jadwal, jadwal.nama_mata_kuliah)'
                          :disabled="isSelected(jadwal.id_jadwal) && isIzin"
                        ></v-checkbox>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <img width="25px" height="25px" src="../../../../assets/2.png"/>
                        <p class="judul">Ajukan surat keterangan izin</p>
                        <div class="inside">
                        <v-file-input
                          show-size
                          label="File input"
                          height="20px"
                          prepend-icon="mdi-camera"
                          v-model="url_gambar"
                          ref="file"
                          type="file"
                          accept="image/*"
                          :rules="[rules.url_gambar]"
                          @change='addFile()'
                        ></v-file-input>
                        </div>
                    </v-col>
                    <v-col cols="12">
                      <img width="25px" height="25px" src="../../../../assets/3.png"/>
                        <p class="judul">Konfirmasi diri</p>
                        <div class="inside">
                        <v-text-field
                            label="Password"
                            v-model="password"
                            :rules="[rules.password]"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            width="100px"
                        ></v-text-field>
                        <v-row
                          align="center"
                          justify="space-around"
                        >
                        <v-checkbox
                        small color="#59DCDC"
                        :rules="[isChecked]"
                        @click="isChecked = !isChecked"
                        label = "Dengan ini saya menyetujui segala kebijakan"
                        >
                        </v-checkbox>
                        </v-row>
                        </div>
                    </v-col>
                    <v-col cols="12">
                    <v-alert
                      dense
                      outlined
                      type="error"
                      v-if="error.isError"
                      class="text-subtitle-2">{{errorMessage}}</v-alert>
                      <v-alert
                      dense
                      outlined
                      type="success"
                      v-if="isSuccess"
                      class="text-subtitle-2">{{errorMessage}}</v-alert>
                    </v-col>
                    <v-row
                      align="center"
                      justify="space-around"
                    >
                      <v-btn
                        @click="uploadKeterangan"
                        color ="#272343"
                        class= "white--text"
                        :disabled = "isDisable"
                      >
                            Kirim Permohonan
                        </v-btn>
                    </v-row>
                 </v-row>
             </v-form>
        </div>
      </v-card>
      <v-progress-circular
      class="progressbar"
      v-if="isLoading"
      color="#E52B38"
      height="10"
      indeterminate
    ></v-progress-circular>
    <v-overlay :value="isLoading" absolute></v-overlay>
    </v-dialog>
</template>
<script>
import { mapGetters } from "vuex"
import Keterangan from "../../../../datasource/api/absensi/keterangan"
import JadwalMahasiswa from "../../../../datasource/api/absensi/jadwal"

const schedule = require("node-schedule")

export default {
  created () {
    this.getJadwalMhs()
    schedule.scheduleJob("0 0 0 * * *", function () {
      this.idPerkuliahan = []
      this.isSuccess = false
      this.isError = false
    })
  },
  data () {
    return {
      computed: {
        ...mapGetters({
          currentTheme: "theme/getCurrentColor",
          isDark: "theme/getIsDark"
        })
      },
      dates: new Date().toISOString().substr(0, 10),
      chooseDay: new Date().getDay(),
      jadwalMhs: [],
      menu: false,
      idPerkuliahan: [],
      file: null,
      isChecked: false,
      matkulIsNull: true,
      isLoading: false,
      isSuccess: false,
      url_gambar: null,
      password: "",
      imgRules: [],
      rules: {
        password: (value) => !!value || "Password tidak boleh kosong",
        // checkbox: (value) => !!value || "Anda harus menyetujui segala kebijakan",
        url_gambar: (value) => !!value || "Bukti kehadiran tidak boleh kosong",
        isChecked: v => (!!v && v) === false || "Anda harus menyetujui segala kebijakan"
      },
      error: {
        isError: false,
        message: ""
      },
      show1: false,
      isIzin: false,
      invalidDate: false
    }
  },
  computed: {
    errorMessage () {
      return this.error.message
    },
    isDisable () {
      return this.idPerkuliahan.length === 0 || this.url_gambar == null || this.password.length === 0 || this.isChecked !== true || this.invalidDate === true
    }
  },
  methods: {
    checkboxValue () {
      if (!this.isChecked) {
        return "Anda harus menyetujui segala kebijakan"
      }
    },
    validateDate () {
      var moment = require("moment")
      var currentDate = new Date()
      if (!moment(this.dates).isSameOrAfter(currentDate, "day")) {
        this.invalidDate = true
        return "Tanggal tidak valid"
      } else {
        if (this.chooseDay === 6 || this.chooseDay === 0) {
          this.invalidDate = true
          return "Pemilihan hari harus selain Sabtu atau Minggu"
        } else {
          this.invalidDate = false
          return " "
        }
      }
    },
    updateValue () {
      this.$refs.menu.save(this.dates)
      var convertdate = new Date(this.dates)
      this.chooseDay = convertdate.getDay()
      this.getJadwalMhs()
    },
    uploadKeterangan () {
      this.isLoading = true
      this.isSuccess = false
      this.error.isError = false
      var data = new FormData()
      if (this.url_gambar) data.append("surat-izin", this.url_gambar)
      data.append("status", "izin")
      data.append("idJadwals", this.idPerkuliahan)
      console.log("INI ADALAH ID" + this.url_gambar)
      data.append("nim", 181524010)
      data.append("tglIzin", this.dates)
      Keterangan.uploadKeterangan(data)
        .then(response => {
          console.log(response)
          this.error.message = "Upload bukti berhasil ! Data akan segera divalidasi oleh dosen wali"
          this.isLoading = false
          this.isSuccess = true
          this.isIzin = true
          this.reset()
        })
        .catch(e => {
          this.error.message = e.message
          this.error.isError = true
          this.isLoading = false
          console.log(e)
        })
    },
    selectedPerkuliahan (value, jadwal) {
      var index = this.idPerkuliahan.indexOf(value)
      if (index === -1) {
        this.idPerkuliahan.push(value)
      } else {
        this.idPerkuliahan.splice(index, 1)
      }
    },
    addFile () {
      if (this.url_gambar) {
        this.imgRules = [
          (v) => v.type === "image/png" || "Gambar harus bertipe *.png"
        ]
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    isSelected (value) {
      var index = this.idPerkuliahan.indexOf(value)
      if (index === -1) {
        return false
      }
      return true
    },
    getJadwalMhs () {
      JadwalMahasiswa.getJadwalMahasiswa(this.chooseDay, 181524010)
        .then(response => {
          response.data.jadwal.forEach(function (element) {
            element.absen = "false"
          })
          this.jadwalMhs = response.data.jadwal
          console.log(response.data.jadwal)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
<style scoped>
.content {
display: flex;
padding : 3rem 5rem 5rem 5rem;
height: 100%;
width: 100%;
flex-direction: column;
}
h1 {
    text-align:center;
    padding-top: 2rem;
}
.v-text-field{
      width: 500px;
}
img {
  float : left;
}
.judul {
  font-size: 18px;
  margin-left : 40px;
}
.inside{
  padding-left : 40px;
}
.submit{
  text-align : center;
}
.alert{
  font-size: 12px;
  margin-left : 40px;
  color : red;
}
.progressbar {
  position: fixed;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
