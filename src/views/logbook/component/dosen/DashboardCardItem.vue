<template>
  <v-card
    class="rounded-lg elevation-5"
    @click="cardClicked()"
  >
    <v-row class="pa-4 ma-0" :style="{background: currentTheme.colorPrimary}">
      <v-col cols="12" align-self="center" class="pa-0 ma-0">
        <div
          class="text-subtitle-1 text-center font-weight-light"
          :style="{color : currentTheme.colorOnPrimary}"
        >Lihat Dashboard Logbook</div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "DashboardCardItem",
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  methods: {
    cardClicked () {
      this.$router.push({
        name: "DashboardLogbook",
        path: "/logbook/dashboard/"
      })
      this.$router.go(1)
    }
  }
}
</script>

<style scoped>
</style>
