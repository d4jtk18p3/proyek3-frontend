<template>
  <v-sheet class="mx-auto" max-width="1000">
    <v-slide-group
      class="d-flex align-center pr-15"
      show-arrows
      value="3"
    >
      <v-slide-item
        v-for="(item, index) in jadwalMhs"
        :key="index"
        class="d-flex align-self-center"
      >
        <v-col>
          <v-card
            class="text-center justify-center rounded-xl d-flex flex-column active"
            width="255"
            height="300"
            :style="!item.active? 'background: #272343' : 'background: white'"
          >
            <v-card-text
              class="pb-0"
              :style="item.active? 'color: #272343' : 'color: white'"
            > #{{item.id_studi}}</v-card-text>
            <h3
              class="pt-0 pb-5 text-center"
              :style="item.active? 'color: #272343' : 'color: white'"
            > {{item.nama_mata_kuliah}}
              <br/>
              {{item.jenis}}
            </h3>
            <v-row justify="center">
                <v-card-text
                  v-for="(dosen, index) in item.dosens"
                  :key="index" class="pt-0 pb-0"
                  :style="item.active? 'color: #272343' : 'color: white'">
                  {{dosen.nama}}
                </v-card-text>
            </v-row>
            <v-spacer></v-spacer>
            <v-row justify="center">
              <v-col class="pb-0 mb-0 ml-4 mt-6 mr-4">
                <p
                  class="float-left"
                  :style="item.active? 'color: #272343' : 'color: white'">
                  {{item.waktu_mulai.slice(0,5)}}
                </p>
                <p
                  class="float-right"
                  :style="item.active? 'color: #272343' : 'color: white'">
                  {{item.waktu_selesai.slice(0,5)}}
                </p>
              </v-col>
                <v-progress-linear
                  background-color="#bfbfbf"
                  :color="item.hadir? 'success' : 'error'"
                  :value="item.progress"
                  height="5"
                  class="mt-0 pt-0 ml-8 mr-8 mb-8 justify-center"
                ></v-progress-linear>
            </v-row>
            <v-spacer></v-spacer>
            <v-card-actions class="justify-center">
              <v-btn
                :disabled="item.absen"
                elevation="2"
                rounded
                class="ma-5"
                color="#4CAF50"
                width="120"
                @click="presensi(index, item.id_studi, item.id_jadwal)"
              > Hadir</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex"
import PresensiMahasiswa from "@/datasource/network/absensi/PresensiMahasiswa"

const INTERVAL = 1000
const moment = require("moment")
var currentJadwal = 0

