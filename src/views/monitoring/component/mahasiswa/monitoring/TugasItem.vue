<template>
    <v-card
        :style="{background: '#2196F3'}"
        class="pa-3 rounded-card rounded-lg"
        elevation="2"
        width="700"
        @click="routeTugas(Matkul, tugas, id)"
    >
        <v-row>
            <v-col cols="12">
                <div class="text-h7 font-weight-bold ml-2 mt-1" :style="{color : isDark ? currentTheme.colorPrimary : currentTheme.surface}">{{ tugas }}</div>
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
    id: {
      type: Number,
      required: false
    },
    Perkuliahan: {
      type: Number,
      required: false
    },
    Matkul: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    })
  },
  methods: {
    routeTugas (namaMatkul, namaTugas, idTugas) {
      const currentRoute = this.$route.path
      this.$router.push(currentRoute + "/" + namaMatkul + "&" + namaTugas + "&" + idTugas).catch(error => {
        if (error.name !== "NavigationDuplicated") {
          throw error
        }
      })
    }
  }
}
</script>

<style scoped>
.rounded-card{
  border-radius:1000px;
}
</style>
