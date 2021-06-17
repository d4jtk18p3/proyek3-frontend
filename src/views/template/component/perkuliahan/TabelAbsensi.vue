<template>
<v-container>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr :style="{background: currentTheme.colorPrimary}">
        <th class="text-left" v-if="!isMobile">
          <div :style="tableTitleStyle" class="text-subtitle-2">No</div>
        </th>
        <th class="text-left" v-if="!isMobile">
          <div :style="tableTitleStyle" class="text-subtitle-2">NIM</div>
        </th>
        <th class="text-left">
          <div :style="tableTitleStyle" class="text-subtitle-2">Nama</div>
        </th>
        <th class="text-left">
          <div :style="tableTitleStyle" class="text-subtitle-2">Status</div>
        </th>
        <th class="text-left">
          <div :style="tableTitleStyle" class="text-subtitle-2">Jam Absen</div>
        </th>
        <th class="text-left">
          <div :style="tableTitleStyle" class="text-subtitle-2">Edit</div>
        </th>
      </tr>
      </thead>
      <tbody :style="{background: currentTheme.surface}">
      <tr
        v-for="nilai in nilaiList"
        :key="nilai.id"
        >
        <td class="text-capitalize text-caption font-weight-light test" v-if="!isMobile" :style="{color: currentTheme.onSurface}">{{ nilai.id }}</td>
        <td class="text-capitalize text-caption font-weight-light" v-if="!isMobile" :style="{color: currentTheme.onSurface}">{{ nilai.kodeMataKuliah }}</td>
        <td class="text-capitalize text-caption font-weight-light" :style="{color: currentTheme.onSurface}">{{ nilai.namaMataKuliah }}</td>
        <td class="text-capitalize text-caption font-weight-light" :style="{color: currentTheme.onSurface}">{{ nilai.sksMataKuliah }}</td>
        <td class="text-capitalize text-caption font-weight-light" :style="{color: currentTheme.onSurface}">{{ nilai.nilai }}</td>
        <td>
        <v-col><DialogValidasi :dialog[nilai] = "dialog[nilai]"></DialogValidasi>
        </v-col>
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-container>
</template>

<script>
import { mapGetters } from "vuex"
import DialogValidasi from "@/views/template/component/perkuliahan/DialogValidasi"

export default {
  name: "NilaiTable",
  components: { DialogValidasi },
  data () {
    return {
      dialog: [false]
    }
  },
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
