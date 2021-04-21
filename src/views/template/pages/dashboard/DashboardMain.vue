<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Dashboard</p>
    </v-col>
    <v-col v-if="isMobile" :cols="isMobile ? 12 : 4" class="mt-2">
      <KalenderItem/>
    </v-col>
    <v-col :cols="isMobile ? 12 : 4" class="mt-2">
      <JadwalItem/>
    </v-col>
    <v-col :cols="isMobile ? 12 : 4" class="mt-2">
      <TugasItem/>
    </v-col>
    <v-col v-if="!isMobile" :cols="isMobile ? 12 : 4" class="mt-5">
      <KalenderItem/>
    </v-col>
    <v-col :cols="isMobile ? 12 : 4" class="mt-2">
      <PintasanItem/>
    </v-col>
    <v-col :cols="isMobile ? 12 : 4" class="mt-5">
      <TambahPintasanItem/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import JadwalItem from "@/views/template/component/dashboard/JadwalItem"
import TugasItem from "@/views/template/component/dashboard/TugasItem"
import KalenderItem from "@/views/template/component/dashboard/KalenderItem"
import PintasanItem from "@/views/template/component/dashboard/PintasanItem"
import TambahPintasanItem from "@/views/template/component/dashboard/TambahPintasanItem"

export default {
  name: "DashboardMain",
  components: { JadwalItem, TugasItem, KalenderItem, PintasanItem, TambahPintasanItem },
  data () {
    return {
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
