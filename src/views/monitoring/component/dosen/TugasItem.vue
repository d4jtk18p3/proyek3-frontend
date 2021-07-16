<template>
  <v-card
    link
    class="rounded-lg mr-3 mb-3"
    @click="routeTugas(idTugas)"
  >
    <v-row class="pa-3 ma-0" :style="{background :'#2196F3' }">
      <v-col cols="12" align-self="center" class="pa-0 ma-0">
        <div
          class="text-center text-uppercase font-weight-bold"
          :style="{color: currentTheme.surface}"
        >{{ tugas }}</div>
      </v-col>
    </v-row>
    <div class="pa-2 pl-4">
      <v-row>
        <v-col cols="8" class="pt-4" v-text="'Jumlah Subtugas'">
        </v-col>
        <v-col cols="2" class="pt-4" v-text="':'">
        </v-col>
        <v-col cols="2" class="pt-4" v-text="jumlahSubtugas">
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"
import SubtugasMonitoringDosen from "../../../../datasource/network/monitoring/subtugas"
export default {
  name: "TugasItem",
  data () {
    return {
      jumlahSubtugas: 0
    }
  },
  props: {
    idTugas: {
      type: Number,
      required: false,
      default: 0
    },
    tugas: {
      type: String,
      required: false,
      default: "PThread Create"
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
  methods: {
    routeTugas (idTugas) {
      const currentRoute = this.$route.path
      this.$router.push(currentRoute + "/tugas/" + idTugas).catch(error => {
        if (error.name !== "NavigationDuplicated") {
          throw error
        }
      })
    }
  },
  async mounted () {
    var sub = await SubtugasMonitoringDosen.getSubtugasByTugas(this.idTugas)
    this.jumlahSubtugas = sub.length
  }
}
</script>

<style scoped>
</style>
