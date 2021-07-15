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
          <div class="text-h4 font-weight-bold text-center" :style="{color: currentTheme.onSurface}">Serahkan Tugas</div>
          <div class="text-h7 font-weight-bold text-center font-italic" :style="{color: currentTheme.onSurface}">{{ subTask }}</div>
        </v-col>
        <v-col cols="12" sm="10" class="mt-3">
          <div class="text-h7 font-weight-bold" :style="{color: currentTheme.onSurface}">Lampiran</div>
          <div class="text-caption font-weight-medium font-italic" :style="{color: currentTheme.onSurface}">*Berupa link</div>
          <v-text-field
            v-model="lampiran"
            outlined
            class="mt-3 mb-0"
            :color="currentTheme.colorSecondary"
            :style="{backgroundColor: currentTheme.surface}"
          ></v-text-field>
          <v-row justify="center">
            <v-col sm="5" class="mt-1">
              <v-btn
                :color="currentTheme.onError"
                elevation="2"
                width="100"
                @click="closeDialog()"
              >
                <span :style="{color: currentTheme.onSurface}" style="font-size: 12px" class="font-weight-bold">Batal</span>
              </v-btn>
            </v-col>
            <v-col sm="5" class="mt-1">
              <v-btn
                :color="currentTheme.colorPrimary"
                dark
                width="100"
                @click="serahkan"
              >
                <span style="font-size: 12px" class="font-weight-bold">Simpan</span>
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
import SubtugasMonitoringMahasiswa from "../../../../../datasource/network/monitoring/subtugas"
export default {
  name: "subTask",
  props: ["visible", "index", "subTask"],
  data () {
    return {
      lampiran: ""
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
    async serahkan () {
      var updateSubTugas
      console.log(this.lampiran)
      updateSubTugas = await SubtugasMonitoringMahasiswa.putSubTugasSerahkan(this.index, this.lampiran)
      console.log(updateSubTugas)
      this.$emit("close")
      window.location.reload()
    }
  }
}
</script>

<style scoped>

</style>
