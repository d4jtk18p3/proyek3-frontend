<template>
  <v-card
    link
    class="rounded-card mr-3 mb-3"
    @click="routeDaftarTugas(idMatkul, idPerkuliahan)"
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
  name: "MatkulItem",
  props: {
    mataKuliah: {
      type: String,
      required: false,
      default: "Model Data Teori"
    },
    idMatkul: {
      type: String,
      required: false,
      default: "16TIN4014"
    },
    idPerkuliahan: {
      type: Number,
      required: false,
      default: 1
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
  },
  // beforeMount () {

  // },
  methods: {
    // routeDaftarTugas (idMatkul, idPerkuliahan) {
    //   this.$router.push("monitoring-tugas/daftar-tugas/" + idMatkul + "/" + idPerkuliahan)
    // }
  }
}
</script>

<style scoped>
.rounded-card{
  border-radius:1000px;
}
</style>
