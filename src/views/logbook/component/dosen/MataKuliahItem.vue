<template>
  <v-card
    class="rounded-xl elevation-5"
  >
    <v-row class="pa-4 ma-0" :style="{background : currentTheme.colorSecondary}">
      <v-col cols="12" align-self="center" class="pa-0 ma-0">
        <div
          class="text-h5 text-center text-uppercase font-weight-bold"
          :style="{color : currentTheme.colorOnSecondary}"
        >{{ mataKuliah }}</div>
      </v-col>
      <v-col cols="12" class="pa-0 ma-0">
        <div
          class="text-subtitle-1 text-center text-capitalize font-weight-medium"
          :style="{color : currentTheme.colorOnSecondary}"
        >{{ prodi }}</div>
      </v-col>
    </v-row>
    <div class="pa-6" :style="{background : currentTheme.surface}">
      <v-row class="pa-0 ma-0">
        <v-col
          class="pa-0 ma-0"
          v-for="( kelas, index ) in listKelas"
          :key="index"
          cols="12">
          <v-btn
            text
            class="text-caption  text-capitalize font-weight-medium"
            :style="{color : currentTheme.onSurface}"
            @click="onKelasClick(kelas)"
          >Kelas {{ kelas }}</v-btn>
        </v-col>
      </v-row>

    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "MataKuliahItem",
  props: {
    mataKuliah: {
      type: String,
      required: false,
      default: "Proyek 1"
    },
    prodi: {
      type: String,
      required: false,
      default: "D3 - Teknik Informatika"
    },
    listKelas: {
      type: Array,
      required: false,
      default: () => {
        return ["1A", "1B"]
      }
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  methods: {
    onKelasClick (kelas) {
      this.$router.push({
        name: "ListMahasiswa",
        path: "/logbook/logbook-mahasiswa/" + this.prodi + "/" + this.mataKuliah + "/" + kelas,
        params: {
          namaMataKuliah: this.mataKuliah,
          kelas: kelas,
          prodi: this.prodi
        }
      })
      this.$router.go(1)
    }
  }
}
</script>

<style scoped>
</style>
