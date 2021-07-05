<template>
  <v-sheet class="mx-auto" max-width="1000">
    <v-slide-group
      class="d-flex align-center pr-15"
      show-arrows
      value="3"
    >
      <v-slide-item
        style="background: white"
        v-for="(item, index) in jadwalMhs"
        :key="index"
        class="d-flex align-self-center"
      >
        <v-col>
          <v-card
            class="text-center justify-center rounded-xl d-flex flex-column active"
            width="255"
            height="300"
            :style="item.active? 'background: #272343' : 'background: white'"
          >
            <v-card-text
              class="pb-0"
              :style="!item.active? 'color: #272343' : 'color: white'"
            > #{{item.id_studi}}</v-card-text>
            <h3
              class="pt-0 pb-5 text-center"
              :style="!item.active? 'color: #272343' : 'color: white'"
            > {{item.nama_mata_kuliah}}
              <br/>
              {{item.jenis}}
            </h3>
            <v-row justify="center">
                <v-card-text
                  v-for="(dosen, index) in item.dosens"
                  :key="index" class="pt-0 pb-0"
                  :style="!item.active? 'color: #272343' : 'color: white'">
                  {{dosen.nama}}
                </v-card-text>
            </v-row>
            <v-spacer></v-spacer>
            <v-row justify="center">
              <v-col class="pb-0 mb-0 ml-4 mt-6 mr-4">
                <p
                  class="float-left"
                  :style="!item.active? 'color: #272343' : 'color: white'">
                  {{item.waktu_mulai.slice(0,5)}}
                </p>
                <p
                  class="float-right"
                  :style="!item.active? 'color: #272343' : 'color: white'">
                  {{item.waktu_selesai.slice(0,5)}}
                </p>
              </v-col>
                <v-progress-linear
                  background-color="#bfbfbf"
                  :color="item.hadir? 'success' : 'error'"
                  :value="item.value"
                  height="5"
                  class="mt-0 pt-0 ml-8 mr-8 mb-8 justify-center"
                ></v-progress-linear>
            </v-row>
            <v-spacer></v-spacer>
            <v-card-actions class="justify-center">
              <v-btn
                v-if="item.absen"
                elevation="2"
                rounded
                class="ma-5"
                color="#4CAF50"
                width="120"
                @click="presensiMahasiswa(index, item.id_studi, item.id_jadwal)"
              > Hadir</v-btn>
              <v-btn
                v-else
                elevation="2"
                rounded
                class="ma-5"
                disabled
                width="120"
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

const INTERVAL = 1000 * 15
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
    }
  },
  created () {
    this.testProgressBar()
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
      jamAwal: "10:00:00",
      jamAkhir: "12:20:00"
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  methods: {
    presensiMahasiswa (index, idStudi, idJadwal) {
      console.log(idJadwal)
      PresensiMahasiswa.presensiMahasiswa(idStudi, idJadwal, 181524010)
        .then(response => {
          this.jadwalMhs[index].absen = false
          console.log("Mahasiswa telah absen untuk jadwal " + idStudi + "Pada tanggal " + this.currentDate)
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
    },
    statusKehadiranMahasiswa (idJadwal) {
      PresensiMahasiswa.getStatusKehadiran(181524010, idJadwal, this.currentDate)
        .then(response => {
          this.currentKehadiran = response.data
          this.jadwalMhs[currentJadwal].hadir = this.currentKehadiran[0].isHadir
          console.log("Status kehadiran mahasiswa pada jadwal " + idJadwal + " adalah " + this.jadwalMhs[currentJadwal].hadir)
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
        console.log(this.jadwalMhs[currentJadwal].waktu_mulai)

        // Pengurangan waktu mulai (waktu mulai absen adalah 30 menit sebelum jam mulai mata kuliah)
        beforeTime.subtract(30, "minutes")

        // Perhitungan durasi, dilakukan untuk nilai progressbar
        var d = moment.duration(afterTime.diff(beforeTime, "seconds"))
        console.log("Duration: " + d)
        this.jadwalMhs[currentJadwal].value = d._milliseconds

        // Pengecekan tombol, apakah mahasiswa sudah absen, tidak akan hadir, atau sudah absen
        this.cekAktivasiTombol(this.jadwalMhs[currentJadwal].id_jadwal)
        console.log("Id jadwal: " + this.jadwalMhs[currentJadwal].id_jadwal)

        // Pengecekan, apakah saat ini berada pada interval waktu mata kuliah yang sedang berlangsung atau tidak
        if (currentTime.isBetween(beforeTime, afterTime)) {
          // Pengecekan, apakah mahasiswa ybs tidak izin dan belum absen, dilakukan untuk aktivasi tombol
          if (this.currentKehadiran[0].isHadir === false && this.currentKehadiran[0].id_keterangan === null) {
            console.log("Mahasiswa sudah absen di jadwal ke- " + this.jadwalMhs[currentJadwal].id_jadwal)
            this.jadwalMhs[currentJadwal].absen = true
          }

          // Perhitungan untuk value dari progressbar dan menyatakan saat ini mata kuliah sedang berlangsung
          console.log(this.jadwalMhs[currentJadwal].value)
          this.jadwalMhs[currentJadwal].value = this.jadwalMhs[currentJadwal].value + ((d._milliseconds / 360) * (15 / 100))
          console.log(this.jadwalMhs[currentJadwal].value)
          this.jadwalMhs[currentJadwal].active = true
          console.log("SEKARANG INI WAKTUNYA ABSEN")
        } else {
          //  kondisi ketika saat ini bukan dalam interval waktu mata kuliah
          //  jika saat ini adalah setelah waktu mata kuliah yang telah berlangsung sebelumnya
          if (currentTime.isAfter(afterTime)) {
            this.jadwalMhs[currentJadwal].absen = false
            this.jadwalMhs[currentJadwal].active = false
            // if (this.currentKehadiran[0].isHadir === true && this.currentKehadiran[0].id_keterangan === null) {
            //   console.log("Mahasiswa sudah absen di jadwal ke- " + this.jadwalMhs[currentJadwal].id_jadwal)
            // }
            console.log(currentJadwal)
            currentJadwal++
            console.log("SEKARANG INI WAKTUNYA GANTI JADWAL")
          } else {
            //  jika sekarang bukan waktu setelah mata kuliah (keknya inisalah dan perlu diperbaiki kondisinya)
            this.jadwalMhs[currentJadwal].active = false
            this.jadwalMhs[currentJadwal].absen = false
            console.log("SEKARANG BUKAN JADWAL MANA MANA")
          }
        }
      }
    },
    cekAktivasiTombol (idJadwal) {
      this.statusKehadiranMahasiswa(idJadwal)
    },
    testProgressBar () {
      this.jadwalMhs[1].waktu_mulai = this.jamAwal
      this.jadwalMhs[1].waktu_selesai = this.jamAkhir
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
