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
      >Daftar Tugas</p>
      <MonitoringDosenDaftarTugasItem/>
    </v-col>
    <v-col cols="12" class="mt-5" v-if="isMobile">
      <p
        class="text-center font-weight-bold text-h5"
        :style="{color: currentTheme.onBackground}"
      >Daftar Tugas</p>
      <MonitoringDosenDaftarTugasItem/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import MonitoringDosenDaftarTugasItem from "@/views/monitoring/pages/dosen/MonitoringDosenDaftarTugasItem"

export default {
  name: "MonitoringDosenDaftarTugas",
  components: { MonitoringDosenDaftarTugasItem, Breadcumbs },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Monitoring",
          disabled: false,
          href: "/monitoring/dosen/monitoring-tugas"
        },
        {
          text: "Daftar Tugas",
          disabled: false,
          href: ""
        },
        {
          text: "Monitoring Subtugas",
          disabled: true,
          href: ""
        },
        {
          text: "Detail Subtugas",
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
    },
    identity: function () {
      return this.$store.getters.identity
    }
  }
}
</script>
