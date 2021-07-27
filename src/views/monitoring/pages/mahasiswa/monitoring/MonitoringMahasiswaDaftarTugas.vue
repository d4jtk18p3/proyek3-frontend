<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Monitoring Tugas</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col cols="9">
    <div v-for="Tugas in listTugas"
        :key="Tugas.id">
      <v-card
          class="pa-3 mt-2 ml-3 rounded-card rounded-lg"
          elevation="2"
          width="700"
          v-if="show"
          :style="{background: isDark ? currentTheme.surface: currentTheme.colorOnPrimary}"
      >
          <v-row>
              <v-col cols="4">
                  <div class="text-h7 font-weight-bold ml-2 mt-1" :style="{color : isDark ? currentTheme.colorOnPrimary : currentTheme.onSurface}">{{Tugas.namaTugas}}</div>
                  <div class="caption font-weight-medium font-italic ml-2" :style="{color : isDark ? currentTheme.colorOnPrimary : currentTheme.onSurface}">{{Tugas.jumlahSubTask}} Sub Task</div>
              </v-col>
              <v-col cols="3">
                <div class="caption font-weight-medium font-italic ml-2 mt-4" :style="{color : isDark ? currentTheme.colorOnPrimary : currentTheme.onSurface}">{{Tugas.subtask}}</div>
              </v-col>
              <v-col cols="2">
                <div class="caption font-weight-medium mt-4" :style="{color : isDark ? currentTheme.colorOnPrimary : currentTheme.onSurface}" v-if="adaTenggat">{{Tugas.tenggat}}</div>
              </v-col>
              <v-col
                  md="2"
                  class="pl-9 ml-auto"
              >
                  <v-progress-circular
                      :rotate="90"
                      :size="50"
                      :width="5"
                      :value="Tugas.progress"
                      color="red"
                  >
                      <div class="text-h7 font-weight-bold" :style="{color : currentTheme.onSurface}">{{Tugas.progress}}</div>
                  </v-progress-circular>
              </v-col>
          </v-row>
      </v-card>
    </div>
    </v-col>
    <v-col cols="2">
      <v-card
          class="pa-3 mt-2 rounded-card rounded-lg"
          color="#E3F6F5"
          elevation="0"
          width="300"
          height="160"
      >
        <p class="text-h5 font-weight-bold text-center">Progress Tugas</p>
        <p class="text-h3 font-weight-bold text-center">{{progressTugas}}%</p>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import Dashboard from "../../../../../datasource/network/monitoring/dashboard"
import MonitoringBersama from "../../../../../datasource/network/monitoring/monitoringbersama"

export default {
  name: "Dashboard",
  components: { Breadcumbs },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Dashboard",
          disabled: false,
          href: "/monitoring/mahasiswa/dashboard"
        },
        {
          text: "Daftar Tugas",
          disabled: false,
          href: ""
        }
      ],
      listTugas: [
      ],
      listProgress: [],
      progress: 0,
      show: true,
      adaTenggat: false,
      progressTugas: 0
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
  async mounted () {
    var tugas = await Dashboard.getAllTugas(this.identity.preferred_username)
    var x = 0
    var totalProgress = 0
    while (x < tugas.length) {
      var items = await MonitoringBersama.getSubTugasbyMahasiswa(tugas[x].id, this.identity.preferred_username)
      var i = 0
      var progress = 0
      var tenggat
      var sebelum = new Date()
      let countTidakAdaTenggat = 0
      var hariIni = new Date()
      while (i < items.length) {
        if (items[i].status_subtugas === false) { // ===
          if (items[i].tenggat !== null) {
            var temp = new Date(items[i].tenggat)
            if (temp >= hariIni) {
              this.show = true
              this.adaTenggat = true
              if (tenggat == null) {
                tenggat = new Date(temp)
                sebelum = new Date(items[i].tenggat)
              } else if (sebelum > temp) {
                tenggat = new Date(temp)
              }
            }
          } else {
            countTidakAdaTenggat += 1
          }
          if (countTidakAdaTenggat === 0 && this.adaTenggat === false) {
            this.show = false
          }
        }
        if (items[i].progress !== null) {
          progress = progress + items[i].progress // menjumlahkan jumlah progress setiap sub tugas
        }
        i++
      }
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      var hasil = (tenggat.getDate()) + (" " + (monthNames[tenggat.getMonth()])) + (" " + (tenggat.getFullYear()))
      this.listTugas.push({
        namaTugas: tugas[x].nama_tugas,
        progress: Math.floor(progress / items.length),
        jumlahSubTask: items.length,
        tenggat: hasil
      })
      tenggat = null
      totalProgress += progress / items.length
      x++
    }
    this.progressTugas = Math.floor(totalProgress / tugas.length)
  }
}
</script>
