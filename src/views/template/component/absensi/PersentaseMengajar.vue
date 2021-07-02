<template>
  <v-flex>
    <v-card width="300" class=" pa-3" height="530">
      <p class="text-h5 text-center font-weight-bold">Persentase Mengajar</p>
      <v-card-text class=" text-center ma-0 pa-0">*total mengajar selama perkuliahan 1 semester</v-card-text>
      <v-card-actions class="justify-center">
        <v-progress-circular
        class="mt-5"
          :rotate="-90"
          :size="150"
          :width="20"
          :value= 75
          color="#59DCDC"
          background-color="#4CAF50">
        </v-progress-circular>
      </v-card-actions>
      <v-row>
        <v-col cols="1">
          <v-progress-circular
            class="ma-5"
            :size="20"
            :value= 100
            color="#59DCDC">
          </v-progress-circular>
        </v-col>
        <v-col>
          <v-card-text class="mt-1 ml-3 text-left">Mengajar</v-card-text>
        </v-col>
        <v-col>
          <v-card-text class="mt-1 mr-2 text-right">23200</v-card-text>
        </v-col>
      </v-row>
      <v-row
      class="mt-0 pt-0">
        <v-col cols="1">
          <v-progress-circular
            class="ma-5"
            :size="20"
            :value= 0>
          </v-progress-circular>
        </v-col>
        <v-col cols="7">
          <v-card-text class="mt-1 ml-3 mr-0 text-left">Tidak Mengajar</v-card-text>
        </v-col>
        <v-col cols="4">
          <v-card-text class="mt-1 mr-2 ml-0 text-right">15899</v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "PersentaseMengajar",

  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  }
}

</script>
