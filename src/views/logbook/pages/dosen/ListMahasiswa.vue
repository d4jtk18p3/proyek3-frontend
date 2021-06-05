<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">List Mahasiswa</p>
    </v-col>
    <v-col cols="12">
        <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col cols="12">
      <v-row class="py-5 ml-3">
        <v-col :cols="isMobile ? '4' : '2'" class="py-0">
          <div class="text-start">Prodi</div>
        </v-col>
        <v-col :cols="isMobile ? '7' : '5'" class="py-0">
          <div class="text-start">: {{prodi}}</div>
        </v-col>
        <v-col :cols="isMobile ? '1' : '4'"></v-col>
        <v-col :cols="isMobile ? '4' : '2'" class="py-0">
          <div class="text-start">Mata Kuliah</div>
        </v-col>
        <v-col :cols="isMobile ? '7' : '5'" class="py-0">
          <div class="text-start">: {{namaMataKuliah}}</div>
        </v-col>
        <v-col :cols="isMobile ? '1' : '4'"></v-col>
        <v-col :cols="isMobile ? '4' : '2'" class="py-0">
          <div class="text-start">Kelas</div>
        </v-col>
        <v-col :cols="isMobile ? '7' : '5'" class="py-0">
          <div class="text-start">: {{kelas}}</div>
        </v-col>
          <v-col :cols="isMobile ? '1' : '4'"></v-col>
      </v-row>
    </v-col>
    <v-col :cols="isMobile ? 12 : 4" v-for="item in this.listMahasiswa" :key="item.nim">
        <ListMahasiswaItem v-if="!isMobile" :namaMataKuliah="namaMataKuliah" :prodi="prodi" :kelas="kelas" :dataMahasiswa="item"/>
        <ListMahasiswaItemMobile v-if="isMobile" :namaMataKuliah="namaMataKuliah" :prodi="prodi" :kelas="kelas"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import ListMahasiswaItem from "@/views/logbook/component/dosen/ListMahasiswaItem"
import ListMahasiswaItemMobile from "@/views/logbook/component/dosen/ListMahasiswaItemMobile"
import BackEndMahasiswa from "../../../../datasource/api/logbook/mahasiswa"

export default {
  name: "ListMahasiswa",
  components: { Breadcumbs, ListMahasiswaItem, ListMahasiswaItemMobile },
  props: {
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
    kelas: {
      type: String,
      required: false,
      default: "1A"
    },
    listMahasiswa: {
      type: Array,
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
          text: this.prodi.substring(0, 2) + " - " + this.namaMataKuliah + " - " + this.kelas,
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
    this.listMahasiswa = await BackEndMahasiswa.getAllMahasiswaByKelas(this.kelas)
  }
}
</script>
