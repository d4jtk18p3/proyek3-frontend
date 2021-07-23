<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col no-gutters v-for="item in listTugas" :key="item.id_tugas" :cols="isMobile ? 12 : 4" class="mt-2">
      <TugasItem :tugas="item.nama_tugas" :idTugas="item.id_tugas"/>
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
    var tugas = await TugasMonitoringDosen.getTugasMatkul(this.$route.params.id_matkul, this.$route.params.id_perkuliahan)
    var tugasList = []
    var i = 0
    while (i < tugas.listTugas.length) {
      tugasList.push({
        id_tugas: tugas.listidTugas[i],
        nama_tugas: tugas.listTugas[i]
      })
      i++
    }
    this.listTugas = tugasList
  }
  // async mounted () {
  //   this.listTugas = await MonitoringDosen.getTugasMatkul("401", "101")
  // }
}
</script>
