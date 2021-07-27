<template>
  <v-card
    link
    class="rounded-card mr-3 mb-3"
    @click="onMatkulClicked(idPerkuliahan, mataKuliah)"
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
    <div class="pa-2">
    <v-row>
    <v-col cols="6" class="pt-4" v-text="'Kode'">
    </v-col>
    <v-col cols="6" class="pt-4" v-text="idMatkul">
    </v-col>
    <v-col cols="6" class="pt-0 pb-4" v-text="'Semester'">
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
  name: "MataKuliahItem",
  props: {
    idPerkuliahan: {
      type: Number,
      required: false,
      default: 0
    },
    mataKuliah: {
      type: String,
      required: false,
      default: "Model Data Teori"
    },
    idMatkul: {
      type: String,
      required: false,
      default: ""
    },
    semester: {
      type: Number,
      required: false,
      default: 0
    },
    kelas: {
      type: String,
      required: false,
      default: "1A - D3 Teknik Informatika"
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
      this.$router.push("input-nilai-matkul/" + id)
    }
  }
}
</script>
