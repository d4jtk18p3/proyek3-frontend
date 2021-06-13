<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Monitoring Tugas</p>
    </v-col>
    <v-col cols="9">
    <div v-for="Tugas in TugasList"
        :key="Tugas.matkul">
      <v-card
          class="pa-3 mt-2 ml-3 rounded-card rounded-lg"
          elevation="2"
          width="700"
      >
          <v-row>
              <v-col cols="4">
                  <div class="text-h7 font-weight-bold ml-2 mt-1" :style="{color : isDark ? currentTheme.surface : currentTheme.onSurface}">{{Tugas.matkul}}</div>
                  <div class="caption font-weight-medium font-italic ml-2" :style="{color : isDark ? currentTheme.surface : currentTheme.onSurface}">{{Tugas.jumlahSubTask}} Sub Task</div>
              </v-col>
              <v-col cols="3">
                <div class="caption font-weight-medium font-italic ml-2 mt-4" :style="{color : isDark ? currentTheme.surface : currentTheme.onSurface}">{{Tugas.subtask}}</div>
              </v-col>
              <v-col cols="2">
                <div class="caption font-weight-medium mt-4" :style="{color : gray}">{{Tugas.tenggat}}</div>
              </v-col>
              <v-col
                  md="2"
                  class="pl-9 ml-auto"
              >
                  <v-progress-circular
                      :rotate="90"
                      :size="50"
                      :width="5"
                      :value="Tugas.progress"
                      color="red"
                  >
                      <div class="text-h7 font-weight-bold" :style="{color : currentTheme.onSurface}">{{Tugas.progress}}</div>
                  </v-progress-circular>
              </v-col>
          </v-row>
      </v-card>
    </div>
    </v-col>
    <v-col cols="2">
      <v-card
          class="pa-3 mt-2 rounded-card rounded-lg"
          color="#E3F6F5"
          elevation="0"
          width="300"
          height="160"
      >
        <p class="text-h5 font-weight-bold text-center">Progress Tugas</p>
        <p class="text-h3 font-weight-bold text-center">30%</p>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "Dashboard",
  components: {},
  props: {
    TugasList: {
      type: Array,
      required: false,
      default: () => {
        return [
          {
            matkul: "APPL 1",
            jumlahSubTask: "7",
            subtask: "W1 Polymorphism",
            tenggat: "17 April 2021",
            progress: "20"
          },
          {
            matkul: "APPL 1",
            jumlahSubTask: "2",
            subtask: "W2 Design Pattern",
            tenggat: "17 Mei 2021",
            progress: "10"
          },
          {
            matkul: "Akuntansi",
            jumlahSubTask: "7",
            subtask: "Latihan Buku Besar",
            tenggat: "29 April 2021",
            progress: "0"
          }
        ]
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
