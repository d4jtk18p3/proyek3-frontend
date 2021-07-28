<template>
  <v-row>
    <v-dialog v-model="show" max-width="500px">
      <v-card class="mx-auto pa-5" :style="{background: currentTheme.surface}">
        <v-row  :style="{color: currentTheme.onBackground}">
          <v-col cols="12" align="center">
            <p class="text-h4 font-weight-bold">Tambah Monitoring</p>
          </v-col>
        </v-row>

        <v-row  :style="{color: currentTheme.onBackground}">
          <v-col cols="12">
            <div class="text-h6 font-weight-bold">Tugas</div>
          </v-col>
        </v-row>

        <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
          <v-col cols="12">
            <v-text-field
              v-model="namaTugas"
              label="Nama Tugas"
              outlined
              clearable
              :dark="isDark"
              :color="currentTheme.colorSecondary"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
          <v-col cols="12">
            <div class="text-h6 font-weight-bold">Kriteria</div>
          </v-col>
        </v-row>
        <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
          <v-col cols="12">
            <v-combobox
              multiple
              outlined
              clearable
              :item-color="currentTheme.colorSecondary"
              :dark="isDark"
              :color="currentTheme.colorSecondary"
              v-model="selectedKriteria"
              :items="items"
              label="Pilih Kriteria">
              <template v-slot:selection="data">
                <v-chip
                  :key="JSON.stringify(data.item)"
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  :disabled="data.disabled"
                  :dark="isDark"
                  :color="currentTheme.colorSecondary"
                >
                  <div :style="{color: currentTheme.colorPrimary}">
                    {{ data.item }}
                  </div>
                  <v-avatar
                    right
                    size="5"
                    :color="currentTheme.colorPrimary"
                  >
                    <v-icon
                      @click="onUnselect(data.index)"
                      x-small
                      color="white"
                    >mdi-close</v-icon>
                  </v-avatar>
                </v-chip>
              </template>
            </v-combobox>
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
            :disabled="!this.namaTugas"
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
import TugasMonitoringDosen from "../../../../datasource/network/monitoring/tugas"
export default {
  name: "FormAddMonitoring",
  props: ["visible"],
  data () {
    return {
      namaTugas: "",
      statusProgress: false,
      statusDurasi: false,
      statusSkala: false,
      statusCatatan: false,
      statusLampiran: false,
      idPerkuliahan: "",
      NIP: "",
      selectedKriteria: [],
      items: [
        "Progres",
        "Skala Pemahaman",
        "Catatan",
        "Lampiran",
        "Durasi"
      ]
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
    identity: function () {
      return this.$store.getters.identity
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
    onUnselect (index) {
      this.select.splice(index, 1)
    },
    async addTugas () {
      var tugasBaru
      console.log(this.namaTugas, this.selectedKriteria)
      this.statusProgress = this.selectedKriteria.includes("Progres")
      this.statusDurasi = this.selectedKriteria.includes("Durasi")
      this.statusSkala = this.selectedKriteria.includes("Skala Pemahaman")
      this.statusCatatan = this.selectedKriteria.includes("Catatan")
      this.statusLampiran = this.selectedKriteria.includes("Lampiran")

      tugasBaru = await TugasMonitoringDosen.postTugasBaru(this.namaTugas,
        this.statusProgress, this.statusDurasi, this.statusSkala,
        this.statusCatatan, this.statusLampiran, this.$route.params.id_perkuliahan, this.identity.preferred_username)
      console.log(tugasBaru)
      this.$emit("close")
      location.reload()
    }
  }

}
</script>

<style scoped>
</style>
