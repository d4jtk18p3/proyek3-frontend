<template>
  <v-row>
    <v-col cols="12">
      <div class="text-h5 font-weight-bold" :style="{color:currentTheme.onBackground}">Ukuran Text</div>
    </v-col>
    <v-col cols="12">
      <div class="text-subtitle-1" :style="{color:currentTheme.onBackground}">Ukuran-ukuran text dibawah dapat digunakan sesuai kebutuhan </div>
    </v-col>
    <v-col cols="12">
      <div class="py-5">
        <v-expansion-panels :dark="isDark">
          <v-row>
            <v-col>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-h1">Header 1</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content> Gunakan Header ini dengan menggunakan classs <span class="font-weight-bold"> text-h1 </span></v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-h2">Header 2</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content> Gunakan Header ini dengan menggunakan classs <span class="font-weight-bold"> text-h2 </span></v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-h3">Header 3</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content> Gunakan Header ini dengan menggunakan classs <span class="font-weight-bold"> text-h3 </span></v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-h4">Header 4</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content> Gunakan Header ini dengan menggunakan classs <span class="font-weight-bold"> text-h4 </span></v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-h5">Header 5</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content> Gunakan Header ini dengan menggunakan classs <span class="font-weight-bold"> text-h5 </span></v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-h6">Header 6</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content> Gunakan Header ini dengan menggunakan classs <span class="font-weight-bold"> text-h6 </span></v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-subtitle-1">Subtitle 1</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content> Gunakan Header ini dengan menggunakan classs <span class="font-weight-bold"> text-subtitle-1 </span></v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-subtitle-2">Subtitle 2</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content> Gunakan Header ini dengan menggunakan classs <span class="font-weight-bold"> text-subtitle-2 </span></v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-body-1">Body 1</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content> Gunakan Header ini dengan menggunakan classs <span class="font-weight-bold"> text-body-1 </span></v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-body-2">Body 2</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content> Gunakan Header ini dengan menggunakan classs <span class="font-weight-bold"> text-body-2 </span></v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div class="text-caption">Caption</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content> Gunakan Header ini dengan menggunakan classs <span class="font-weight-bold"> text-caption </span></v-expansion-panel-content>
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
  name: "TextSize",
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
