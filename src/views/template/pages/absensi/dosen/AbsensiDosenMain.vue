<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Absensi Mahasiswa</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col cols="8" class="mt-5" v-if="!isMobile">
      <p
        class="text-center font-weight-bold text-h5"
        :style="{color: currentTheme.onBackground}"
      >Mata Kuliah</p>
      <AbsensiDosenMataKuliahItem/>
    </v-col>
    <v-col  :cols="isMobile ? `12` : `3` " :offset="isMobile ? `0` : `1`" class="mt-5">
      <p
        class="text-center font-weight-bold text-h5"
        :style="{color: currentTheme.onBackground}"
      >Kelas</p>
      <KelasItem/>
    </v-col>
    <v-col cols="12" class="mt-5" v-if="isMobile">
      <p
        class="text-center font-weight-bold text-h5"
        :style="{color: currentTheme.onBackground}"
      >Mata Kuliah</p>
      <AbsensiDosenMataKuliahItem/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import AbsensiDosenMataKuliahItem from "@/views/template/pages/absensi/dosen/AbsensiDosenMataKuliah"
import KelasItem from "@/views/template/component/absensi/KelasItem"

export default {
  name: "AbsensiDosenMain",
  components: { KelasItem, AbsensiDosenMataKuliahItem, Breadcumbs },
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
      mahasiswa: [
        {
          nama: "Alvira",
          nim: "181524002",
          kelas: "D4-A"
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
