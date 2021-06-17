<template>
  <v-card
    class="mx-auto"
    height="130"
    color="#FB8C00"
  >
    <v-card-title class="text-h5 font-weight-bold" :style="{color: currentTheme.onBackground}">{{ DataMahasiswa.Nama }}</v-card-title>
    <v-card-text>
      <p class="text-h6 font-weight-bold" :style="{'line-height': '10px'}">{{ DataMahasiswa.Prodi }}</p>
      <p class="text-h6 font-weight-bold" :style="{'line-height': '10px'}">{{ DataMahasiswa.Nim }}</p>
    </v-card-text>
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
          Nama: "Angelina Aiofera",
          Prodi: "D4 - Teknik Informatika",
          Nim: 181524000
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
