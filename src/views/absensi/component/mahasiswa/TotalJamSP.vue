<template>
  <v-flex>
    <v-card width="280" class="mt-12 pa-3">
      <p class="text-h5 text-center font-weight-bold">Total Jam SP</p>
      <v-card-text class=" text-center ma-0 pa-0">*Total absen hingga SP 1 ( SP 1 = 35 Jam )</v-card-text>
      <v-card-actions class="justify-center">
        <v-progress-circular
        class="mt-2"
          :rotate="-90"
          :size="150"
          :width="15"
          :value="persentase"
            color="#FF5252">
          {{ sisaMenujuSP }} Jam Tersisa
        </v-progress-circular>
      </v-card-actions>
      <v-row>
        <v-col cols="1">
          <v-progress-circular
            class="ma-5"
            :size="20"
            :value= 100
            color="#FF5252">
          </v-progress-circular>
        </v-col>
        <v-col cols="6">
          <v-card-text class="mt-1 ml-3 text-left">Tidak Masuk</v-card-text>
        </v-col>
        <v-col>
          <v-card-text class="mt-1 mr-2 text-right">{{ jmlTidakHadir }} Jam</v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "TotalJamSP",
  props: {
    jmlTidakHadir: {
      type: Number,
      required: false
    },
    sisaMenujuSP: {
      type: Number,
      required: false
    }
  },
  data () {
    return {
      persentase: Math.round((this.jmlTidakHadir / 35) * 100)
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  }
}

</script>
