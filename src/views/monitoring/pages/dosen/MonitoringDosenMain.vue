<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Monitoring Tugas</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col cols="12" class="mt-5" v-if="!isMobile">
      <p
        class="text-center font-weight-bold text-h5"
        :style="{color: currentTheme.onBackground}"
      >Mata Kuliah</p>
      <MonitoringDosenMataKuliahItem/>
    </v-col>
    <v-col cols="12" class="mt-5" v-if="isMobile">
      <p
        class="text-center font-weight-bold text-h5"
        :style="{color: currentTheme.onBackground}"
      >Mata Kuliah</p>
      <MonitoringDosenMataKuliahItem/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import MonitoringDosenMataKuliahItem from "@/views/monitoring/pages/dosen/MonitoringDosenMataKuliah"

export default {
  name: "MonitoringDosenMain",
  components: { MonitoringDosenMataKuliahItem, Breadcumbs },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Monitoring",
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
