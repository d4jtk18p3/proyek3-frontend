<template>
  <v-flex>
    <v-card width="280" class="mt-12 pa-3">
      <p class="text-h5 text-center font-weight-bold">Persentase Kehadiran</p>
      <v-card-text class=" text-center ma-0 pa-0">*total kehadiran selama perkuliahan 1 semester</v-card-text>
      <v-card-actions class="justify-center">
        <v-progress-circular
        class="mt-2"
          :rotate="-90"
          :size="150"
          :width="15"
          :value="kehadiran"
            color="#4CAF50">
          {{ kehadiran }}% Kehadiran
        </v-progress-circular>
      </v-card-actions>
      <v-row>
        <v-col cols="1">
          <v-progress-circular
            class="ma-5"
            :size="20"
            :value= 100
            color="#4CAF50">
          </v-progress-circular>
        </v-col>
        <v-col>
          <v-card-text class="mt-1 ml-3 text-left">Hadir</v-card-text>
        </v-col>
        <v-col>
          <v-card-text class="mt-1 mr-2 text-right">{{ jmlJam }} Jam</v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "PersentasiKehadiran",
  props: {
    kehadiran: {
      type: Number,
      required: false
    },
    jmlJam: {
      type: Number,
      required: false
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  }
}

</script>
