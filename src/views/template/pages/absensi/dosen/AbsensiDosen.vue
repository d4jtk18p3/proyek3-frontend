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
      <v-col cols="5">
          <LogAktivitas :jadwalDsn="jadwalDsn"></LogAktivitas>
      </v-col>
      <v-col cols="5">
        <PersentaseMengajar></PersentaseMengajar>
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
import AbsenCardDosen from "@/views/template/component/absensi/AbsenCardDosen"
import LogAktivitas from "@/views/template/component/absensi/LogAktivitas"
import PersentaseMengajar from "@/views/template/component/absensi/PersentaseMengajar"
import JadwalDosen from "../../../../../datasource/api/absensi/jadwalDosen"

const schedule = require("node-schedule")

export default {
  name: "AbsensiDosen",
  components: {
    Breadcumbs,
    AbsenCardDosen,
    LogAktivitas,
    PersentaseMengajar
  },
  created () {
    var current = new Date()
    this.currentDay = current.getDay()
    this.getJadwalDsn()
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
      currentDay: null
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
      JadwalDosen.getJadwalDosen(this.currentDay, 11113)
        .then(response => {
          // response.data.jadwal.forEach(function (element) {
          //   element.absen = "false"
          // })
          this.jadwalDsn = response.result
          console.log(response.result)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}

</script>
