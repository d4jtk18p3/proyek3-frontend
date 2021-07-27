<template>
    <v-layout row>
      <v-flex>
        <v-card
          class="rounded ml-3 mt-3"
          width="150"
        >
          <v-row class="ma-0 pt-2 pl-3">
            <v-col cols="12" align-self="center" class="pa-0 ma-0">
              <div
                class="text-h5 text-left"
                :style="{color : currentTheme.colorOnSecondary}"
              >Sakit</div>
            </v-col>
          </v-row>
          <div class="pa-5" style="background: #2196F3">
            <v-row class="text-h3 justify-center font-weight-bold pa-0 ma-0">
              {{sakit}}
            </v-row>
          </div>
        </v-card>
      </v-flex>
      <v-flex>
        <v-spacer></v-spacer>
        <v-card
          class="rounded ml-10 mt-3"
          width="150"
        >
          <v-row class="ma-0 pt-2 pl-3">
            <v-col cols="12" align-self="center" class="pa-0 ma-0">
              <div
                class="text-h5 text-left"
                :style="{color : currentTheme.colorOnSecondary}"
              >Izin</div>
            </v-col>
          </v-row>
          <div class="pa-5" style="background: #FB8C00">
            <v-row class="text-h3 justify-center font-weight-bold pa-0 ma-0">
              {{izin}}
            </v-row>
          </div>
        </v-card>
      </v-flex>
      <v-flex>
        <v-spacer></v-spacer>
        <v-card
          class="rounded ml-10 mt-3"
          width="150"
        >
          <v-row class="ma-0 pt-2 pl-3">
            <v-col cols="12" align-self="center" class="pa-0 ma-0">
              <div
                class="text-h5 text-left"
                :style="{color : currentTheme.colorOnSecondary}"
              >Alfa</div>
            </v-col>
          </v-row>
          <div class="pa-5" style="background: #FF5252">
            <v-row class="text-h3 justify-center font-weight-bold pa-0 ma-0">
              {{alfa}}
            </v-row>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "SakitIzinAlfaItem",

  props: {
    sakit: {
      type: Number,
      required: false
    },
    izin: {
      type: Number,
      required: false
    },
    alfa: {
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

<style>

.flexcard {
  display: flex;
  flex-direction: column;
}
</style>
