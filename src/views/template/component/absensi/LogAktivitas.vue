<template>
  <v-card height="530" width="350" class="rounded-lg">
    <p class="text-h2 font-weight-bold mr-10 text-right pt-2">{{ getDay }}</p>
    <p class="text-h4 font-weight-bold mr-10 text-right">{{ currentTime }}</p>
    <v-timeline dense>
      <v-timeline-item
      class="pr-2"
        small
          v-for="item in jadwalList"
          :key="item">
        {{ item.matkul }}<br>
          Absen: {{ item.ja }}
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
    setInterval(() => {
      current = new Date()
      this.currentTime = current.getHours() + ":" + current.getMinutes()
    }, 60000)
  },
  data () {
    return {
      currentTime: "",
      currentDay: null
    }
  },
  name: "LogAktivitas",

  props: {
    jadwalList: {
      type: Array,
      required: false,
      default: () => {
        return [
          {
            dosen: "Urip Teguh Setihatmojo",
            kode: "#16TIN6023",
            matkul: "Sistem Terdistribusi",
            kategori: "Teori",
            ja: "7.00",
            jb: "2",
            absen: true,
            hadir: false
          },
          {
            dosen: "Setiadi Rachmat",
            kode: "#16TIN6023",
            matkul: "Sistem Terdistribusi",
            kategori: "Praktek",
            ja: "8.00",
            jb: "5",
            absen: false,
            hadir: true
          },
          {
            dosen: "Bambang Wisnuadhi",
            kode: "#16TIN6013",
            matkul: "Analisis dan Perancangan Perangkat Lunak 2",
            kategori: "Teori",
            ja: "9.00",
            jb: "5",
            absen: false,
            hadir: false
          },
          {
            dosen: "Bambang Wisnuadhi",
            kode: "#16TIN6013",
            matkul: "Analisis dan Perancangan Perangkat Lunak 2",
            kategori: "Praktek",
            ja: "10.00",
            jb: "8",
            absen: false,
            hadir: false
          }
        ]
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
        case 7:
          currentDay = "Minggu"
          break
      }
      return currentDay
    }
  }
}
</script>
