<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Nilai Mahsiswa</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col cols="4" class="mt-5">
      <NameCard nama="Rayhan Azka A" jurusan="D4 - Teknik Informatika" nim="181524016"/>
    </v-col>
    <v-col cols="3" class="mt-5">
      <i-p-card ip="4.0"/>
    </v-col>
    <v-col cols="5"></v-col>
    <v-col cols="5" class="mt-5">
      <i-p-graph  :ip-list="[3.2, 2.0, 2.95, 0.51, 2.52, 3.5, 1.0]"/>
    </v-col>
    <v-col cols="5" class="mt-5">
      <i-p-graph/>
    </v-col>
  </v-row>
</template>

<script>
import Breadcumbs from "@/views/component/UI/Breadcumbs"
import { mapGetters } from "vuex"
import NameCard from "@/views/component/nilai/NameCard"
import IPCard from "@/views/component/nilai/IPCard"
import IPGraph from "@/views/component/nilai/IPGraph"
export default {
  name: "NilaiMahasiswaMain",
  components: {
    IPGraph,
    IPCard,
    NameCard,
    Breadcumbs
  },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Dashboard",
          disabled: false,
          href: ""
        },
        {
          text: "Nilai",
          disabled: false,
          href: ""
        },
        {
          text: "Link 2",
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

<style scoped>

</style>
