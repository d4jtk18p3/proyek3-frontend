<template>
  <v-row justify="space-around">
    <v-date-picker
      v-model="picker"
      color="#272343"
      :header-color="currentTheme.colorPrimary"
      locale="id-ID"
      :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
      :events="functionEvents"
      class="rounded-lg"
      v-if="isDark"
      dark
    ></v-date-picker>
    <v-date-picker
      v-model="picker"
      color="#272343"
      :header-color="currentTheme.colorPrimary"
      locale="id-ID"
      :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
      :events="functionEvents"
      class="rounded-lg"
      v-if="!isDark"
      Light
    ></v-date-picker>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "KalenderItem",
  data () {
    return {
      picker: new Date().toISOString().substr(0, 10)
    }
  },
  methods: {
    functionEvents (date) {
      const [,, day] = date.split("-")
      if ([12, 17, 28].includes(parseInt(day, 10))) return true
      if ([1, 19, 22].includes(parseInt(day, 10))) return ["red", "#00f"]
      return false
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
