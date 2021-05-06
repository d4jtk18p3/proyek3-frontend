<template>
  <v-row>
    <v-col cols="12">
      <div class="text-h5 font-weight-bold" :style="{color:currentTheme.onBackground}">Text Alignment</div>
    </v-col>
    <v-col cols="12">
      <div class="text-subtitle-1" :style="{color:currentTheme.onBackground}">Gunakan ini untuk menerapkan alignment text </div>
    </v-col>
    <v-col cols="12">
      <div class="py-5">
        <v-expansion-panels :dark="isDark">
          <v-row>
            <v-col>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-h6 text-start">Start</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-start"> Gunakan Header ini dengan menggunakan classs <span class="font-weight-bold"> text-start </span></v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-h6 text-center">Center</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-center"> Gunakan Header ini dengan menggunakan classs <span class="font-weight-bold"> text-center </span></v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-h6 text-end">End</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-end"> Gunakan Header ini dengan menggunakan classs <span class="font-weight-bold"> text-end </span></v-expansion-panel-content>
              </v-expansion-panel>
            </v-col>
          </v-row>
        </v-expansion-panels>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "TextAlignment",
  computed: {
    ...mapGetters({
      isDark: "theme/getIsDark",
      currentTheme: "theme/getCurrentColor"
    })
  }
}
</script>

<style scoped>
.content-overflow{
  overflow-y: scroll;
}
</style>
