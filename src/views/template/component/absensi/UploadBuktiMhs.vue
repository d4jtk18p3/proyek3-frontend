<template>
    <v-dialog max-width="650" v-model="dialog">
      <template v-slot:activator="{on}">
        <v-btn color="info" v-on="on" dark>+ AJUKAN IZIN PERKULIAHAN</v-btn>
      </template>
      <v-card :loading="isLoading" max-height="1000" max-width="650" style="border-radius:15px">
        <div>
            <h1 align="center" >Ajukan Izin</h1>
             <form class="content">
                 <v-row>
                    <v-col cols="12">
                      <img width="25px" height="25px" src="../../../../assets/1.png"/>
                      <p class="judul">Ajukan Izin untuk mata kuliah</p>
                      <div
                        class="alert"
                        v-if="idPerkuliahan.length === 0"
                      >
                        <p>Mata kuliah wajib diisi</p>
                      </div>
                      <!--nanti diganti pakai nama matakuliah, terus paramater yang dipassnya id matkul-->
                      <div
                        v-for='(jadwal, index) in jadwalMhs'
                        :key="index"
                        class="inside"
                      >
                        <v-checkbox
                          small color="indigo"
                          class="ma-0 pa-0"
                          :label="`${jadwal.nama_mata_kuliah}`"
                          :v-model="jadwal.checked"
                          @change='selectedPerkuliahan(jadwal.id_studi, jadwal.nama_mata_kuliah)'
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
                          :rules="[imgRules, rules.url_gambar]"
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
                        </div>
                    </v-col>
                    <v-col cols="12">
                      <v-checkbox v-model="checkbox"
                        :rules="[checkboxValue]"
                        @click="isChecked = !isChecked"
                        label = "Dengan ini saya menyetujui segala kebijakan"
                        >
                        </v-checkbox>
                    </v-col>
                    <v-col cols="12">
                    <v-alert
                      dense
                      outlined
                      type="error"
                      :icon="false"
                      v-if="error.isError"
                      class="text-center text-subtitle-2">{{errorMessage}}</v-alert>
                      <v-alert
                      dense
                      outlined
                      type="success"
                      :icon="success"
                      v-if="isSuccess"
                      class="text-center text-subtitle-2">{{errorMessage}}</v-alert>
                    </v-col>
                    <div div class="inside">
                      <v-btn
                        align="center"
                        @click="uploadKeterangan"
                        color ="#FB8C00"
                        :disabled = "isDisable"
                      >
                            Kirim Permohonan
                        </v-btn>
                    </div>
                 </v-row>
             </form>
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
export default {
  data () {
    return {
      computed: {
        ...mapGetters({
          currentTheme: "theme/getCurrentColor",
          isDark: "theme/getIsDark"
        })
      },
      idPerkuliahan: [],
      file: null,
      isChecked: false,
      matkulIsNull: true,
      isLoading: false,
      isSuccess: false,
      url_gambar: null,
      password: undefined,
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
      }
    }
  },
  computed: {
    errorMessage () {
      return this.error.message
    },
    isDisable () {
      return this.idPerkuliahan.length === 0 || this.url_gambar == null || this.password.length === 0 || this.isChecked !== true
    }
  },
  props: {
    jadwalMhs: {
      type: Array,
      default () {
        return {}
      }
    }
  },
  methods: {
    checkboxValue () {
      if (!this.isChecked) {
        return "Anda harus menyetujui segala kebijakan"
      }
    },
    uploadKeterangan () {
      this.isLoading = true
      this.isSuccess = false
      this.error.isError = false
      var data = new FormData()
      if (this.url_gambar) data.append("surat-izin", this.url_gambar)
      data.append("status", "izin")
      for (var i in this.idPerkuliahan) {
        data.append("idStudies", this.idPerkuliahan[i])
      }
      console.log(data)
      Keterangan.uploadKeterangan(data)
        .then(response => {
          console.log(response)
          this.error.message = "Upload bukti berhasil ! Data akan segera divalidasi oleh dosen wali"
          this.isLoading = false
          this.isSuccess = true
        })
        .catch(e => {
          this.error.message = e.message
          this.error.isError = true
          this.isLoading = false
          console.log(e)
        })
    },
    // masih pakai id perkuliahan, nanti yang diambil nama matkulnya
    // getPerkuliahan () {
    //   const jadwal = this.jadwalMhs
    //   for (var i in jadwal) {
    //     this.idPerkuliahan.push(jadwal[i].id_perkuliahan)
    //   }
    //   console.log(this.idPerkuliahan)
    // },
    selectedPerkuliahan (value, jadwal) {
      var index = this.idPerkuliahan.indexOf(value)
      if (index === -1) {
        this.idPerkuliahan.push(value)
        console.log(this.idPerkuliahan)
      } else {
        this.idPerkuliahan.splice(index, 1)
        console.log(this.idPerkuliahan)
      }
    },
    addFile () {
      // const file = this.$refs.file.files[0]
      // this.file = file
      if (this.url_gambar) {
        this.imgRules = [
          (v) => v.type === "image/png" || "Gambar harus bertipe *.png"
        ]
        // this.urlTemp = URL.createObjectURL(this.url_gambar)
      }
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
