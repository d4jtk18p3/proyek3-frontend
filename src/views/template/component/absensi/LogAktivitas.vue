<template>
  <v-card height="530" width="350" class="rounded-lg">
    <p class="text-h2 font-weight-bold mr-10 text-right pt-2">Jum'at</p>
    <p class="text-h4 font-weight-bold mr-10 text-right">11:11 am</p>
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

export default {
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
    })
  }
}
</script>
