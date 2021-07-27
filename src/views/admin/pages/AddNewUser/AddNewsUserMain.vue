<template>
  <v-row :style="{ color: currentTheme.onBackground }">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Selamat Datang, Admin!</p>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "AddNewsUserMain",
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
    identity: function () {
      return this.$store.getters.identity
    }
  }
}
</script>

<style scoped>

</style>
