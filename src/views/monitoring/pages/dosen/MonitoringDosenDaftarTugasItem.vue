<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col :cols="isMobile ? 12 : 4" class="mt-2">
      <TugasItem/>
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

export default {
  name: "DashboardMain",
  components: { TugasItem, TambahMonitoring },
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
