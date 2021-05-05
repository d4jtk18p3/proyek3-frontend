<template>
  <v-card
    :style="{background: currentTheme.surface }"
  >
    <v-row
      class="pa-5"
    >
      <v-col  cols="12" class="text-h6" :style="{color: currentTheme.onSurface }">
        TextField List
      </v-col>
      <v-col cols="12" class="text-subtitle-2 font-weight-light" align-self="center" :style="{color: currentTheme.onSurface }">
        Outlined
      </v-col>
      <v-col cols="6" xs="6" sm="4" md="4" lg="4" xl="4">
        <v-text-field dense outlined label="Normal">
        </v-text-field>
      </v-col>
      <v-col cols="6" xs="6" sm="4" md="4" lg="4" xl="4" offset="2">
        <v-text-field dense outlined label="Clearable" clearable v-model="outlinedClearable">
        </v-text-field>
      </v-col>
      <v-col cols="12" class="text-subtitle-2 font-weight-light" align-self="center" :style="{color: currentTheme.onSurface }">
        Info Alert
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-alert type="info" dense text outlined>
          Info
        </v-alert>
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-alert type="info" dense>
          Info
        </v-alert>
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-alert type="info" text dense>
          Info
        </v-alert>
      </v-col>
      <v-col cols="12" class="text-subtitle-2 font-weight-light" align-self="center" :style="{color: currentTheme.onSurface }">
        Warning Alert
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-alert type="warning" dense text outlined icon="mdi-alert">
          Warning
        </v-alert>
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-alert type="warning" dense icon="mdi-alert">
          Warning
        </v-alert>
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-alert type="warning" text dense icon="mdi-alert">
          Warning
        </v-alert>
      </v-col>
      <v-col cols="12" class="text-subtitle-2 font-weight-light" align-self="center" :style="{color: currentTheme.onSurface }">
        Error Alert
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-alert type="error" dense text outlined >
          Error
        </v-alert>
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-alert type="error" dense >
          Error
        </v-alert>
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-alert type="error" text dense>
          Error
        </v-alert>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "TextFieldTemplate",
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
      outlinedClearable: "Hi!"
    }
  }
}
</script>

<style scoped>

</style>
