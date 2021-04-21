<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="1" @click="toPrev">
          <div class="text-h6">&lt;</div>
        </v-col>
        <v-col>
          <div class="text-center text-h6">Semester {{ items[currentIndex].semester }}</div>
        </v-col>
        <v-col class="text-h6" cols="1" @click="toNext">
          <div>&gt;</div>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="5" offset="1">
      <IPCard :ip-semester="items[currentIndex].ipSemester"/>
    </v-col>
    <v-col cols="5">
      <SKSCard :sks-semester="items[currentIndex].jumlahSKS"/>
    </v-col>
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
  name: "DetailNilaiMobile",
  components: {
    SKSCard,
    IPCard,
    NilaiTable
  },
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
            semester: "Sem-1",
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
    toNext () {
      const nextIndex = this.currentIndex + 1
      if (nextIndex === this.items.length) {
        this.currentIndex = 0
      } else {
        this.currentIndex = nextIndex
      }
    },
    toPrev () {
      const nextIndex = this.currentIndex - 1
      if (nextIndex < 0) {
        this.currentIndex = this.items.length - 1
      } else {
        this.currentIndex = nextIndex
      }
      console.log(this.currentIndex)
    }
  }
}
</script>

<style scoped>

</style>
