<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col no-gutters v-for="item in listTugas" :key="item" :cols="isMobile ? 12 : 4" class="mt-2">
      <TugasItem :tugas="item"/>
    </v-col>
    <v-col :cols="isMobile ? 12 : 4" class="mt-5">
      <TambahMonitoring/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import TugasItem from "@/views/monitoring/component/dosen/TugasItem"
import TambahMonitoring from "@/views/monitoring/component/dosen/TambahMonitoring"
import TugasMonitoringDosen from "../../../../datasource/network/monitoring/tugas"
export default {
  name: "DashboardMain",
  components: { TugasItem, TambahMonitoring },
  data () {
    return {
      listTugas: [
        // "Membuat Website Akademik POLBAN",
        // "Menonton Video Communication"
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
  async mounted () {
    var tugas = await TugasMonitoringDosen.getTugasMatkul("16TIN4014", "5")
    var tugasList = []
    var i = 0
    while (i < tugas.length) {
      tugasList[i] = tugas[i]
      i++
    }
    this.listTugas = tugasList
  }
}
</script>
