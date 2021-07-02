<template>
  <v-card height="530" width="350" class="rounded-lg">
    <p class="text-h4 font-weight-bold mr-10 text-right pt-2">{{ getDay }}</p>
    <p class="text-h5 font-weight-bold mr-10 text-right">{{ currentHour }}:{{ currentMinute }}</p>
    <v-timeline dense>
      <v-timeline-item
      class="pr-2"
        small
          v-for="(item,index) in jadwalDsn"
          :key="index">
        {{ item.mata_kuliah.nama_mata_kuliah }}<br>
          Absen: {{ item.waktu_mulai.slice(0,5) }}
      </v-timeline-item>
    </v-timeline>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"

const ONE_HOURS = 1000 * 60 * 60

export default {
  created () {
    var current = new Date()
    this.currentDay = current.getDay()
    setInterval(() => {
      current = new Date()
      this.currentDay = current.getDay()
    }, ONE_HOURS)

    this.currentTime = current.getHours() + ":" + current.getMinutes()
    this.currentHour = current.getHours()
    this.currentHour = ("0" + this.currentHour).slice(-2)
    setInterval(() => {
      current = new Date()
      this.currentHour = current.getHours()
      this.currentHour = ("0" + this.currentHour).slice(-2)
    }, 1000)
    this.currentMinute = current.getMinutes()
    this.currentMinute = ("0" + this.currentMinute).slice(-2)
    setInterval(() => {
      current = new Date()
      this.currentMinute = current.getMinutes()
      this.currentMinute = ("0" + this.currentMinute).slice(-2)
    }, 1000)
  },
  data () {
    return {
      currentTime: "",
      currentHour: "",
      currentMinute: "",
      currentDay: null
    }
  },
  name: "LogAktivitas",

  props: {
    jadwalDsn: {
      type: Array,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    getDay () {
      switch (this.currentDay) {
        case 1:
          var currentDay = "Senin"
          break
        case 2:
          currentDay = "Selasa"
          break
        case 3:
          currentDay = "Rabu"
          break
        case 4:
          currentDay = "Kamis"
          break
        case 5:
          currentDay = "Jumat"
          break
        case 6:
          currentDay = "Sabtu"
          break
        case 0:
          currentDay = "Minggu"
          break
      }
      return currentDay
    }
  }
}
</script>
