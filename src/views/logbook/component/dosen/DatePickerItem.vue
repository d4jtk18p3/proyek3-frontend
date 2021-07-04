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
    <v-col cols="8">
      <v-card
        class="rounded-lg elevation-5"
      >
        <v-row class="pa-4 ma-0" :style="{background: currentTheme.colorPrimary}">
          <v-col cols="12" align-self="center" class="pa-0 ma-0">
            <div
              class="text-subtitle-1 text-left font-weight-light"
              :style="{color : currentTheme.colorOnPrimary}"
            >Event:</div>
          </v-col>
          <v-col cols="12" align-self="center" class="pa-0 ma-0">
            <div
              class="text-subtitle-1 text-left font-weight-light"
              :style="{color : currentTheme.colorOnPrimary}"
              v-for="(item, index) in this.holidayDesc"
              :key="index"
            >{{item}}</div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
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
      startDate: [],
      holidayDesc: []
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
    },
    setSummary () {
      this.holidayDesc = []
      var i = 0
      var j = 0
      for (i = 0; i < this.holidayDates.length; i++) {
        if (this.holidayDates[i].startDate === this.picker) {
          this.holidayDesc[j] = "- " + this.holidayDates[i].summary
          j++
        }
        if (i === this.holidayDates.length - 1 && j === 0) {
          this.holidayDesc[j] = "-"
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    })
  },
  async mounted () {
    console.log(this.picker)
    this.holidayDates = await BackEndGoogleAPIsCalendar.getEventHoliday()
    var i = 0
    while (i < this.holidayDates.length) {
      this.startDate[i] = await this.holidayDates[i].startDate
      i++
    }
    this.setSummary()
  }
}
</script>

<style scoped>
</style>
