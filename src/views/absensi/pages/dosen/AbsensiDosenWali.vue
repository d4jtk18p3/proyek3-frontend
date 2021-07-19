<template>
  <v-container>
    <v-row :style="{ color: currentTheme.onBackground }">
      <v-col>
        <p class="text-h4 font-weight-bold">Halaman Dosen</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <breadcumbs :breadcrumb-items="breadcrumbItems" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <p class="text-h4 font-weight-bold">Dashboard</p>
      </v-col>
      <v-col cols="10">
        <v-divider
        class="mt-5 ml-15"
        ></v-divider>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="4">
          <LogAktivitas :jadwalDsn="jadwalDsn"></LogAktivitas>
      </v-col>
      <v-col cols="4">
        <PersentaseMengajar :persentaseMengajar="persentaseMengajar"></PersentaseMengajar>
      </v-col>
      <v-col cols="4">
       <h2 align="center" class="text-h5 font-weight-bold">Validasi Ketidakhadiran</h2>
      <DaftarHadir :ketidakhadiran="ketidakhadiran">
      </DaftarHadir>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4.2">
        <p class="text-h4 font-weight-bold mr-6">Absensi Perkuliahan</p>
      </v-col>
    </v-row>
    <v-row>
      <AbsenCardDosen :jadwalDsn="jadwalDsn"></AbsenCardDosen>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import AbsenCardDosen from "@/views/absensi/component/dosen/AbsenCardDosen"
import LogAktivitas from "@/views/absensi/component/dosen/LogAktivitasDosen"
import PersentaseMengajar from "@/views/absensi/component/dosen/PersentaseMengajar"
import JadwalDosen from "@/datasource/network/absensi/jadwalDosen"
import DashboardDosen from "@/datasource/network/absensi/dashboardDosen"
import DaftarHadir from "@/views/absensi/component/ketidakhadiran/DaftarHadir"
const schedule = require("node-schedule")

export default {
  name: "AbsensiDosen",
  components: {
    Breadcumbs,
    AbsenCardDosen,
    LogAktivitas,
    PersentaseMengajar,
    DaftarHadir
  },
  created () {
    var current = new Date()
    this.currentDay = current.getDay()
    this.getJadwalDsn()
    this.getPersentaseMengajar()
    schedule.scheduleJob("0 0 0 * * *", function () {
      this.currentDay = current.getDay()
      this.getJadwalDsn()
      console.log(this.jadwalDsn)
    })
  },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Dashboard",
          disabled: false,
          href: ""
        },
        {
          text: "Link 1",
          disabled: false,
          href: ""
        },
        {
          text: "Link 2",
          disabled: true,
          href: ""
        }
      ],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      jadwalDsn: [],
      persentaseMengajar: [],
      currentDay: null,
      kelas: 1803
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  },
  methods: {
    getJadwalDsn () {
      JadwalDosen.getJadwalDosen(this.currentDay, 196610181995121000)
        .then(response => {
          response.data.jadwal.forEach(function (element) {
            element.absen = "false"
            element.active = "true"
            element.hadir = "false"
            element.duration = 0
            element.currentDuration = 0
            element.progress = 0
          })
          this.jadwalDsn = response.data.jadwal
          console.log(response.data.jadwal)
        })
        .catch(e => {
          console.log(e)
        })
    },
    getPersentaseMengajar () {
      DashboardDosen.persentaseMengajar(196610181995121000)
        .then(response => {
          this.persentaseMengajar = response.data
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}

</script>
