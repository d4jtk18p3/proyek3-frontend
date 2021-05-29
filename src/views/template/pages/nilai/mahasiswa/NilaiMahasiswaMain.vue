<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Nilai Mahsiswa</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col :cols="isMobile? '12' : '4'" class="mt-5">
      <NameCard nama="Rayhan Azka A" jurusan="D4 - Teknik Informatika" nim="181524016" :text-class="isMobile? 'text-center' : 'text-start'"/>
    </v-col>
    <v-col :cols="isMobile? '12' : '3'"  :class="isMobile ? 'mt-0' : 'mt-5'">
      <i-p-k-card ip="4.0"/>
    </v-col>
    <v-col cols="5" v-if="!isMobile"></v-col>
    <v-col>
      <GraphSection/>
    </v-col>
    <v-col cols="12" class="mt-12">
      <div :style="{background: 'gray', width: '100%', height: '1px'}"></div>
    </v-col>
    <v-col cols="12">
      <detail-nilai-section/>
    </v-col>
  </v-row>
</template>

<script>
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import { mapGetters } from "vuex"
import NameCard from "@/views/template/component/nilai/NameCard"
import IPKCard from "@/views/template/component/nilai/IPKCard"
import DetailNilaiSection from "@/views/template/pages/nilai/mahasiswa/DetailNilaiSection"
import GraphSection from "@/views/template/pages/nilai/mahasiswa/GraphSection"
export default {
  name: "NilaiMahasiswaMain",
  components: {
    GraphSection,
    DetailNilaiSection,
    IPKCard,
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
