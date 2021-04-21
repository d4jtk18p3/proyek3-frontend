<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr :style="{background: currentTheme.colorPrimary}">
        <th class="text-center" colspan="2">
          <div :style="tableTitleStyle" class="text-center text-subtitle-2">Jadwal Perkuliahan</div>
        </th>
      </tr>
      </thead>
      <tbody :style="{background: currentTheme.surface}">
      <tr
        v-for="jadwal in jadwalList"
        :key="jadwal.no"
        :style="{pointerEvents: 'none' }"
        align-center
      >
        <td class="text-capitalize text-caption font-weight-light text-left py-2" :style="{color: currentTheme.onSurface}">
          Dosen : {{ jadwal.dosen }}<br/>
          JA - JB : {{ jadwal.ja }} - {{ jadwal.jb }}<br/>
          Teori/Praktek : {{ jadwal.kategori }}<br/>
          Mata Kuliah : {{ jadwal.matkul }}
        </td>
        <td class="text-capitalize text-body-2 font-weight-light text-center" :style="{color: currentTheme.onSurface}">
          <v-btn
            v-if="jadwal.status === 'Terlambat'"
            :color="currentTheme.onError"
            dark
            v-bind="attrs"
            v-on="on"
            width="80"
          >
            <span style="font-size: 10px">{{ jadwal.status }}</span>
          </v-btn>
          <v-btn
            v-else-if="(jadwal.status === 'Hadir') && (jadwal.hadir)"
            :color="currentTheme.colorSecondary"
            dark
            v-bind="attrs"
            v-on="on"
            width="80"
          >
            <span style="font-size: 10px">{{ jadwal.status }}</span>
          </v-btn>
          <v-btn
            v-else-if="(jadwal.status === 'Hadir') && (!jadwal.hadir)"
            color=#2196F3
            dark
            v-bind="attrs"
            v-on="on"
            width="80"
          >
            <span style="font-size: 10px">{{ jadwal.status }}</span>
          </v-btn>
          <v-btn
            v-else
            :color="currentTheme.colorPrimary"
            dark
            v-bind="attrs"
            v-on="on"
            width="80"
          >
            <span style="font-size: 10px">{{ jadwal.status }}</span>
          </v-btn>
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "MhsViewTable",
  props: {
    jadwalList: {
      type: Array,
      required: false,
      default: () => {
        return [
          {
            no: "1",
            dosen: "Urip Teguh Setihatmojo",
            kode: "16TIN6023",
            matkul: "Sistem Terdistribusi",
            kategori: "Teori",
            ja: "1",
            jb: "2",
            jam: "07.00-08.40",
            status: "Terlambat",
            hadir: false
          },
          {
            no: "2",
            dosen: "Setiadi Rachmat",
            kode: "16TIN6023",
            matkul: "Sistem Terdistribusi",
            kategori: "Praktek",
            ja: "3",
            jb: "5",
            jam: "08.40-11.30",
            status: "Hadir",
            hadir: true
          },
          {
            no: "3",
            dosen: "Muhammad Riza",
            kode: "16TIN6023",
            matkul: "Sistem Terdistribusi",
            kategori: "Praktek",
            ja: "3",
            jb: "5",
            jam: "08.40-11.30",
            status: "Hadir",
            hadir: false
          },
          {
            no: "4",
            dosen: "Bambang Wisnuadhi",
            kode: "16TIN6013",
            matkul: "Analisis dan Perancangan Perangkat Lunak 2",
            kategori: "Teori",
            ja: "7",
            jb: "8",
            jam: "13.00-14.40",
            status: "Absensi",
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
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
    tableTitleStyle () {
      return {
        color: this.currentTheme.colorOnPrimary
      }
    }
  }
}
</script>

<style scoped>
</style>
