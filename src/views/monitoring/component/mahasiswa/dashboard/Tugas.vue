<template>
    <v-col >
    <v-card
      class="pa-3 rounded-card rounded-lg"
      elevation="2"
      v-if="show"
      :style="{background: isDark ? currentTheme.surface: currentTheme.colorOnPrimary}"
    >
        <v-row >
            <v-col>
                <div class="caption font-weight-medium" :style="{color : isDark ? currentTheme.colorOnPrimary : currentTheme.onSurface}" v-if="adaTenggat">{{this.tenggat}}</div>
                <div class="text-h7 font-weight-bold ml-2" :style="{color : isDark ? currentTheme.colorOnPrimary : currentTheme.onSurface}">{{ tugas }}</div>
                <div class="caption font-weight-medium font-italic ml-2" :style="{color : isDark ? currentTheme.colorOnPrimary : currentTheme.onSurface}">{{this.jumlahSubTask}} Sub-Task</div>
            </v-col>
            <v-col
                cols="auto"
                md="3"
                class="ml-auto mt-1"
            >
                <v-progress-circular
                    :rotate="90"
                    :size="50"
                    :width="5"
                    :value="this.progress"
                    color="red"
                >
                    <div class="text-h7 font-weight-bold" :style="{color : isDark ? currentTheme.colorOnPrimary : currentTheme.onSurface}">{{progress}}%</div>
                </v-progress-circular>
            </v-col>
        </v-row>
    </v-card>
    </v-col>
</template>

<script>
import { mapGetters } from "vuex"
import SubTugasMonitoringBersama from "../../../../../datasource/network/monitoring/monitoringbersama"

export default {
  name: "Tugas",
  components: {},
  props: {
    tugas: {
      type: String,
      required: false,
      default: "Model Data Teori"
    },
    id: {
      type: Number,
      required: false,
      default: 1
    }
  },
  data () {
    return {
      jumlahSubTask: 0,
      progress: 0,
      tenggat: "",
      show: true,
      adaTenggat: false
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
  async mounted () {
    var items = await SubTugasMonitoringBersama.getSubTugasbyMahasiswa(this.id, "181524002")
    var i = 0
    var progress = 0
    var tenggat = new Date()
    while (i < items.length) {
      if (items[i].progress !== null) {
        progress = progress + items[i].progress // menjumlahkan jumlah progress setiap sub tugas
      }
      i++
    }
    i = 0
    var sebelum = new Date()
    let countTidakAdaTenggat = 0
    // var deadlineAkhir = new Date()
    var hariIni = new Date()
    while (i < items.length) {
      if (items[i].status_subtugas === false) { // ===
        if (items[i].tenggat !== null) {
          var temp = new Date(items[i].tenggat)
          if (temp >= hariIni) {
            console.log(temp)
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
      i++
    }
    this.jumlahSubTask = items.length
    this.progress = Math.ceil(progress / items.length)
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var hasil = (tenggat.getDate()) + (" " + (monthNames[tenggat.getMonth()])) + (" " + (tenggat.getFullYear()))
    this.tenggat = hasil
  }
}
</script>
