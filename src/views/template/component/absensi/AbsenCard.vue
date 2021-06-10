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
                  {{item.waktu_mulai.slice(0,5)}}
                </p>
              </v-col>
                <v-progress-linear
                  background-color="#bfbfbf"
                  :color="item.absen? 'success' : 'error'"
                  :value="currentValue"
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
import PresensiMahasiswa from "../../../../datasource/api/absensi/PresensiMahasiswa"

// const THIRTY_MINUTES = 1000 * 60 * 30
const ONE_MINUTE = 1000 * 15
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
    }, ONE_MINUTE)
  },
  data () {
    return {
      currentHour: "",
      currentMinute: "",
      currentTime: "",
      currentDate: "",
      currentJadwal: null,
      currentKehadiran: null,
      currentValue: 0,
      //  data test
      jam_mulai: "11:30:00",
      jam_selesai: "13:00:00",
      absen: false
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  methods: {
    presensiMahasiswa (index, idStudi, idJadwal) {
      //  belum berhasil, apakah karena libur? bukan nad, salah route.
      PresensiMahasiswa.presensiMahasiswa(idStudi, idJadwal, 181524010)
        .then(response => {
          this.jadwalMhs[index].absen = false
          this.statusKehadiranMahasiswa()
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
          this.currentKehadiran = response
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
    },
    presensiSchedule () {
      if (currentJadwal < this.jadwalMhs.length) {
        var format = "hh:mm:ss"
        var currentTime = moment(this.currentTime, format)
        //  beforetimenya belum kelar, cari tau dlu cara ngurangin jam pake moment, disini before time masih jam awal
        var beforeTime = moment(this.jadwalMhs[currentJadwal].waktu_mulai, format)
        var afterTime = moment(this.jadwalMhs[currentJadwal].waktu_selesai, format)
        this.cekAktivasiTombol(this.jadwalMhs[currentJadwal].id_jadwal)
        if (currentTime.isBetween(beforeTime, afterTime)) {
          if (this.currentKehadiran.isHadir === false && this.currentKehadiran.id_keterangan === null) {
            console.log(currentJadwal)
            this.jadwalMhs[currentJadwal].absen = true
          }
          this.currentValue++
          this.jadwalMhs[currentJadwal].active = true
          console.log("abseeeeennnn")
        } else {
          if (currentTime.isAfter(afterTime)) {
            console.log("kelar")
            this.jadwalMhs[currentJadwal].absen = false
            this.jadwalMhs[currentJadwal].active = false
            console.log(currentJadwal)
            currentJadwal++
          } else {
            console.log("belum waktunya absen")
            this.jadwalMhs[currentJadwal].absen = false
          }
        }
      }
    },
    cekAktivasiTombol (idJadwal) {
      this.statusKehadiranMahasiswa(idJadwal)
    },
    //  untuk keperluan eksplorasi
    setJamAwal () {
      this.jam_mulai = moment(moment().add(7, "minutes"), "hh:mm:ss")
      console.log(this.jam_mulai)
      var now = moment()
      console.log(now)
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
