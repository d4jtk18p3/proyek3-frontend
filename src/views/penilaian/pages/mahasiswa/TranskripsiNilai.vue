<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-row :style="{color: currentTheme.onBackground}">
      <v-col cols="12">
        <p class="text-h4 font-weight-bold">Transkripsi Nilai</p>
      </v-col>
      <v-col cols="12">
        <breadcumbs :breadcrumb-items="breadcrumbItems"/>
      </v-col>
    </v-row>
    <v-row :style="{color: currentTheme.onBackground}" ref="content">
      <v-col cols="12">
      </v-col>
      <v-col cols="2" class="py-0">
        <p class="text-h7">Nama Mahasiswa </p>
      </v-col>
      <v-col cols="10" class="py-0">
        <p class="text-h7">: {{Mahasiswa.Nama}}</p>
      </v-col>
      <v-col cols="2" class="py-0">
        <p class="text-h7" > NIM </p>
      </v-col>
      <v-col cols="10" class="py-0">
        <p class="text-h7"> : {{Mahasiswa.Nim}}</p>
      </v-col>
      <v-col cols="2" class="py-0">
        <p class="text-h7"> Program Studi </p>
      </v-col>
      <v-col cols="10" class="py-0">
        <p class="text-h7"> : {{Mahasiswa.Prodi}}</p>
      </v-col>
      <v-col cols="12">
          <NilaiTable :nilaiList="nilaiList"/>
      </v-col>
      <v-col cols="2" class="py-0">
        <p class="text-h7"> Jumlah Mata Kuliah </p>
      </v-col>
      <v-col cols="10" class="py-0">
        <p class="text-h7">: {{jumlahMatkul}} </p>
      </v-col>
      <v-col cols="2" class="py-0">
        <p class="text-h7" > Jumlah SKS </p>
      </v-col>
      <v-col cols="10" class="py-0">
        <p class="text-h7"> : {{jumlahSKS}} </p>
      </v-col>
      <v-col cols="2" class="py-0">
        <p class="text-h7"> IPK </p>
      </v-col>
      <v-col cols="10" class="py-0">
        <p class="text-h7"> : {{Mahasiswa.IPKumulatif}}</p>
      </v-col>
      <v-col cols="9">
      </v-col>
    </v-row>
    <v-col cols="2">
        <v-btn color="#2196F3" elevation="2" class="white--text" depressed @click="SavePDF()">
          <v-icon left>
            mdi-file-download-outline
        </v-icon>
        Simpan Sebagai PDF</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import JSPDF from "jspdf"
import domtoimage from "dom-to-image"
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import NilaiTable from "@/views/template/component/nilai/NilaiTable.vue"

export default {
  name: "DashboardMain",
  components: { Breadcumbs, NilaiTable },
  props: {
    Mahasiswa: {
      type: Object,
      required: false
    }
  },
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
      jumlahSKS: 0,
      jumlahMatkul: 0,
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
  mounted () {
    console.log(this.Mahasiswa.Nilai)
    var idMatkul = 0
    this.nilaiList = []
    for (var i = 0; i < this.Mahasiswa.Nilai.length; i++) {
      for (var j = 0; j < this.Mahasiswa.Nilai[i].NilaiSemester.length; j++) {
        this.nilaiList.push({
          id: idMatkul,
          kodeDosen: this.Mahasiswa.Nilai[i].NilaiSemester[j].KodeDosen,
          kodeMataKuliah: this.Mahasiswa.Nilai[i].NilaiSemester[j].KodeMK,
          namaMataKuliah: this.Mahasiswa.Nilai[i].NilaiSemester[j].MataKuliah,
          sksMataKuliah: this.Mahasiswa.Nilai[i].NilaiSemester[j].SKS,
          nilai: this.Mahasiswa.Nilai[i].NilaiSemester[j].Nilai
        })
        // console.log(this.Mahasiswa.Nilai[i].NilaiSemester[j].MataKuliah)
        this.jumlahSKS += this.Mahasiswa.Nilai[i].NilaiSemester[j].SKS
        idMatkul++
      }
    }
    this.jumlahMatkul = idMatkul + 1
  },
  methods: {
    test (mhsNilai) {
      console.log(mhsNilai)
    },
    SavePDF () {
      /** WITH CSS */
      domtoimage
        .toPng(this.$refs.content)
        .then(function (dataUrl) {
          var img = new Image()
          img.src = dataUrl
          const doc = new JSPDF((({
            orientation: "portrait",
            // unit: "pt",
            format: [210, 297]
          })))
          const imgProps = doc.getImageProperties(img)
          const pdfWidth = doc.internal.pageSize.getWidth()
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
          doc.addImage(img, "JPEG", 10, 40, pdfWidth - 15, pdfHeight)
          const date = new Date()
          const filename =
        "timechart_" +
        date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2) +
        ".pdf"
          doc.save(filename)
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error)
        })
    }
  }
}
</script>
