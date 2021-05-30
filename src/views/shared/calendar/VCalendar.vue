<template>
  <v-container>
    <div>
      <vc-date-picker
        v-model="date" mode="dateTime"
        :timezone="timezone"
        color="blue"
      />
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "VCalendar",
  data () {
    return {
      date: new Date(),
      timezone: ""
    }
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
