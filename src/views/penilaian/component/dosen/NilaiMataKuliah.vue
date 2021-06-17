<template>
  <v-card
    link
    class="rounded-card mr-3 mb-3"
    @click="routeNilaiMatkul(idMatkul)"
  >
    <v-row class="pa-4 ma-0" :style="{background : currentTheme.colorSecondary}">
      <v-col cols="12" align-self="center" class="pa-0 ma-0">
        <div
          class="text-h5 text-center text-uppercase font-weight-bold"
          :style="{color : currentTheme.colorOnSecondary}"
        >{{ mataKuliah }}</div>
      </v-col>
    </v-row>
    <div class="pa-6" :style="{backgroundImage:'url(https://library.polban.ac.id/wp-content/uploads/2017/03/Gedung-baru-1.jpg)','background-size': '100% 100%', height:'150px'}">
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
    idMatkul: {
      type: Number,
      required: false,
      default: 0
    },
    onMatkulClicked: {
      type: Function,
      required: false,
      default: (id) => {
        console.log(id)
      }
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  methods: {
    routeNilaiMatkul (id) {
      this.$router.push("penilaian/input-nilai-matkul/" + id)
    }
  }
}
</script>
