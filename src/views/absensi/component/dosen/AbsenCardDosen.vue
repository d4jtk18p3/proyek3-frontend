<template>
  <v-sheet class="mx-auto" max-width="1000">
    <v-slide-group
      class="d-flex align-center pr-15"
      show-arrows
      value="3"
    >
      <v-slide-item
        v-for="(item, index) in jadwalDsn"
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
            > #{{item.id_studi}} {{item.active}}</v-card-text>
            <h3
              class="pt-0 pb-5 text-center"
              :style="item.active? 'color: #272343' : 'color: white'"
            > {{item.mata_kuliah.nama_mata_kuliah}}
              <br/>
              {{item.jenis}}
            </h3>
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
                @click="presensiDosen(index, item.id_studi, item.id_jadwal)"
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
import PresensiDosen from "@/datasource/network/absensi/PresensiDosen"

const INTERVAL = 1000
const moment = require("moment")
var currentJadwal = 0

export default {
  name: "AbsenCard",
  props: {
    jadwalDsn: {
      type: Array,
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
    this.presensiSchedule()
    setInterval(() => {
      current = new Date()
      this.currentHour = current.getHours()
      this.currentMinute = current.getMinutes()
      this.currentTime = this.currentHour + ":" + this.currentMinute + ":" + current.getSeconds()
      this.presensiSchedule()
    }, INTERVAL)
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
      //  data test
      jamAwal1: "23:00:00",
      jamAkhir1: "23:20:00",
      jamAwal2: "23:30:00",
      jamAkhir2: "23:50:00"
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  methods: {
    presensiDosen (index, idStudi, idJadwal) {
      console.log(idJadwal)
      PresensiDosen.presensiDosen(196610181995121000, idStudi, idJadwal)
        .then(response => {
          this.jadwalDsn[index].absen = true
          console.log("Mahasiswa telah absen untuk jadwal " + idStudi + "Pada tanggal " + this.currentDate)
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
    },
    statusKehadiranDosen (idJadwal) {
      PresensiDosen.getStatusKehadiran(196610181995121000, idJadwal, this.currentDate)
        .then(response => {
          this.currentKehadiran = response.data
          this.jadwalDsn[currentJadwal].hadir = this.currentKehadiran[0].isHadir
          console.log("Status kehadiran mahasiswa pada jadwal " + idJadwal + " adalah " + this.jadwalDsn[currentJadwal].hadir)
        })
        .catch(e => {
          console.log(e)
        })
    },
    presensiSchedule () {
      //  Jika Jadwalnya masih ada
      if (currentJadwal < this.jadwalDsn.length) {
        // Pengubahan Format
        var format = "HH:mm:ss"
        var currentTime = moment(this.currentTime, format)
        var beforeTime = moment(this.jadwalDsn[currentJadwal].waktu_mulai, format)
        var afterTime = moment(this.jadwalDsn[currentJadwal].waktu_selesai, format)
        console.log(this.jadwalDsn[currentJadwal].waktu_mulai)

        // Perhitungan durasi, dilakukan untuk nilai progressbar
        var d = moment.duration(afterTime.diff(beforeTime, "seconds"))
        console.log("Duration: " + d)
        this.jadwalDsn[currentJadwal].duration = d._milliseconds

        // Lama Matkul sudah berjalan
        var jadwalDuration = moment.duration(currentTime.diff(beforeTime, "seconds"))
        this.jadwalDsn[currentJadwal].currentDuration = jadwalDuration._milliseconds

        // Pengurangan waktu mulai (waktu mulai absen adalah 30 menit sebelum jam mulai mata kuliah)
        beforeTime.subtract(30, "minutes")

        // Pengecekan tombol, apakah mahasiswa sudah absen, tidak akan hadir, atau sudah absen
        this.cekAktivasiTombol(this.jadwalDsn[currentJadwal].id_jadwal)
        console.log("Id jadwal: " + this.jadwalDsn[currentJadwal].id_jadwal)

        // Pengecekan, apakah saat ini berada pada interval waktu mata kuliah yang sedang berlangsung atau tidak
        if (currentTime.isBetween(beforeTime, afterTime)) {
          // Pengecekan, apakah mahasiswa ybs tidak izin dan belum absen, dilakukan untuk aktivasi tombol
          if (this.currentKehadiran[0].isHadir === false) {
            console.log("Mahasiswa sudah absen di jadwal ke- " + this.jadwalDsn[currentJadwal].id_jadwal)
            this.jadwalDsn[currentJadwal].absen = false
          } else if (this.currentKehadiran[0].isHadir === true) {
            this.jadwalDsn[currentJadwal].absen = true
          }

          // Perhitungan untuk value dari progressbar dan menyatakan saat ini mata kuliah sedang berlangsung
          console.log(this.jadwalDsn[currentJadwal].progress)
          this.jadwalDsn[currentJadwal].progress = this.jadwalDsn[currentJadwal].currentDuration / this.jadwalDsn[currentJadwal].duration * 100
          console.log(this.jadwalDsn[currentJadwal].progress)
          this.jadwalDsn[currentJadwal].active = false
          // this.jadwalDsn[currentJadwal].currentDuration = this.jadwalDsn[currentJadwal].currentDuration + 15
          console.log("SEKARANG INI WAKTUNYA ABSEN")
        } else {
          //  kondisi ketika saat ini bukan dalam interval waktu mata kuliah
          //  jika saat ini adalah setelah waktu mata kuliah yang telah berlangsung sebelumnya
          if (currentTime.isAfter(afterTime)) {
            this.jadwalDsn[currentJadwal].absen = true
            this.jadwalDsn[currentJadwal].active = true
            this.jadwalDsn[currentJadwal].progress = 100
            // if (this.currentKehadiran[0].isHadir === true && this.currentKehadiran[0].id_keterangan === null) {
            //   console.log("Mahasiswa sudah absen di jadwal ke- " + this.jadwalDsn[currentJadwal].id_jadwal)
            // }
            console.log(currentJadwal)
            currentJadwal++
            console.log("SEKARANG INI WAKTUNYA GANTI JADWAL")
          } else {
            //  jika sekarang bukan waktu setelah mata kuliah (keknya inisalah dan perlu diperbaiki kondisinya)
            this.jadwalDsn[currentJadwal].active = true
            this.jadwalDsn[currentJadwal].absen = true
            console.log("SEKARANG BUKAN JADWAL MANA MANA")
          }
        }
      }
    },
    cekAktivasiTombol (idJadwal) {
      this.statusKehadiranDosen(idJadwal)
    },
    testProgressBar () {
      // this.jadwalDsn.push(this.jadwalDsn[1])
      this.jadwalDsn[0].waktu_mulai = this.jamAwal1
      this.jadwalDsn[0].waktu_selesai = this.jamAkhir1
      this.jadwalDsn[1].waktu_mulai = this.jamAwal2
      this.jadwalDsn[1].waktu_selesai = this.jamAkhir2
      // this.jadwalDsn[0].nama_mata_kuliah = "Proyek"
      // this.jadwalDsn[1].nama_mata_kuliah = "Proyek"
      // this.jadwalDsn[2].nama_mata_kuliah = "APPL"
    },
    cekMatkulSama () {
      for (var i in this.jadwalDsn) {
        if (this.jadwalDsn[i].mata_kuliah.nama_mata_kuliah === this.jadwalDsn[i + 1].mata_kuliah.nama_mata_kuliah) {
          console.log("Jadwal " + this.jadwalDsn[i] + " sama dengan jadwal " + this.jadwalDsn[i])
        }
      }
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
