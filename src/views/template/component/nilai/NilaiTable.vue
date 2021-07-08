<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr :style="{background: currentTheme.colorPrimary}">
        <th class="text-left" v-if="!isMobile">
          <div :style="tableTitleStyle" class="text-subtitle-2">Kode Dosen</div>
        </th>
        <th class="text-left" v-if="!isMobile">
          <div :style="tableTitleStyle" class="text-subtitle-2">Kode MK</div>
        </th>
        <th class="text-left">
          <div :style="tableTitleStyle" class="text-subtitle-2">Mata Kuliah</div>
        </th>
        <th class="text-left">
          <div :style="tableTitleStyle" class="text-subtitle-2">SKS</div>
        </th>
        <th class="text-left">
          <div :style="tableTitleStyle" class="text-subtitle-2">Nilai</div>
        </th>
      </tr>
      </thead>
      <tbody :style="{background: currentTheme.surface}">
      <tr
        v-for="nilai in nilaiList"
        :key="nilai.id"
        :style="{pointerEvents: 'none' }"
      >
        <td class="text-capitalize text-caption font-weight-light" v-if="!isMobile" :style="{color: currentTheme.onSurface}">{{ nilai.kodeDosen }}</td>
        <td class="text-capitalize text-caption font-weight-light" v-if="!isMobile" :style="{color: currentTheme.onSurface}">{{ nilai.kodeMataKuliah }}</td>
        <td class="text-capitalize text-caption font-weight-light" :style="{color: currentTheme.onSurface}">{{ nilai.namaMataKuliah }}</td>
        <td class="text-capitalize text-caption font-weight-light" :style="{color: currentTheme.onSurface}">{{ nilai.sksMataKuliah }}</td>
        <td class="text-capitalize text-caption font-weight-light" :style="{color: currentTheme.onSurface}">{{ nilai.nilai }}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "NilaiTable",
  props: {
    nilaiList: {
      type: Array,
      required: false,
      default: () => {
        return [
          {
            id: "1",
            kodeDosen: "KO005N",
            kodeMataKuliah: "16TIN10000",
            namaMataKuliah: "Struktur Data dan Algoritma",
            sksMataKuliah: 3,
            nilai: "A"
          },
          {
            id: "2",
            kodeDosen: "KO005N",
            kodeMataKuliah: "16TIN10001",
            namaMataKuliah: "Analisis Perancangan Perangkat Lunak",
            sksMataKuliah: 3,
            nilai: "A"
          },
          {
            id: "3",
            kodeDosen: "KO006N",
            kodeMataKuliah: "16TIN10002",
            namaMataKuliah: "Perancangan Antar Muka",
            sksMataKuliah: 4,
            nilai: "A"
          },
          {
            id: "4",
            kodeDosen: "KO007N",
            kodeMataKuliah: "16TIN10003",
            namaMataKuliah: "Proyek 3",
            sksMataKuliah: 4,
            nilai: "A"
          },
          {
            id: "5",
            kodeDosen: "KO007N",
            kodeMataKuliah: "16TIN10003",
            namaMataKuliah: "Komputer Grafik",
            sksMataKuliah: 3,
            nilai: "A"
          },
          {
            id: "6",
            kodeDosen: "KO007N",
            kodeMataKuliah: "16TIN10003",
            namaMataKuliah: "Komputer Grafik",
            sksMataKuliah: 3,
            nilai: "A"
          },
          {
            id: "7",
            kodeDosen: "KO007N",
            kodeMataKuliah: "16TIN10003",
            namaMataKuliah: "Komputer Grafik",
            sksMataKuliah: 3,
            nilai: "A"
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
