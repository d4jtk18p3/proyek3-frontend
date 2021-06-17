<template>
    <v-col>
    <div v-for="Tugas in TugasList"
        :key="Tugas.matkul">
    <v-card
        class="pa-3 mb-1 rounded-card rounded-lg"
        elevation="2"
    >
        <v-row>
            <v-col>
                <div class="caption font-weight-medium" :style="{color : gray}">{{Tugas.tenggat}}</div>
                <div class="text-h7 font-weight-bold ml-2" :style="{color : isDark ? currentTheme.surface : currentTheme.onSurface}">{{Tugas.matkul}}</div>
                <div class="caption font-weight-medium font-italic ml-2" :style="{color : isDark ? currentTheme.surface : currentTheme.onSurface}">{{Tugas.subtask}}</div>
            </v-col>
            <v-col
                cols="auto"
                md="3"
                class="ml-auto mt-1"
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
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "Tugas",
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
