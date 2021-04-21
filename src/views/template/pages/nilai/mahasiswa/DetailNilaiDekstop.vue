<template>
  <v-row>
    <v-col cols="12">
      <v-btn
        v-for="(item, index) in items"
        :key="item.semester"
        :color="index === currentIndex ? '#64626F' : currentTheme.colorPrimary"
        @click="setCurerntIndex(index)"
        :class="index !== 0 ? 'ml-3' : ''"
      >
        <div :style="{color: index === currentIndex ? 'white' : currentTheme.colorOnPrimary}">SEM - {{ item.semester }}</div>
      </v-btn>
    </v-col>
    <v-col xs="3" sm="3" md="3" lg="2" xl="2">
      <IPCard :ip-semester="items[currentIndex].ipSemester" />
    </v-col>
    <v-col xs="3" sm="3" md="3" lg="2" xl="2">
      <SKSCard :sks-semester="items[currentIndex].jumlahSKS"/>
    </v-col>
    <v-col cols="8"/>
    <v-col cols="12">
      <nilai-table :nilai-list="items[currentIndex].nilaiList"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import NilaiTable from "@/views/template/component/nilai/NilaiTable"
import IPCard from "@/views/template/component/nilai/IPCard"
import SKSCard from "@/views/template/component/nilai/SKSCard"

export default {
  name: "DetailNilaiDekstop",
  components: { SKSCard, IPCard, NilaiTable },
  data () {
    return {
      currentIndex: 0
    }
  },
  props: {
    items: {
      type: Array,
      required: false,
      default: () => {
        return [
          {
            semester: "1",
            ipSemester: "4.0",
            jumlahSKS: "53",
            nilaiList: [
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
                id: "4",
                kodeDosen: "KO007N",
                kodeMataKuliah: "16TIN10003",
                namaMataKuliah: "Komputer Grafik",
                sksMataKuliah: 3,
                nilai: "A"
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  methods: {
    setCurerntIndex (index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>

</style>
