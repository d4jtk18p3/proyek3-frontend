<template>
  <v-card
    :style="{background: currentTheme.surface }"
  >
    <v-row
      class="pa-5"
    >
      <v-col  cols="12" class="text-h6" :style="{color: currentTheme.onSurface }">
        TextArea List
      </v-col>
      <v-col cols="12" class="text-subtitle-2 font-weight-bold" align-self="center" :style="{color: currentTheme.onSurface }">
        Outlined
      </v-col>
      <v-col cols="12" xs="6" sm="4" md="4" lg="4" xl="4">
        <v-textarea dense outlined label="Normal" :dark="isDark" :color="currentTheme.colorSecondary">
        </v-textarea>
      </v-col>
      <v-col cols="12" xs="6" sm="4" md="4" lg="4" xl="4" offset-lg="2" offset-md="2" offset-sm="2">
        <v-textarea dense outlined label="Clearable" clearable v-model="outlinedClearable" :dark="isDark" :color="currentTheme.colorSecondary">
        </v-textarea>
      </v-col>
      <v-col cols="12" class="text-subtitle-2 font-weight-bold mt-5" align-self="center" :style="{color: currentTheme.onSurface }">
        Regular
      </v-col>
      <v-col cols="12" xs="6" sm="4" md="4" lg="4" xl="4">
        <v-textarea dense label="Normal" :dark="isDark" :color="currentTheme.colorSecondary">
        </v-textarea>
      </v-col>
      <v-col cols="12" xs="6" sm="4" md="4" lg="4" xl="4"  offset-lg="2" offset-md="2" offset-sm="2">
        <v-textarea dense label="Clearable" clearable v-model="regularClearable" :dark="isDark" :color="currentTheme.colorSecondary">
        </v-textarea>
      </v-col>
      <v-col cols="12" class="text-subtitle-2 font-weight-bold mt-5" align-self="center" :style="{color: currentTheme.onSurface }">
        Filled
      </v-col>
      <v-col cols="12" xs="6" sm="4" md="4" lg="4" xl="4">
        <v-textarea dense label="Normal" :dark="isDark" :color="currentTheme.colorSecondary" filled>
        </v-textarea>
      </v-col>
      <v-col cols="12" xs="6" sm="4" md="4" lg="4" xl="4" offset-lg="2" offset-md="2" offset-sm="2" >
        <v-textarea dense label="Clearable" clearable v-model="filledClearable" :dark="isDark" :color="currentTheme.colorSecondary" filled>
        </v-textarea>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "TextAreaTemplate",
  computed: {
    ...mapGetters({
      isDark: "theme/getIsDark",
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  },
  data () {
    return {
      outlinedClearable: "Hi outlined!",
      regularClearable: "Hi Regular!",
      filledClearable: "Hi filled!"
    }
  }
}
</script>

<style scoped>

</style>
