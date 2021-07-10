<template>
  <v-dialog
    v-model="show"
    width="420"
  >
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
          <div class="text-h7 font-weight-bold" :style="{color: currentTheme.onSurface}">Progress</div>
          <div class="text-caption font-weight-medium font-italic" :style="{color: currentTheme.onSurface}">*isi dengan rentang 1-100</div>
          <v-slider
            v-model="target"
            :thumb-size="24"
            :color="currentTheme.colorSecondary"
            thumb-label
          ></v-slider>
          <div class="text-h7 font-weight-bold" :style="{color: currentTheme.onSurface}">Skala Pemahaman</div>
          <div class="text-caption font-weight-medium font-italic" :style="{color: currentTheme.onSurface}">*isi dengan rentang 1-5</div>
          <v-slider
            v-model="skalaPemahaman"
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
              <v-btn color="currentTheme.colorPrimary" elevation="2" width="100" outlined @click="closeDialog()">
                <span style="font-size: 12px" class="font-weight-bold">Batal</span>
              </v-btn>
            </v-col>
            <v-col sm="5" class="mt-1">
              <v-btn
                :color="currentTheme.colorPrimary"
                dark
                width="100"
                @click="edit"
              >
                Simpan
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
import SubtugasMonitoringDosen from "../../../../../datasource/network/monitoring/subtugas"
export default {
  name: "subTask",
  props: ["visible", "index", "subTask"],
  data () {
    return {
      target: 0,
      skalaPemahaman: 0,
      catatan: "-"
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
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
    async edit () {
      var updateSubTugas
      console.log(this.index)
      updateSubTugas = await SubtugasMonitoringDosen.putSubTugas(this.index, this.target, this.skalaPemahaman, this.catatan)
      console.log(updateSubTugas)
      this.$emit("close")
      window.location.reload()
    }
  }
}
</script>

<style scoped>

</style>
