<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr :style="{background: currentTheme.colorPrimary}">
        <th class="text-center">
          <div :style="tableTitleStyle" class="text-subtitle-2">No</div>
        </th>
        <th class="text-center">
          <div :style="tableTitleStyle" class="text-subtitle-2">Dosen</div>
        </th>
        <th class="text-center">
          <div :style="tableTitleStyle" class="text-subtitle-2">Kode MK</div>
        </th>
        <th class="text-center">
          <div :style="tableTitleStyle" class="text-subtitle-2">Mata Kuliah</div>
        </th>
        <th class="text-center">
          <div :style="tableTitleStyle" class="text-subtitle-2">Teori/Praktek</div>
        </th>
        <th class="text-center">
          <div :style="tableTitleStyle" class="text-subtitle-2">JA</div>
        </th><th class="text-center">
          <div :style="tableTitleStyle" class="text-subtitle-2">JB</div>
        </th>
        <th class="text-center">
          <div :style="tableTitleStyle" class="text-subtitle-2">Jam Perkuliahan</div>
        </th>
        <th class="text-center">
          <div :style="tableTitleStyle" class="text-subtitle-2">Kehadiran</div>
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
        <td class="text-capitalize text-body-2 font-weight-light text-center test" :style="{color: currentTheme.onSurface}">{{ jadwal.no }}</td>
        <td class="text-capitalize text-body-2 font-weight-light text-center" :style="{color: currentTheme.onSurface}">{{ jadwal.dosen }}</td>
        <td class="text-capitalize text-body-2 font-weight-light text-center" :style="{color: currentTheme.onSurface}">{{ jadwal.kode }}</td>
        <td class="text-capitalize text-body-2 font-weight-light text-center" :style="{color: currentTheme.onSurface}">{{ jadwal.matkul }}</td>
        <td class="text-capitalize text-body-2 font-weight-light text-center" :style="{color: currentTheme.onSurface}">{{ jadwal.kategori }}</td>
        <td class="text-capitalize text-body-2 font-weight-light text-center" :style="{color: currentTheme.onSurface}">{{ jadwal.ja }}</td>
        <td class="text-capitalize text-body-2 font-weight-light text-center" :style="{color: currentTheme.onSurface}">{{ jadwal.jb }}</td>
        <td class="text-capitalize text-body-2 font-weight-light text-center" :style="{color: currentTheme.onSurface}">{{ jadwal.jam }}</td>
        <td class="text-capitalize text-body-2 font-weight-light text-center" :style="{color: currentTheme.onSurface}">
          <v-btn
            v-if="jadwal.status === 'Terlambat'"
            :color="currentTheme.onError"
            dark
            v-bind="attrs"
            v-on="on"
            width="100"
          >
            <span style="font-size: 12px">{{ jadwal.status }}</span>
          </v-btn>
          <v-btn
            v-else-if="(jadwal.status === 'Hadir') && (jadwal.hadir)"
            :color="currentTheme.colorSecondary"
            dark
            v-bind="attrs"
            v-on="on"
            width="100"
          >
            <span style="font-size: 12px">{{ jadwal.status }}</span>
          </v-btn>
          <v-btn
            v-else-if="(jadwal.status === 'Hadir') && (!jadwal.hadir)"
            color=#2196F3
            dark
            v-bind="attrs"
            v-on="on"
            width="100"
          >
            <span style="font-size: 12px">{{ jadwal.status }}</span>
          </v-btn>
          <v-btn
            v-else
            :color="currentTheme.colorPrimary"
            dark
            v-bind="attrs"
            v-on="on"
            width="100"
          >
            <span style="font-size: 12px">{{ jadwal.status }}</span>
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
