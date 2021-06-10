<template>
  <v-row>
    <v-dialog v-model="show" max-width="500px">
      <v-card class="mx-auto pa-5" :style="{background: currentTheme.surface}" min-height="1000px">
        <v-row  :style="{color: currentTheme.onBackground}">
          <v-col cols="12" align="center">
            <p class="text-h4 font-weight-bold">Tambah Subtugas</p>
          </v-col>
        </v-row>

        <v-row  :style="{color: currentTheme.onBackground}">
          <v-col cols="12">
            <div class="text-h6 font-weight-bold">Subtugas</div>
          </v-col>
        </v-row>

        <div v-for="(sub, i) in subtugas" :key="i">
          <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
            <v-col cols="12">
              <div class="text-h7 font-weight-bold">Subtugas {{i+1}}</div>
            </v-col>
          </v-row>
          <v-row class="mt-n4 mb-0 pt-0 pb-0" :style="{color: currentTheme.onBackground}">
            <v-col cols="12">
              <v-text-field
                v-model="sub.value1"
                :label="sub.label1"
                outlined
                clearable
                :dark="isDark"
                :color="currentTheme.colorSecondary"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-n10 mb-n6 pt-0 pb-0" :style="{color: currentTheme.onBackground}">
            <v-col cols="12">
              <vc-date-picker
                v-model="sub.date"
                mode="dateTime"
                is24hr
                :timezone="timezone"
                :is-dark="isDark"
                color="teal">
                <template v-slot="{ inputValue, inputEvents }">
                  <v-text-field
                    v-model="sub.date"
                    :label="sub.label2"
                    outlined
                    clearable
                    :dark="isDark"
                    :value="inputValue"
                    v-on="inputEvents"
                    :color="currentTheme.colorSecondary"
                  >
                  </v-text-field>
                </template>
              </vc-date-picker>
            </v-col>
          </v-row>
        </div>
        <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
          <v-col cols="12" align="right">
            <v-btn
            outlined
            :color="currentTheme.colorSecondary"
            @click="add"
            >
              Tambah
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
          <v-col cols="6" align="right">
            <v-btn
            outlined
            :color="isDark? currentTheme.colorSecondary : currentTheme.colorOnSecondary"
            @click="closeDialog()"
            >
              Batal
            </v-btn>
          </v-col>
          <v-col cols="6" align="left">
            <v-btn
            class=" white--text"
            :color="isDark? currentTheme.colorSecondary : currentTheme.colorOnSecondary"
            @click="addTugas"
          >
            Submit
          </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
// import MonitoringDosen from "../../../datasource/api/monitoring/MonitoringDosen"
export default {
  name: "FormAddMonitoring",
  props: ["visible"],
  data () {
    return {
      dialogSubTask: false,
      namaTugas: "",
      subtugas: []
      // date: new Date()
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit("close")
        }
      }
    }
  },
  methods: {
    add () {
      this.subtugas.push({
        label1: "Nama Subtugas",
        value1: "",
        label2: "Tenggat",
        date: new Date()
      })
    },
    closeDialog () {
      this.$emit("close")
    }
  }

}
</script>

<style scoped>
</style>
