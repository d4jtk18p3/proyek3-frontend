<template>
  <v-card
    class="rounded-xl"
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
        >{{kodeMatkul}}</div>
      </v-col>
    </v-row>
    <div class="pa-6" :style="{background : currentTheme.surface}">
      <v-row class="pa-0 ma-0">
        <v-col
          class="pa-0 ma-0"
          @click="onKelasClicked(index,kelas)"
          v-for="(kelas, index ) in listKelas"
          :key="kelas"
          cols="12">
          <v-btn
            text
            class="text-caption  text-capitalize font-weight-medium"
            :style="{color : currentTheme.onSurface}"
            to="/monitoring/dosen/monitoring-tugas/daftar-tugas"
          >{{kelas}}</v-btn>
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
      default: "Model Data Teori"
    },
    kodeMatkul: {
      type: String,
      required: false,
      default: "16TIN4024"
    },
    listKelas: {
      type: Array,
      required: false,
      default: () => {
        return ["Kelas 3A", "Kelas 3B", "Kelas 3C"]
      }
    },
    onKelasClicked: {
      type: Function,
      required: false,
      default: (index, kelasString) => {
        console.log(`index : ${index} , kelasString : ${kelasString}`)
      }
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  }
}
</script>

<style scoped>
</style>
