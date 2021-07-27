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
      <v-col v-if="dashboardMhs">
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
          :jmlTidakHadir="dashboardMhs.keteranganSP.totalJamTidakMasuk"
          :sisaMenujuSP="dashboardMhs.keteranganSP.jamTersisa"
          :status="dashboardMhs.keteranganSP.status"/>
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
      <Uploadbukti :username="username"></Uploadbukti>
        </v-flex>
      </v-col>
    </v-row>
    <v-row>
      <AbsenCard :jadwalMhs="jadwalMhs" :username="username"></AbsenCard>
    </v-row>
    <v-overlay :value="isLoading">
    <v-progress-circular
      indeterminate size="32"
     :color="currentTheme.colorSecondary">
    </v-progress-circular>
    </v-overlay>
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
import JadwalMahasiswa from "@/datasource/network/absensi/jadwal"
import Presensi from "@/datasource/network/absensi/PresensiMahasiswa"

// const schedule = require("node-schedule")
const INTERVAL = 1000 * 60 * 60

export default {
  name: "AbsensiMahasiswa",
  components: {
    Uploadbukti,
    Breadcumbs,
    AbsenCard,
    LogAktivitas,
    SakitIzinAlfaItem,
    PersentaseKehadiran,
    TotalJamSP
  },
  created () {
    const tasks = []
    if (this.$route.meta.requiresAuth) {
      tasks.push(this.waitAuthenticated())
    }
    Promise.all(tasks).then(result => {
      this.username = this.identity.preferred_username
      this.isLoading = false
      var current = new Date()
      this.currentDay = current.getDay()
      this.currentDate = current.getFullYear() + "-" + (current.getMonth() + 1) + "-" + current.getDate()
      // this.currentDay = 5
      this.statusKehadiranMahasiswa()
      setTimeout(() => {
        this.getDataDashboardMhs()
        this.getJadwalMhs()
        setInterval(() => {
          this.currentDay = current.getDay()
          this.getDataDashboardMhs()
          // this.currentDay = 5
          this.statusKehadiranMahasiswa()
          this.getJadwalMhs()
          // console.log(this.jadwalMhs)
        }, INTERVAL)
      }, 3000)
    })
  },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Dashboard",
          disabled: false,
          href: ""
        }
      ],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      jadwalMhs: [],
      isIzinDialogShown: true,
      currentDay: null,
      dashboardMhs: null,
      kehadiran: [],
      isLoading: true,
      username: ""
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
    identity: function () {
      return this.$store.getters.identity
    }
  },
  methods: {
  //   itemRowBackground: function (isDark) {
  //     return isDark ? "white" : "black"
  //   }
    getJadwalMhs () {
      this.isLoading = true
      JadwalMahasiswa.getJadwalMahasiswa(this.currentDay, this.username)
        .then(response => {
          response.data.jadwal.forEach(function (element) {
            element.absen = true
            element.active = true
            element.hadir = false
            element.duration = 0
            element.currentDuration = 0
            element.progress = 0
            element.id_jadwal_kedua = 0
            element.id_studi_kedua = 0
          })
          this.jadwalMhs = response.data.jadwal
          setTimeout(() => {
            this.cekMatkulSama()
          }, 3000)
          this.isLoading = false
        })
        .catch(e => {
          console.log(e)
        })
    },
    getDataDashboardMhs () {
      this.isLoading = true
      Presensi.getDashboard(this.username)
        .then(response => {
          this.dashboardMhs = response.data
          this.dashboardMhs.persentaseKehadiran = Math.round(this.dashboardMhs.persentaseKehadiran)
          this.isLoading = false
        })
        .catch(e => {
          console.log(e)
        })
    },
    cekMatkulSama () {
      var i = 0
      var j = 0
      var equal = false

      while (i < this.jadwalMhs.length - 1) {
        if (this.jadwalMhs[i].nama_mata_kuliah === this.jadwalMhs[i + 1].nama_mata_kuliah) {
          if (this.kehadiran[i].id_keterangan == null && this.kehadiran[i + 1].id_keterangan == null) {
            var max = 0
            var min = 0
            if (this.jadwalMhs[i].dosens.length >= this.jadwalMhs[i + 1].dosens.length) {
              max = i
              min = i + 1
            } else {
              max = i + 1
              min = i
            }
            while (j < this.jadwalMhs[min].dosens.length && !equal) {
              var index = this.jadwalMhs[max].dosens.map(function (e) {
                return e.nip
              }).indexOf(this.jadwalMhs[min].dosens[j].nip)
              if (index !== -1) {
                equal = true
              }
              j++
            }
            if (equal) {
              this.jadwalMhs[i].id_jadwal_kedua = this.jadwalMhs[i + 1].id_jadwal
              this.jadwalMhs[i].id_studi_kedua = this.jadwalMhs[i + 1].id_studi
              this.jadwalMhs[i].waktu_selesai = this.jadwalMhs[i + 1].waktu_selesai
              this.jadwalMhs[i].jenis = "TE-PR"
              this.jadwalMhs[i].dosens = this.jadwalMhs[max].dosens
              this.jadwalMhs.splice((i + 1), 1)
              this.kehadiran.splice((i + 1), 1)
            }
            equal = false
            j = 0
          }
        }
        i++
      }
    },
    statusKehadiranMahasiswa () {
      Presensi.getKehadiran(this.username, this.currentDate)
        .then(response => {
          this.kehadiran = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    async waitAuthenticated () {
      return new Promise((resolve) => {
        const unwatch = this.$store.watch(state => {
          return this.$store.getters.identity
        }, value => {
          if (!value) {
            return
          }
          // if (!value.isActive) {
          //   this.$router.replace({ path: "/reset-password" })
          // }
          unwatch()
          resolve()
        }, {
          immediate: true
        })
      })
    }
  }
}

</script>
