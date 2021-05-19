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
      <TabelItem :identitas="this.identitas"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import TabelItem from "@/views/logbook/component/dosen/TabelItem"

export default {
  name: "LogbookMahasiswa",
  components: { Breadcumbs, TabelItem },
  props: {
    nim: {
      type: String,
      required: false,
      default: () => {
        return "181524003"
      }
    },
    identitas: {
      type: Object,
      required: false,
      default: () => {
        return {
          nama: "Cecep Gorbacep",
          nim: "181524000",
          kelas: "3A",
          prodi: "D4 - Teknik Informatika",
          matakuliah: "Proyek 3"
        }
      }
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
          text: this.identitas.prodi.substring(0, 2) + " - " + this.identitas.matakuliah + " - " + this.identitas.kelas,
          disabled: false,
          href: "/logbook/logbook-mahasiswa/" + this.identitas.prodi + "/" + this.identitas.matakuliah + "/" + this.identitas.kelas
        },
        {
          text: this.identitas.nim,
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
  }
}
</script>
