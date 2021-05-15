<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Monitoring Tugas</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col :cols="isMobile ? `12` : `3` " :offset="isMobile ? `0` : `0`">
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
          <MatkulItem :mataKuliah="item.Matkul"/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import MatkulItem from "@/views/monitoring/component/MatkulItem"
import KelasItem from "@/views/monitoring/component/KelasItem"
export default {
  name: "AbsensiDosenMain",
  components: { KelasItem, MatkulItem, Breadcumbs },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Absensi",
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
        { Kelas: "1A - D3 Teknik Informatika" },
        { Kelas: "2A - D3 Teknik Informatika" },
        { Kelas: "1A - D4 Teknik Informatika" }
      ],
      listMatkul: [
        { Matkul: "Proyek 3" },
        { Matkul: "APPL 2" },
        { Matkul: "Pengantar Akuntansi" }
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
