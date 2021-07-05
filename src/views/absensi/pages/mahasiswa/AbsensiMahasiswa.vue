<template>
  <v-container>
    <v-row :style="{ color: currentTheme.onBackground }">
      <v-col>
        <p class="text-h4 font-weight-bold">Absensi</p>
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
      <v-col cols="5">
          <LogAktivitas :jadwalMhs="jadwalMhs"></LogAktivitas>
      </v-col>
      <v-col>
          <SakitIzinAlfaItem
            :sakit="dashboardMhs.jumlahJamSakit"
            :izin="dashboardMhs.jumlahJamIzin"
            :alfa="dashboardMhs.jumlahJamAlfa"/>
          <v-layout row>

          <v-flex>
          <PersentaseKehadiran
          :kehadiran="dashboardMhs.persentaseKehadiran"
          :jmlJam="dashboardMhs.jumlahJamHadir"/>
          </v-flex>
          <v-flex>
          <TotalJamSP
          :jmlTidakHadir="dashboardMhs.totalJamTidakMasuk"
          :sisaMenujuSP="dashboardMhs.jamTersisaUntukSP1"/>
          </v-flex>
          </v-layout>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4.2">
        <p class="text-h4 font-weight-bold mr-6">Absensi Perkuliahan</p>
      </v-col>
      <v-col cols="3">
        <v-divider
        class="mt-5"
        ></v-divider>
      </v-col>
      <v-col cols="4">
      <v-flex>
      <Uploadbukti2></Uploadbukti2>
      <Uploadbukti></Uploadbukti>
        </v-flex>
      </v-col>
    </v-row>
    <v-row>
      <AbsenCard :jadwalMhs="jadwalMhs"></AbsenCard>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import AbsenCard from "@/views/absensi/component/mahasiswa/AbsenCard"
import LogAktivitas from "@/views/absensi/component/mahasiswa/LogAktivitas"
import SakitIzinAlfaItem from "@/views/absensi/component/mahasiswa/SakitIzinAlfaItem"
import PersentaseKehadiran from "@/views/absensi/component/mahasiswa/PersentaseKehadiran"
import TotalJamSP from "@/views/absensi/component/mahasiswa/TotalJamSP"
import Uploadbukti from "@/views/absensi/component/mahasiswa/UploadBuktiMhs"
import Uploadbukti2 from "@/views/absensi/component/mahasiswa/UploadBuktiMhs2"
import JadwalMahasiswa from "@/datasource/network/absensi/jadwal"
import Presensi from "@/datasource/network/absensi/PresensiMahasiswa"

const schedule = require("node-schedule")

export default {
  name: "AbsensiMahasiswa",
  components: {
    Uploadbukti,
    Uploadbukti2,
    Breadcumbs,
    AbsenCard,
    LogAktivitas,
    SakitIzinAlfaItem,
    PersentaseKehadiran,
    TotalJamSP
  },
  created () {
    var current = new Date()
    this.currentDay = current.getDay()
    this.getJadwalMhs()
    this.getDataDashboardMhs()
    schedule.scheduleJob("0 0 0 * * *", function () {
      this.currentDay = current.getDay()
      this.getJadwalMhs()
      console.log(this.jadwalMhs)
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
      jadwalMhs: [],
      isIzinDialogShown: true,
      currentDay: null,
      dashboardMhs: null
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
  //   itemRowBackground: function (isDark) {
  //     return isDark ? "white" : "black"
  //   }
    getJadwalMhs () {
      JadwalMahasiswa.getJadwalMahasiswa(this.currentDay, 181524010)
        .then(response => {
          response.data.jadwal.forEach(function (element) {
            element.absen = "false"
            element.active = "false"
            element.hadir = "false"
            element.value = 0
          })
          this.jadwalMhs = response.data.jadwal
          console.log(this.currentDay + " : " + response.data.jadwal)
        })
        .catch(e => {
          console.log(e)
        })
    },
    getDataDashboardMhs () {
      Presensi.getDashboard(181524010)
        .then(response => {
          console.log("-DASHBOARD MAHASISWA-")
          console.log(response.data)
          this.dashboardMhs = response.data
          this.dashboardMhs.persentaseKehadiran = Math.round(this.dashboardMhs.persentaseKehadiran)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}

</script>
