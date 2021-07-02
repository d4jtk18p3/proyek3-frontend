<template>
  <v-row justify="space-around">
    <v-date-picker
      v-model="picker"
      color="#272343"
      :header-color="currentTheme.colorPrimary"
      locale="id-ID"
      :events="functionEvents"
      class="rounded-lg elevation-5"
      v-if="isDark"
      dark
      :allowed-dates="disableFutureDates"
      :readonly="viewOnly"
    ></v-date-picker>
    <v-date-picker
      v-model="picker"
      color="#272343"
      :header-color="currentTheme.colorPrimary"
      locale="id-ID"
      :events="functionEvents"
      class="rounded-lg elevation-5"
      v-if="!isDark"
      Light
      :allowed-dates="disableFutureDates"
      :readonly="viewOnly"
    ></v-date-picker>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import BackEndGoogleAPIsCalendar from "../../../../datasource/network/googleapis/googlecalendar"
export default {
  name: "DatePickerItem",
  props: {
    picker: {
      type: Date,
      required: false,
      default: () => {
        return new Date().toISOString().substr(0, 10)
      }
    },
    viewOnly: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      }
    }
  },
  data () {
    return {
      holidayDates: [],
      startDate: []
    }
  },
  methods: {
    functionEvents (dateString) {
      var date = new Date(dateString)
      if (this.startDate.includes(dateString)) return "#0000FF" // hari libur nasional -> hijau/biru
      if ([0, 6].includes(date.getDay())) return "#FF0000" // hari sabtu dan minggu -> merah
      return false
    },
    disableFutureDates (val) {
      return val <= new Date().toISOString().substr(0, 10)
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    })
  },
  async mounted () {
    this.holidayDates = await BackEndGoogleAPIsCalendar.getEventHoliday()
    var i = 0
    while (i < this.holidayDates.length) {
      this.startDate[i] = await this.holidayDates[i].startDate
      i++
    }
  }
}
</script>

<style scoped>
</style>