export default {
  name: "AbsenCard",
  props: {
    jadwalMhs: {
      type: Array,
      default () {
        return {}
      }
    },
    username: {
      type: String,
      default () {
        return {}
      }
    }
  },
  created () {
    // this.testProgressBar()
    var current = new Date()
    this.currentHour = current.getHours()
    this.currentMinute = current.getMinutes()
    this.currentDate = current.getFullYear() + "-" + (current.getMonth() + 1) + "-" + current.getDate()
    setTimeout(() => {
      this.presensiSchedule()
      setInterval(() => {
        current = new Date()
        this.currentHour = current.getHours()
        this.currentMinute = current.getMinutes()
        this.currentTime = this.currentHour + ":" + this.currentMinute + ":" + current.getSeconds()
        this.presensiSchedule()
      }, INTERVAL)
    }, 3000)
    // this.cekMatkulSama()
  },
  data () {
    return {
      currentHour: "",
      currentMinute: "",
      currentTime: "",
      currentDate: "",
      currentJadwal: null,
      currentKehadiran: null,
      interval: 0,
      matkulSama: [],
      //  data test
      jamAwal1: "07:00:00",
      jamAkhir1: "09:40:00",
      jamAwal2: "14:40:00",
      jamAkhir2: "15:30:00"
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  methods: {
    presensi (index, idStudi, idJadwal) {
      if (this.jadwalMhs[currentJadwal].id_jadwal_kedua !== 0) {
        this.presensiMahasiswa(index, idStudi, idJadwal)
        this.presensiMahasiswa(index, this.jadwalMhs[currentJadwal].id_studi_kedua, this.jadwalMhs[currentJadwal].id_jadwal_kedua)
      } else {
        this.presensiMahasiswa(index, idStudi, idJadwal)
      }
    },
    presensiMahasiswa (index, idStudi, idJadwal) {
      PresensiMahasiswa.presensiMahasiswa(idStudi, idJadwal, this.username)
        .then(response => {
          this.jadwalMhs[index].absen = true
          this.jadwalMhs[currentJadwal].hadir = true
        })
        .catch(e => {
          console.log(e)
        })
    },
    statusKehadiranMahasiswa (idJadwal) {
      PresensiMahasiswa.getStatusKehadiran(this.username, idJadwal, this.currentDate)
        .then(response => {
          this.currentKehadiran = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    presensiSchedule () {
      //  Jika Jadwalnya masih ada
      if (currentJadwal < this.jadwalMhs.length) {
        // Pengubahan Format
        var format = "HH:mm:ss"
        var currentTime = moment(this.currentTime, format)
        var beforeTime = moment(this.jadwalMhs[currentJadwal].waktu_mulai, format)
        var afterTime = moment(this.jadwalMhs[currentJadwal].waktu_selesai, format)

        // Perhitungan durasi, dilakukan untuk nilai progressbar
        var d = moment.duration(afterTime.diff(beforeTime, "seconds"))
        this.jadwalMhs[currentJadwal].duration = d._milliseconds

        // Lama Matkul sudah berjalan
        var jadwalDuration = moment.duration(currentTime.diff(beforeTime, "seconds"))
        this.jadwalMhs[currentJadwal].currentDuration = jadwalDuration._milliseconds

        // Pengurangan waktu mulai (waktu mulai absen adalah 30 menit sebelum jam mulai mata kuliah)
        beforeTime.subtract(30, "minutes")

        // Pengecekan tombol, apakah mahasiswa sudah absen, tidak akan hadir, atau sudah absen
        this.cekAktivasiTombol(this.jadwalMhs[currentJadwal].id_jadwal)
        // Pengecekan, apakah saat ini berada pada interval waktu mata kuliah yang sedang berlangsung atau tidak
        if (currentTime.isBetween(beforeTime, afterTime)) {
          // Pengecekan, apakah mahasiswa ybs tidak izin dan belum absen, dilakukan untuk aktivasi tombol
          if (this.currentKehadiran[0].isHadir === false && this.currentKehadiran[0].id_keterangan === null) {
            this.jadwalMhs[currentJadwal].absen = false
          } else if (this.currentKehadiran[0].isHadir === true || this.currentKehadiran[0].id_keterangan === "sakit" || this.currentKehadiran[0].id_keterangan === "izin") {
            this.jadwalMhs[currentJadwal].absen = true
            this.jadwalMhs[currentJadwal].hadir = true
          }

          // Perhitungan untuk value dari progressbar dan menyatakan saat ini mata kuliah sedang berlangsung
          this.jadwalMhs[currentJadwal].progress = this.jadwalMhs[currentJadwal].currentDuration / this.jadwalMhs[currentJadwal].duration * 100
          this.jadwalMhs[currentJadwal].active = false
          // this.jadwalMhs[currentJadwal].currentDuration = this.jadwalMhs[currentJadwal].currentDuration + 15
        } else {
          //  kondisi ketika saat ini bukan dalam interval waktu mata kuliah
          //  jika saat ini adalah setelah waktu mata kuliah yang telah berlangsung sebelumnya
          if (currentTime.isAfter(afterTime)) {
            if (this.currentKehadiran[0].isHadir === true || this.currentKehadiran[0].id_keterangan === "sakit" || this.currentKehadiran[0].id_keterangan === "izin") {
              this.jadwalMhs[currentJadwal].absen = true
              this.jadwalMhs[currentJadwal].hadir = true
            }
            this.jadwalMhs[currentJadwal].absen = true
            this.jadwalMhs[currentJadwal].active = true
            this.jadwalMhs[currentJadwal].progress = 100
            // if (this.currentKehadiran[0].isHadir === true && this.currentKehadiran[0].id_keterangan === null) {
            //   console.log("Mahasiswa sudah absen di jadwal ke- " + this.jadwalMhs[currentJadwal].id_jadwal)
            // }
            currentJadwal++
          } else {
            //  jika sekarang bukan waktu setelah mata kuliah (keknya inisalah dan perlu diperbaiki kondisinya)
            this.jadwalMhs[currentJadwal].active = true
            this.jadwalMhs[currentJadwal].absen = true
          }
        }
      }
    },
    cekAktivasiTombol (idJadwal) {
      this.statusKehadiranMahasiswa(idJadwal)
    },
    testProgressBar () {
      this.jadwalMhs[0].waktu_mulai = this.jamAwal1
      this.jadwalMhs[0].waktu_selesai = this.jamAkhir1
      this.jadwalMhs[1].waktu_mulai = this.jamAwal2
      this.jadwalMhs[1].waktu_selesai = this.jamAkhir2
    }
  }
}
</script>

<style scoped>
.active {
  background: #272343;
  color: white;
}
</style>
