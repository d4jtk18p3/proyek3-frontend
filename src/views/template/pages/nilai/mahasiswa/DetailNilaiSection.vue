<template>
  <div>
    <detail-nilai-dekstop v-if="!isMobile" :items="items"/>
    <detail-nilai-mobile v-else :items="items"/>
  </div>
</template>

<script>
import DetailNilaiDekstop from "@/views/template/pages/nilai/mahasiswa/DetailNilaiDekstop"
import DetailNilaiMobile from "@/views/template/pages/nilai/mahasiswa/DetailNilaiMobile"
export default {
  name: "DetailNilaiSection",
  components: { DetailNilaiMobile, DetailNilaiDekstop },
  props: {
    items: {
      type: Array,
      required: false,
      default: () => {
        return [
          {
            semester: "1",
            ipSemester: "3.98",
            jumlahSKS: "32",
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
                id: "5",
                kodeDosen: "KO007N",
                kodeMataKuliah: "16TIN10003",
                namaMataKuliah: "Komputer Grafik",
                sksMataKuliah: 3,
                nilai: "A"
              }
            ]
          },
          {
            semester: "2",
            ipSemester: "4.0",
            jumlahSKS: "28",
            nilaiList: [
              {
                id: "1",
                kodeDosen: "KO009N",
                kodeMataKuliah: "16TIN10015",
                namaMataKuliah: "Bahasa Inggris",
                sksMataKuliah: 3,
                nilai: "A"
              },
              {
                id: "2",
                kodeDosen: "KO010N",
                kodeMataKuliah: "16TIN10013",
                namaMataKuliah: "Analisis Perancangan Perangkat Lunak",
                sksMataKuliah: 2,
                nilai: "B"
              },
              {
                id: "3",
                kodeDosen: "KO011N",
                kodeMataKuliah: "16TIN10008",
                namaMataKuliah: "Dasar pemrograman",
                sksMataKuliah: 4,
                nilai: "A"
              },
              {
                id: "4",
                kodeDosen: "KO012N",
                kodeMataKuliah: "16TIN10007",
                namaMataKuliah: "Proyek 2",
                sksMataKuliah: 4,
                nilai: "A"
              },
              {
                id: "5",
                kodeDosen: "KO013N",
                kodeMataKuliah: "16TIN10004",
                namaMataKuliah: "Software Testing",
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
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  }
}
</script>

<style scoped>

</style>
