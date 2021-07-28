<template>
  <v-container>
    <v-row :style="{ color: currentTheme.onBackground }">
      <v-col>
        <p class="text-h4 font-weight-bold">Halaman Dosen</p>
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
          <LogAktivitas :jadwalDsn="jadwalDsn"></LogAktivitas>
      </v-col>
      <v-col cols="5">
        <PersentaseMengajar :persentaseMengajar="persentaseMengajar"></PersentaseMengajar>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4.2">
        <p class="text-h4 font-weight-bold mr-6">Absensi Perkuliahan</p>
      </v-col>
    </v-row>
    <v-row>
      <AbsenCardDosen :jadwalDsn="jadwalDsn" :username="username"></AbsenCardDosen>
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
import AbsenCardDosen from "@/views/absensi/component/dosen/AbsenCardDosen"
import LogAktivitas from "@/views/absensi/component/dosen/LogAktivitasDosen"
import PersentaseMengajar from "@/views/absensi/component/dosen/PersentaseMengajar"
import JadwalDosen from "@/datasource/network/absensi/jadwalDosen"
import DashboardDosen from "@/datasource/network/absensi/dashboardDosen"

// const schedule = require("node-schedule")
const INTERVAL = 1000 * 60 * 60

export default {
  name: "AbsensiDosen",
  components: {
    AbsenCardDosen,
    LogAktivitas,
    PersentaseMengajar
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
      setTimeout(() => {
        this.getJadwalDsn()
      }, 3000)
      this.getPersentaseMengajar()
      setInterval(() => {
        this.currentDay = current.getDay()
        this.getJadwalDsn()
        this.getPersentaseMengajar()
      }, INTERVAL)
    })
  },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Dashboard",
          disabled: true,
          href: ""
        }
      ],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      jadwalDsn: [],
      persentaseMengajar: [],
      currentDay: null,
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
    getJadwalDsn () {
      JadwalDosen.getJadwalDosen(this.currentDay, this.identity.preferred_username)
        .then(response => {
          response.data.jadwal.forEach(function (element) {
            element.absen = false
            element.active = true
            element.hadir = false
            element.duration = 0
            element.currentDuration = 0
            element.progress = 0
            element.id_jadwal_kedua = 0
            element.id_studi_kedua = 0
          })
          this.jadwalDsn = response.data.jadwal
          setTimeout(() => {
            this.cekMatkulSama()
          }, 3000)
          this.isLoading = false
        })
        .catch(e => {
          console.log(e)
        })
    },
    getPersentaseMengajar () {
      DashboardDosen.persentaseMengajar(this.identity.preferred_username)
        .then(response => {
          this.persentaseMengajar = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    cekMatkulSama () {
      var i = 0

      while (i < this.jadwalDsn.length - 1) {
        if (this.jadwalDsn[i].mata_kuliah.nama_mata_kuliah === this.jadwalDsn[i + 1].mata_kuliah.nama_mata_kuliah) {
          this.jadwalDsn[i].id_jadwal_kedua = this.jadwalDsn[i + 1].id_jadwal
          this.jadwalDsn[i].id_studi_kedua = this.jadwalDsn[i + 1].id_studi
          this.jadwalDsn[i].waktu_selesai = this.jadwalDsn[i + 1].waktu_selesai
          this.jadwalDsn[i].jenis = "TE-PR"
          this.jadwalDsn.splice((i + 1), 1)
        }
        i++
      }
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
