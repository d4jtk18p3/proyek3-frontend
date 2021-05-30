<template>
  <div>
    <div class="flex mb-2">
      <label class="text-gray-600 font-medium"><input class="mr-1" type="radio" value="" v-model="timezone">Local</label>
      <label class="text-gray-600 font-medium ml-3"><input class="mr-1" type="radio" value="utc" v-model="timezone">UTC</label>
    </div>
    <vc-date-picker v-model="date" mode="dateTime" :timezone="timezone" />
  </div>
</template>

<script>
export default {
  name: "VCalendar",
  data () {
    return {
      date: new Date(),
      timezone: ""
    }
  }
}
</script>

<style scoped>

</style>
