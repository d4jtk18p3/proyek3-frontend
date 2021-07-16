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
            <div class="text-h6 font-weight-bold">Nama Subtugas</div>
          </v-col>
        </v-row>

        <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
          <v-col cols="12">
            <v-text-field
              v-model="namaSubtugas"
              label="Nama Subtugas"
              outlined
              clearable
              :dark="isDark"
              :color="currentTheme.colorSecondary"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
          <v-col cols="12">
            <div class="text-h6 font-weight-bold">Tenggat</div>
          </v-col>
        </v-row>
        <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
          <v-col cols="12">
            <vc-date-picker
                v-model="tenggat"
                mode="dateTime"
                is24hr
                :is-dark="isDark"
                color="teal">
                <template v-slot="{ inputValue, inputEvents }">
                  <v-text-field
                    v-model="tenggat"
                    label="Tenggat Pengumpulan"
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
            :disabled="!this.namaSubtugas"
            class=" white--text"
            :color="isDark? currentTheme.colorSecondary : currentTheme.colorOnSecondary"
            @click="addSubtugas"
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
import SubtugasMonitoringDosen from "../../../../datasource/network/monitoring/subtugas"
import TugasMonitoringDosen from "../../../../datasource/network/monitoring/tugas"
export default {
  name: "FormAddMonitoring",
  props: ["visible"],
  data () {
    return {
      dialogSubTask: false,
      namaSubtugas: "",
      tenggat: new Date()
      // subtugas: []
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
    closeDialog () {
      this.$emit("close")
    },
    async addSubtugas () {
      var mhs = await TugasMonitoringDosen.getMahasiswaByTugas(this.$route.params.id_tugas)
      var i = 0
      var subtugasBaru
      var date = this.tenggat
      var d = new Date(date)
      var dateStr = d.toISOString()
      while (i < mhs.listIdStudi.length) {
        subtugasBaru = await SubtugasMonitoringDosen.postSubtugasBaru(this.namaSubtugas,
          dateStr, this.$route.params.id_tugas, mhs.listIdStudi[i])
        i++
      }
      console.log(this.namaSubtugas, dateStr)
      console.log(subtugasBaru)
      this.$emit("close")
      location.reload()
    }
  }

}
</script>

<style scoped>
</style>
