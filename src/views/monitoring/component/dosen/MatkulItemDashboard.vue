<template>
  <v-card
    link
    class="rounded-lg mr-3 mb-3"
    @click="routeDaftarTugas(idMatkul, idPerkuliahan)"
  >
    <v-row class="pa-3 ma-0" :style="{background :'#2196F3' }">
      <v-col cols="12" align-self="center" class="pa-0 ma-0">
        <div
          class="text-center text-uppercase font-weight-bold"
          :style="{color: currentTheme.surface}"
        >{{ mataKuliah }}</div>
      </v-col>
      <v-col cols="12" align-self="center" class="pa-0 ma-0">
        <div
          class="text-h8 text-center"
          :style="{color: currentTheme.surface}"
        >{{ kelas }}</div>
      </v-col>
    </v-row>
    <div class="pa-2 pl-4">
      <v-row>
        <v-col cols="4" class="pt-4" v-text="'Kode'">
        </v-col>
        <v-col cols="2" class="pt-4" v-text="':'">
        </v-col>
        <v-col cols="6" class="pt-4" v-text="idMatkul">
        </v-col>
        <v-col cols="4" class="pt-0 pb-4" v-text="'Semester'">
        </v-col>
        <v-col cols="2" class="pt-0" v-text="':'">
        </v-col>
        <v-col cols="6" class="pt-0 pb-4" v-text="semester">
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "MatkulItemDashboard",
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
    semester: {
      type: Number,
      required: false,
      default: 0
    },
    kelas: {
      type: String,
      required: false,
      default: "1803 - 24"
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  methods: {
    routeDaftarTugas (idMatkul, idPerkuliahan) {
      this.$router.push("dashboard-tugas/daftar-tugas/" + idMatkul + "/" + idPerkuliahan)
    }
  }
}
</script>

<style scoped>
</style>
