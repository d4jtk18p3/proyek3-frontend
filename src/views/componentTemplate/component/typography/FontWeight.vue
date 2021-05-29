<template>
  <v-row>
    <v-col cols="12">
      <div class="text-h5 font-weight-bold" :style="{color:currentTheme.onBackground}">Ketebalan Text</div>
    </v-col>
    <v-col cols="12">
      <div class="text-subtitle-1" :style="{color:currentTheme.onBackground}">Weight Font dibawah dapat digunakan sesuai kebutuhan </div>
    </v-col>
    <v-col cols="12">
      <div class="py-5">
        <v-expansion-panels :dark="isDark">
          <v-row>
            <v-col>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-h6 font-weight-black">Black</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content> Gunakan Font Weight ini dengan menggunakan classs <span class="font-weight-bold"> font-weight-black</span></v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-h6 font-weight-bold">Bold</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content> Gunakan Font Weight ini dengan menggunakan classs <span class="font-weight-bold"> font-weight-bold </span></v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-h6 font-weight-medium">Medium</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content> Gunakan Font Weight ini dengan menggunakan classs <span class="font-weight-bold"> font-weight-medium</span></v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-h6 font-weight-regular">Regular</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content> Gunakan Font Weight ini dengan menggunakan classs <span class="font-weight-bold"> font-weight-regular </span></v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-h6 font-weight-light">Light</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content> Gunakan Font Weight ini dengan menggunakan classs <span class="font-weight-bold"> font-weight-light </span></v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-h6 font-weight-thin">Thin</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content> Gunakan Font Weight ini dengan menggunakan classs <span class="font-weight-bold"> font-weight-thin </span></v-expansion-panel-content>
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
  name: "FontWeight",
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
