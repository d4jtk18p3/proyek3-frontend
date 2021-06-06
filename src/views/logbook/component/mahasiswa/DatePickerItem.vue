<template>
  <v-row justify="space-around">
    <v-date-picker
      v-model="picker"
      color="#272343"
      :header-color="currentTheme.colorPrimary"
      locale="id-ID"
      :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
      :events="functionEvents"
      class="rounded-lg elevation-5"
      v-if="isDark"
      dark
      :allowed-dates="disableFutureDates"
      :readonly="viewOnly"
      @change="onChangePicker"
    ></v-date-picker>
    <v-date-picker
      v-model="picker"
      color="#272343"
      :header-color="currentTheme.colorPrimary"
      locale="id-ID"
      :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
      :events="functionEvents"
      class="rounded-lg elevation-5"
      v-if="!isDark"
      Light
      :allowed-dates="disableFutureDates"
      :readonly="viewOnly"
      @change="onChangePicker"
    ></v-date-picker>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
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
  methods: {
    functionEvents (date) {
      const [,, day] = date.split("-")
      if ([12, 17, 28].includes(parseInt(day, 10))) return true
      if ([1, 19, 22].includes(parseInt(day, 10))) return ["red", "#00f"]
      return false
    },
    disableFutureDates (val) {
      return val <= new Date().toISOString().substr(0, 10)
    },
    ...mapActions({
      changePicker: "datePickerModule/setDatePickerValue"
    }),
    onChangePicker () {
      this.changePicker({
        picker: this.picker
      })
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    })
  }
}
</script>

<style scoped>
</style>
