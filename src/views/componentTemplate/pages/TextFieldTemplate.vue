<template>
  <v-card
    :style="{background: currentTheme.surface }"
  >
    <v-form
      ref="form" @submit.prevent=""
    >
      <v-row
        class="pa-5"
      >
        <v-col  cols="6" class="text-h6" :style="{color: currentTheme.onSurface }">
          TextField List
        </v-col>
        <v-col cols="6">
          <div class="d-flex align-content-center justify-end">
            <v-btn :color="isDark?'#9C2C2C' : '#FF5252'" style="color:white;" small v-if="!isError" @click="toogleError">
              Aktifkan Error
            </v-btn>
            <v-btn :color="isDark?'#9C2C2C' : '#FF5252'" small outlined v-else @click="toogleError">
              Matikan Error
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" class="text-subtitle-2 font-weight-bold" align-self="center" :style="{color: currentTheme.onSurface }" >
          Outlined
        </v-col>
        <v-col cols="12" xs="6" sm="4" md="4" lg="4" xl="4">
          <v-text-field dense outlined label="Normal" :dark="isDark" :color="currentTheme.colorSecondary" :rules="[rules.ruleOne]">
          </v-text-field>
        </v-col>
        <v-col cols="12" xs="6" sm="4" md="4" lg="4" xl="4" offset-lg="2" offset-md="2" offset-sm="2">
          <v-text-field dense outlined label="Clearable" clearable v-model="outlinedClearable" :dark="isDark" :color="currentTheme.colorSecondary" :rules="[rules.ruleOne]">
          </v-text-field>
        </v-col>
        <v-col cols="12" class="text-subtitle-2 font-weight-bold mt-5" align-self="center" :style="{color: currentTheme.onSurface }">
          Regular
        </v-col>
        <v-col cols="12" xs="6" sm="4" md="4" lg="4" xl="4">
          <v-text-field dense label="Normal" :dark="isDark" :color="currentTheme.colorSecondary" :rules="[rules.ruleOne]">
          </v-text-field>
        </v-col>
        <v-col cols="12" xs="6" sm="4" md="4" lg="4" xl="4"  offset-lg="2" offset-md="2" offset-sm="2">
          <v-text-field dense label="Clearable" clearable v-model="regularClearable" :dark="isDark" :color="currentTheme.colorSecondary" :rules="[rules.ruleOne]">
          </v-text-field>
        </v-col>
        <v-col cols="12" class="text-subtitle-2 font-weight-bold mt-5" align-self="center" :style="{color: currentTheme.onSurface }" :rules="[rules.ruleOne]">
          Filled
        </v-col>
        <v-col cols="12" xs="6" sm="4" md="4" lg="4" xl="4">
          <v-text-field dense label="Normal" :dark="isDark" :color="currentTheme.colorSecondary" filled :rules="[rules.ruleOne]">
          </v-text-field>
        </v-col>
        <v-col cols="12" xs="6" sm="4" md="4" lg="4" xl="4" offset-lg="2" offset-md="2" offset-sm="2" >
          <v-text-field dense label="Clearable" clearable v-model="filledClearable" :dark="isDark" :color="currentTheme.colorSecondary" filled :rules="[rules.ruleOne]">
          </v-text-field>
        </v-col>
      </v-row>
    </v-form>
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
      outlinedClearable: "Hi outlined!",
      regularClearable: "Hi Regular!",
      filledClearable: "Hi filled!",
      isError: false,
      rules: {
        ruleOne: (_) => this.isError || "Error Pada Isian Texfield"
      }
    }
  },
  methods: {
    toogleError () {
      this.$refs.form.validate()
      this.isError = !this.isError
    }
  }
}
</script>

<style scoped>

</style>
