<template>
  <v-card
    class="rounded-card rounded-xl"
    @click="routeTugas(idTugas)"
  >
    <v-row class="pa-4 ma-0" :style="{background : currentTheme.colorSecondary}">
      <v-col align-self="center" class="pa-0 ma-0"
      :cols="isMobile ? '10' : '12'">
        <div
          class="text-h5 text-uppercase font-weight-medium"
          :style="{color : currentTheme.colorOnSecondary}"
        >{{ tugas }}</div>
        <div
        v-if="isMobile"
          class="caption text-capitalize font-weight-thin"
          :style="{color : currentTheme.colorOnPrimary}"
        >Jumlah Subtugas : {{jumlahSubtugas}}</div>
      </v-col>
      <!-- <v-col cols="2" class="pa-0 ma-0" v-if="isMobile">
        <v-avatar color="#C4C4C4">
          <span class="white--text headline font-weight-bold">{{jumlahSubtugas}}</span>
        </v-avatar>
        <p>Subtugas</p>
      </v-col> -->
      <!-- <v-col cols="12" class="pa-0 ma-0" v-if="!isMobile">
        <div
          class="text-subtitle-1 text-capitalize font-weight-medium"
          :style="{color : currentTheme.colorOnSecondary}"
        >Jumlah Subtugas : {{jumlahSubtugas}}</div>
      </v-col> -->
    </v-row>
    <div class="pa-2" :style="{background : currentTheme.surface}" v-if="!isMobile">
      <v-row>
        <v-col>
          <div
            class="pl-1 py-5 text-subtitle-2 font-weight-medium"
            :style="{color : currentTheme.onSurface}"
          >Jumlah Subtugas : {{jumlahSubtugas}}</div>
          <!-- <v-avatar color="white">
            <span class="white--text headline font-weight-bold">{{jumlahSubtugas}}</span>
          </v-avatar> -->
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
    },
    jumlahSubtugas: {
      type: Number,
      required: false,
      default: 1
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
    console.log(this.jumlahSubtugas)
  }
}
</script>

<style scoped>
</style>
