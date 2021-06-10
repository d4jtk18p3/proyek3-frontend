<template>
  <v-row justify="center">
    <v-col cols="10" xs="10" sm="10" md="10" lg="5" xl="3" >
      <v-date-picker
        v-model="date"
        :allowed-dates="allowedDates"
        class="mt-4"
        min="2016-06-15"
        max="2018-03-20"
        :color="currentTheme.colorSecondary"
        :dark="isDark"
      ></v-date-picker>
    </v-col>
    <v-col cols="10" xs="10" sm="10" md="10" lg="5" xl="3">
      <v-date-picker
        v-model="secondDate"
        class="mt-4"
        :color="currentTheme.colorPrimary"
        :dark="isDark"
      ></v-date-picker>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "CalendarTemplate",
  data: () => ({
    date: "2018-03-02",
    secondDate: "2021-01-01"
  }),

  methods: {
    allowedDates: val => parseInt(val.split("-")[2], 10) % 2 === 0
  },
  computed: {
    ...mapGetters({
      isDark: "theme/getIsDark",
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  }
}
</script>

<style scoped>

</style>
