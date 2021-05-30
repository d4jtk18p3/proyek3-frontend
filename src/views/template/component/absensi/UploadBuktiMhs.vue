<template lang="">
    <v-dialog max-width="650">
      <template v-slot:activator="{on}">
            <v-btn color="info" v-on="on" dark>+ AJUKAN IZIN PERKULIAHAN</v-btn>
      </template>
      <v-card max-height="1000" max-width="650" style="border-radius:15px">
        <div>
            <h1 align="center" >Ajukan Izin</h1>
             <form class="content">
                 <v-row>
                    <v-col cols="12">
                      <img width="25px" height="25px" src="../../../../assets/1.png"/>
                      <p>Ajukan Izin untuk mata kuliah</p>
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
                          @change='selectedPerkuliahan(jadwal.id_studi)'
                        ></v-checkbox>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <img width="25px" height="25px" src="../../../../assets/2.png"/>
                        <p>Ajukan surat keterangan izin</p>
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
                          :rules="imgRules"
                          @change='addFile()'
                        ></v-file-input>
                        </div>
                    </v-col>
                    <v-col cols="12">
                      <img width="25px" height="25px" src="../../../../assets/3.png"/>
                        <p>Konfirmasi diri</p>
                        <div class="inside">
                        <v-text-field
                            label="Password"
                            v-model="password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            width="100px"
                        ></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <v-checkbox v-model="checkbox" div class="inside">
                        <template v-slot:label>
                          <div >
                            Dengan ini saya menyetujui segala
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <a
                                  target="_blank"
                                  href="/template/mahasiswa/absensi"
                                  @click.stop
                                  v-on="on"
                                >
                                  kebijakan
                                </a>
                              </template>
                              Opens in new window
                            </v-tooltip>
                          </div>
                        </template>
                        </v-checkbox>
                    </v-col>
                    <div div class="inside">
                      <v-btn align="center" @click="uploadKeterangan">
                            Kirim Permohonan
                        </v-btn>
                    </div>
                 </v-row>
             </form>
        </div>
      </v-card>
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
      url_gambar: null,
      imgRules: []
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
    uploadKeterangan () {
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
        })
        .catch(e => {
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
    selectedPerkuliahan (value) {
      this.idPerkuliahan.push(value)
      console.log(this.idPerkuliahan)
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
p {
  font-size: 18px;
  margin-left : 40px;
}
.inside{
  padding-left : 40px;
}
.submit{
  text-align : center;
}
</style>
