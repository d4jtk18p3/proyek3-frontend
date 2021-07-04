<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Logbook Mahasiswa</p>
    </v-col>
    <v-col cols="12">
        <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-row class="py-5 ml-3">
      <v-col :cols="isMobile ? '4' : '2'" class="py-0">
        <div class="text-start">Nama</div>
      </v-col>
      <v-col :cols="isMobile ? '7' : '9'" class="py-0">
        <div class="text-start">: {{nama}}</div>
      </v-col>
      <v-col :cols="isMobile ? '1' : '1'"></v-col>
      <v-col :cols="isMobile ? '4' : '2'" class="py-0">
        <div class="text-start">NIM</div>
      </v-col>
      <v-col :cols="isMobile ? '7' : '2'" class="py-0">
        <div class="text-start">: {{nim}}</div>
      </v-col>
        <v-col :cols="isMobile ? '1' : '8'"></v-col>
      <v-col :cols="isMobile ? '4' : '2'" class="py-0">
        <div class="text-start">Kelas</div>
      </v-col>
      <v-col :cols="isMobile ? '7' : '2'" class="py-0">
        <div class="text-start">: {{kelasString}}</div>
      </v-col>
        <v-col :cols="isMobile ? '1' : '8'"></v-col>
      <v-col :cols="isMobile ? '4' : '2'" class="py-0">
        <div class="text-start">Prodi</div>
      </v-col>
      <v-col :cols="isMobile ? '7' : '3'" class="py-0">
        <div class="text-start">: {{prodi}}</div>
      </v-col>
      <v-col :cols="isMobile ? '1' : '7'"></v-col>
      <v-col :cols="isMobile ? '4' : '2'" class="py-0">
        <div class="text-start">Mata Kuliah</div>
      </v-col>
      <v-col :cols="isMobile ? '7' : '2'" class="py-0">
        <div class="text-start">: {{namaMataKuliah}}</div>
      </v-col>
    </v-row>
    <v-col cols="12" class="mt-2">
      <TabelItem
      :nim="this.nim"
      :nama="this.nama"
      :namaMataKuliah="this.namaMataKuliah"
      :prodi="this.prodi"
      :kelasString="this.kelasString"
      :datas="this.dataLogbooks"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import TabelItem from "@/views/logbook/component/dosen/TabelItem"
import BackEndLogbook from "../../../../datasource/network/logbook/logbook"

export default {
  name: "LogbookMahasiswa",
  components: { Breadcumbs, TabelItem },
  props: {
    nim: {
      type: String,
      required: false
    },
    nama: {
      type: String,
      required: false
    },
    dataLogbooks: {
      type: Array,
      required: false
    },
    namaMataKuliah: {
      type: String,
      required: false,
      default: "Proyek 1"
    },
    prodi: {
      type: String,
      required: false,
      default: "D4 - Teknik Informatika"
    },
    kelasString: {
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
          text: "Logbook Mahasiswa",
          disabled: false,
          href: "/logbook/logbook-mahasiswa"
        },
        {
          text: this.prodi.substring(0, 2) + " - " + this.namaMataKuliah + " - " + this.kelasString,
          disabled: false,
          href: "/logbook/logbook-mahasiswa/" + this.prodi + "/" + this.namaMataKuliah + "/" + this.kelasString
        },
        {
          text: this.nim,
          disabled: true,
          href: ""
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      getNip: "logbook/getNip"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  },
  async mounted () {
    this.dataLogbooks = await BackEndLogbook.getAllEntriLogbooksMhsByNIM(this.nim)
    var logbooks = await BackEndLogbook.getLogbooksMhsByNIM(this.nim)
    this.nama = logbooks.nama
  }
}
</script>
