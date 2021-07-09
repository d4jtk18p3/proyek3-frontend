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
            <div>
              <v-card-actions class="justify-center">
                <v-btn
                  :disabled="statusKehadiranMahasiswa(item.id_jadwal)"
                  elevation="2"
                  rounded
                  class="ma-5"
                  color="#4CAF50"
                  width="120"
                  @click="presensiDosen(index, item.id_studi, item.id_jadwal)"
                > Hadir</v-btn>
              </v-card-actions>
            </div>
            <div>
              <v-card-actions class="justify-center">
                <v-btn
                  @click="toPerkuliahan(index, item)"
                  elevation="2"
                  rounded
                  class="mb-5 pt-0"
                  width="150"
                  color="#FB8C00"
                > Perkuliahan</v-btn>
              </v-card-actions>
            </div>
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
    toPerkuliahan (index, item) {
      console.log(index)
      this.$router.push({ name: "Perkuliahan", params: { item } })
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
