<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Logbook Saya</p>
    </v-col>
    <v-col cols="12">
        <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-row class="py-5 ml-3">
      <v-col :cols="isMobile ? '4' : '2'" class="py-0">
        <div class="text-start">Nama</div>
      </v-col>
      <v-col :cols="isMobile ? '7' : '2'" class="py-0">
        <div class="text-start">: {{identitas.nama}}</div>
      </v-col>
      <v-col :cols="isMobile ? '1' : '8'"></v-col>
      <v-col :cols="isMobile ? '4' : '2'" class="py-0">
        <div class="text-start">NIM</div>
      </v-col>
      <v-col :cols="isMobile ? '7' : '2'" class="py-0">
        <div class="text-start">: {{identitas.nim}}</div>
      </v-col>
        <v-col :cols="isMobile ? '1' : '8'"></v-col>
      <v-col :cols="isMobile ? '4' : '2'" class="py-0">
        <div class="text-start">Kelas</div>
      </v-col>
      <v-col :cols="isMobile ? '7' : '2'" class="py-0">
        <div class="text-start">: {{identitas.kelas}}</div>
      </v-col>
        <v-col :cols="isMobile ? '1' : '8'"></v-col>
      <v-col :cols="isMobile ? '4' : '2'" class="py-0">
        <div class="text-start">Prodi</div>
      </v-col>
      <v-col :cols="isMobile ? '7' : '3'" class="py-0">
        <div class="text-start">: {{identitas.prodi}}</div>
      </v-col>
      <v-col :cols="isMobile ? '1' : '7'"></v-col>
      <v-col :cols="isMobile ? '4' : '2'" class="py-0">
        <div class="text-start">Mata Kuliah</div>
      </v-col>
      <v-col :cols="isMobile ? '7' : '2'" class="py-0">
        <div class="text-start">: {{identitas.matakuliah}}</div>
      </v-col>
    </v-row>
    <v-col cols="12" class="mt-2">
      <TabelItem :datas="this.datas" :idLogbooks="this.idLogbooks"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import TabelItem from "@/views/logbook/component/mahasiswa/TabelItem"
import BackEndLogbook from "../../../../datasource/api/logbook/logbook"

export default {
  name: "LogbookSaya",
  components: { Breadcumbs, TabelItem },
  props: {
    identitas: {
      type: Object,
      required: false,
      default: () => {
        return {
          nama: "Khoirunnisa Putri",
          nim: "191524034",
          kelas: "3A",
          prodi: "D4 - Teknik Informatika",
          matakuliah: "Proyek 2"
        }
      }
    },
    datas: {
      type: Array,
      required: false,
      default: () => {
        return [
          {
            nomor: "1",
            tanggal: "01-03-2021",
            kegiatan: "Membuat design halaman utama log Membuat design halaman utama log",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "2",
            tanggal: "02-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "3",
            tanggal: "03-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "4",
            tanggal: "04-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "5",
            tanggal: "05-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "6",
            tanggal: "06-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "7",
            tanggal: "07-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "8",
            tanggal: "08-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "9",
            tanggal: "09-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "10",
            tanggal: "10-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "11",
            tanggal: "11-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "12",
            tanggal: "12-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          }
        ]
      }
    },
    idLogbooks: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Logbook",
          disabled: false,
          href: ""
        },
        {
          text: "Logbook Saya",
          disabled: true,
          href: ""
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
  async mounted () {
    this.datas = await BackEndLogbook.getAllEntriLogbooksMhsByNIM("191524034")
    console.log(this.datas)
    this.idLogbooks = await BackEndLogbook.getIdLogbooksMhsByNIM("191524034")
  }
}
</script>
