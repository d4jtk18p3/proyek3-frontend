<template>
  <v-card
    class="mx-auto"
    height="130"
    :color="currentTheme.colorSecondaryVariant"
  >
    <v-card-title class="text-h6 font-weight-bold" :style="{color: currentTheme.onBackground, 'line-height': '20px'}">IP Kumulatif</v-card-title>
    <v-card-title class="text-h3 font-weight-bold" :style="{color: currentTheme.onBackground, 'line-height': '30px'}">{{ DataMahasiswa.IPKumulatif }}</v-card-title>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "DashboardNilaiMahasiswa",
  props: {
    DataMahasiswa: {
      type: Object,
      required: false,
      default: () => {
        return {
          IPKumulatif: 3.9
        }
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  }
}
</script>
