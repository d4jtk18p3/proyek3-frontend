<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Input Nilai Mahasiswa</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col :cols="isMobile ? `12` : `3` " :offset="isMobile ? `0` : `0`">
        <p
        class="text-left font-weight-bold text-h5"
        :style="{color: currentTheme.onBackground}"
        >Dashboard</p>
        <v-card
            :style="{background: '#2196F3'}"
            class="pa-3"
            link
        >
        <div
            class="text-center text-h6"
            :style="{color: currentTheme.surface}"
            >Lihat Dashboard Nilai
        </div>
        </v-card>
        <p
        class="text-left font-weight-bold text-h5 mt-5"
        :style="{color: currentTheme.onBackground}"
        >Kelas</p>
        <v-card link class="mb-3" v-for="item in listKelas" :key="item.Kelas">
          <KelasItem :kelas="item.Kelas"/>
        </v-card>
    </v-col>
    <v-divider v-if="!isMobile" vertical class="mx-5"></v-divider>
    <v-col sm="8">
    <p
    class="text-left font-weight-bold text-h5"
    :style="{color: currentTheme.onBackground}"
    >Mata Kuliah</p>
    <v-row>
        <v-col
          no-gutters v-for="item in listMatkul" :key="item.Matkul"
          sm="6"
        >
          <NilaiMataKuliah :mataKuliah="item.Matkul" :idMatkul="item.id_matkul"/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import NilaiMataKuliah from "@/views/penilaian/component/dosen/NilaiMataKuliah"
import KelasItem from "@/views/template/component/absensi/KelasItem"

export default {
  name: "AbsensiDosenMain",
  components: { KelasItem, NilaiMataKuliah, Breadcumbs },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Penilaian",
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
      listKelas: [
        { id_kelas: 0, Kelas: "1A - D3 Teknik Informatika" },
        { id_kelas: 1, Kelas: "2A - D3 Teknik Informatika" },
        { id_kelas: 2, Kelas: "1A - D4 Teknik Informatika" }
      ],
      listMatkul: [
        { id_matkul: 0, Matkul: "Proyek 3" },
        { id_matkul: 1, Matkul: "APPL 2" },
        { id_matkul: 2, Matkul: "Pengantar Angkungtangsi" }
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
  }
}
</script>
