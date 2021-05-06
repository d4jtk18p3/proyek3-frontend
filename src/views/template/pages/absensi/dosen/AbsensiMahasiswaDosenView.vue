<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Absensi Mahasiswa {{detailKuliah.kodeKuliah}}</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-row class="py-10">
        <v-col :cols="isMobile ? '4' : '2'" class="py-0">
          <div class="text-start">Nama Kuliah</div>
        </v-col>
        <v-col :cols="isMobile ? '7' : '2'" class="py-0">
          <div class="text-start">: {{detailKuliah.namaKuliah}}</div>
        </v-col>
        <v-col :cols="isMobile ? '1' : '8'"></v-col>
        <v-col :cols="isMobile ? '4' : '2'" class="py-0">
          <div class="text-start">Teori/Praktik</div>
        </v-col>
        <v-col :cols="isMobile ? '7' : '2'" class="py-0">
          <div class="text-start">: {{detailKuliah.teoriPraktik}}</div>
        </v-col>
          <v-col :cols="isMobile ? '1' : '8'"></v-col>
        <v-col :cols="isMobile ? '4' : '2'" class="py-0">
          <div class="text-start">Jurusan</div>
        </v-col>
        <v-col :cols="isMobile ? '7' : '2'" class="py-0">
          <div class="text-start">: {{detailKuliah.jurusan}}</div>
        </v-col>
          <v-col :cols="isMobile ? '1' : '8'"></v-col>
        <v-col :cols="isMobile ? '4' : '2'" class="py-0">
          <div class="text-start">Prodi</div>
        </v-col>
        <v-col :cols="isMobile ? '7' : '2'" class="py-0">
          <div class="text-start">: {{detailKuliah.prodi}}</div>
        </v-col>
        <v-col :cols="isMobile ? '1' : '8'"></v-col>
        <v-col :cols="isMobile ? '4' : '2'" class="py-0">
          <div class="text-start">Kelas</div>
        </v-col>
        <v-col :cols="isMobile ? '7' : '2'" class="py-0">
          <div class="text-start">: {{detailKuliah.kelas}}</div>
        </v-col>
        <v-col :cols="isMobile ? '1' : '4'"></v-col>
        <v-col :cols="isMobile ? '3' : '1'" class="py-0">
            <v-btn color="primary" elevation="2" outlined rounded
            >HADIR</v-btn>
        </v-col>
        <v-col :cols="isMobile ? '3' : '1'" class="py-0">
            <v-btn :color="isDark ? '#FFFFFF' : '#000000'" elevation="2" outlined rounded
            >SAKIT</v-btn>
        </v-col>
        <v-col :cols="isMobile ? '3' : '1'" class="py-0">
            <v-btn color="green" elevation="2" outlined rounded
            >IZIN</v-btn>
        </v-col>
        <v-col :cols="isMobile ? '3' : '1'" class="py-0 px-0">
            <v-btn color="red" elevation="2" outlined rounded depressed
         >ALPHA</v-btn>
        </v-col>
    </v-row>
    <v-col cols="12">
        <tabelAbsensiDosenView/>
    </v-col>

  </v-row>
</template>
<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import tabelAbsensiDosenView from "@/views/template/component/absensi/TabelAbsensiDosenView"

export default {
  name: "AbsensiMahasiswaDosenView",
  components: { Breadcumbs, tabelAbsensiDosenView },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Dashboard",
          disabled: false,
          href: ""
        },
        {
          text: "Link 1",
          disabled: false,
          href: ""
        },
        {
          text: "Link 2",
          disabled: true,
          href: ""
        }
      ],
      detailKuliah: {
        kodeKuliah: "123",
        namaKuliah: "Proyek 3",
        teoriPraktik: "Praktik",
        jurusan: "Teknik Informatika",
        prodi: "D4 Teknik Informatika",
        kelas: "3A"
      }
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  }
}
</script>
