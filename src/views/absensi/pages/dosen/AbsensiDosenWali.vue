<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Absensi Mahasiswa</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col>
    </v-col>
    <v-col>
    <h2 align="center">Validasi Ketidakhadiran</h2>
      <DaftarHadir :ketidakhadiran="ketidakhadiran">
      </DaftarHadir>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import DaftarHadir from "@/views/absensi/component/ketidakhadiran/DaftarHadir"
import Keterangan from "@/datasource/network/absensi/keterangan"

export default {
  name: "AbsensiDosenMain",
  components: { DaftarHadir, Breadcumbs },
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
      ketidakhadiran: [],
      kelas: 1803
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
    getKeterangan () {
      Keterangan.getKeterangan(this.kelas)
        .then(response => {
          this.ketidakhadiran = response.data
          console.log(this.ketidakhadiran)
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  beforeMount () {
    this.getKeterangan()
  }
}
</script>
