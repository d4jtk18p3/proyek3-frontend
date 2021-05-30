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
import TugasItem from "@/views/monitoring/component/TugasItem"
import TambahMonitoring from "@/views/monitoring/component/TambahMonitoring"
import MonitoringDosen from "../../../../datasource/api/monitoring/MonitoringDosen"
export default {
  name: "DashboardMain",
  components: { TugasItem, TambahMonitoring },
  data () {
    return {
      listTugas: [

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
    this.listTugas = await MonitoringDosen.getTugasMatkul("401", "101")
  }
}
</script>
