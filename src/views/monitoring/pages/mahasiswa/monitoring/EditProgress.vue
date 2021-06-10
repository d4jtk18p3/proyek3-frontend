<template>
 <v-dialog
        v-model="dialog"
        width="420"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mr-5"
            v-bind="attrs"
            v-on="on"
            icon :style="{color: currentTheme.onBackground}"
          >
            <v-icon >
              mdi-pencil
            </v-icon>
          </v-btn>
        </template>
        <v-card
          :style="{background: currentTheme.surface}"
          class="pa-3"
        >
          <v-row justify="center" class="my-5">
            <v-col cols="12">
              <div class="text-h4 font-weight-bold text-center" :style="{color: currentTheme.onSurface}">Edit Progress</div>
              <div class="text-h7 font-weight-bold text-center font-italic" :style="{color: currentTheme.onSurface}">{{ subTask }}</div>
            </v-col>
            <v-col cols="12" sm="10" class="mt-3">
              <div class="text-h7 font-weight-bold" :style="{color: currentTheme.onSurface}">Target</div>
              <div class="text-caption font-weight-medium font-italic" :style="{color: currentTheme.onSurface}">*isi dengan rentang 1-100</div>
              <v-slider
                v-model="targetValue"
                :thumb-size="24"
                :color="currentTheme.colorSecondary"
                thumb-label
              ></v-slider>
              <div class="text-h7 font-weight-bold" :style="{color: currentTheme.onSurface}">Skala Pemahaman</div>
              <div class="text-caption font-weight-medium font-italic" :style="{color: currentTheme.onSurface}">*isi dengan rentang 1-5</div>
              <v-slider
                v-model="skalaPemahamanValue"
                :thumb-size="24"
                :color="currentTheme.colorSecondary"
                thumb-label
                max="5"
                step="0.1"
              ></v-slider>
              <div class="text-h7 font-weight-bold pb-1" :style="{color: currentTheme.onSurface}">Catatan</div>
              <v-textarea
                v-model="catatan"
                outlined
                :color="currentTheme.colorSecondary"
              ></v-textarea>
              <v-row justify="center">
                <v-col sm="5" class="mt-1">
                  <v-btn color="currentTheme.colorPrimary" elevation="2" width="100" outlined>
                    <span style="font-size: 12px" class="font-weight-bold">Batal</span>
                  </v-btn>
                </v-col>
                <v-col sm="5" class="mt-1">
                  <v-btn
                    :color="currentTheme.colorPrimary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    width="100"
                  >
                    <span style="font-size: 12px" class="font-weight-light">Simpan</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "subTask",
  props: {
    subTask: {
      type: String,
      required: false,
      default: "Another Type of Employee"
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    data () {
      return {
        targetValue: 0,
        skalaPemahamanValue: 0
      }
    }
  }
}
</script>

<style scoped>

</style>
