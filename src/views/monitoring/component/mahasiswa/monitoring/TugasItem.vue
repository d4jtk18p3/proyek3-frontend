<template>
    <v-card
        :style="{background: '#2196F3'}"
        class="pa-3 rounded-card rounded-lg"
        elevation="2"
        width="700"
        to="/monitoring/mahasiswa/namaMatkul/namaTugas"
    >
        <v-row>
            <v-col cols="12">
                <div class="text-h7 font-weight-bold ml-2 mt-1" :style="{color : isDark ? currentTheme.onSurface : currentTheme.surface}">{{ tugas }}</div>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "TugasItem",
  props: {
    tugas: {
      type: String,
      required: false,
      default: "Model Data Teori"
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
  beforeMount () {
    console.log(this.mataKuliah)
  }
}
</script>

<style scoped>
.rounded-card{
  border-radius:1000px;
}
</style>
