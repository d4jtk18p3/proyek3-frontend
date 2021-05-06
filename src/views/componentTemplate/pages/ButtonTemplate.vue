<template>
  <v-card
    :style="{background: currentTheme.surface }"
  >
    <v-row
      class="pa-5"
    >
      <v-col  cols="12" class="text-h6" :style="{color: currentTheme.onSurface }">
        Button List
      </v-col>
      <v-col cols="12" xs="6" sm="12" md="3" lg="3" xl="3" class="text-subtitle-2 font-weight-light" align-self="center" :style="{color: currentTheme.onSurface }">
        Normal
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-btn :color="isDark ? '#0E538A' : '#2196F3'" style="color:white;" small>
          Button
        </v-btn>
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-btn :color="isDark?'#9C2C2C' : '#FF5252'" style="color:white;" small>
          Button
        </v-btn>
      </v-col>
      <v-col cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
        <v-btn :color="isDark? '#269E9E' : '#272343' " style="color:white;" small>
          Button
        </v-btn>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="3" lg="3" xl="3" class="text-subtitle-2 font-weight-light" align-self="center" :style="{color: currentTheme.onSurface }">
        Outlined
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-btn color="#2196F3" style="color:#2196F3;" small outlined>
          Button
        </v-btn>
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-btn color="#FF5252" style="color:#FF5252;" small outlined>
          Button
        </v-btn>
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-btn color="#272343" style="color:#272343;" small outlined>
          Button
        </v-btn>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="3" lg="3" xl="3" class="text-subtitle-2 font-weight-light" align-self="center" :style="{color: currentTheme.onSurface }">
        Text
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-btn color="#2196F3" style="color:#2196F3;" small text >
          Button
        </v-btn>
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-btn color="#FF5252" style="color:#FF5252;" small text >
          Button
        </v-btn>
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-btn color="#272343" style="color:#272343;" small text>
          Button
        </v-btn>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="3" lg="3" xl="3" class="text-subtitle-2 font-weight-light" align-self="center" :style="{color: currentTheme.onSurface }">
        Disable
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-btn color="#272343" style="color:#272343;" small disabled :outlined="!isDark" :dark="isDark">
          Button
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "ButtonTemplate",
  computed: {
    ...mapGetters({
      isDark: "theme/getIsDark",
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  }
}
</script>

<style scoped>

</style>
