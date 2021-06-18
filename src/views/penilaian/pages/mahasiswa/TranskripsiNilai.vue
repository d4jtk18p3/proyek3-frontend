<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Transkripsi Nilai</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col cols="12">
    </v-col>
    <v-col cols="2" class="py-0">
      <p class="text-h7">Nama Mahasiswa </p>
    </v-col>
    <v-col cols="10" class="py-0">
      <p class="text-h7">: {{DataMahasiswa.Nama}}</p>
    </v-col>
    <v-col cols="2" class="py-0">
      <p class="text-h7" > NIM </p>
    </v-col>
    <v-col cols="10" class="py-0">
      <p class="text-h7"> : {{DataMahasiswa.Nim}}</p>
    </v-col>
    <v-col cols="2" class="py-0">
      <p class="text-h7"> Program Studi </p>
    </v-col>
    <v-col cols="10" class="py-0">
      <p class="text-h7"> : {{DataMahasiswa.Prodi}}</p>
    </v-col>
    <v-col cols="12">
        <NilaiTable/>
    </v-col>
     <v-col cols="2" class="py-0">
      <p class="text-h7"> Jumlah Mata Kuliah </p>
    </v-col>
    <v-col cols="10" class="py-0">
      <p class="text-h7">: 10 </p>
    </v-col>
    <v-col cols="2" class="py-0">
      <p class="text-h7" > Jumlah SKS </p>
    </v-col>
    <v-col cols="10" class="py-0">
      <p class="text-h7"> : 20 </p>
    </v-col>
    <v-col cols="2" class="py-0">
      <p class="text-h7"> IPK </p>
    </v-col>
    <v-col cols="10" class="py-0">
      <p class="text-h7"> : 4</p>
    </v-col>
    <v-col cols="9">
    </v-col>
    <v-col cols="2">
        <v-btn color="#2196F3" elevation="2" class="white--text" depressed @click="SavePDF()">Simpan Sebagai PDF</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import NilaiTable from "@/views/template/component/nilai/NilaiTable.vue"

export default {
  name: "DashboardMain",
  components: { Breadcumbs, NilaiTable },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Penilaian",
          disabled: false,
          href: ""
        },
        {
          text: "Dashboard Mahasiswa",
          disabled: false,
          href: ""
        },
        {
          text: "Transkripsi Nilai",
          disabled: false,
          href: ""
        }
      ],
      DataMahasiswa: {
        Nama: "Angelina Aiofera",
        Prodi: "D4 - Teknik Informatika",
        Nim: 181524000
      },
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
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  },
  methods: {
    test (mhsNilai) {
      console.log(mhsNilai)
    },
    SavePDF () {
      console.log("SimpanKePDF")
    }
  }
}
</script>
