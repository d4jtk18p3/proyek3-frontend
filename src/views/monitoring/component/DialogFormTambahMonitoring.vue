<template>
  <v-row>
    <v-dialog v-model="show" max-width="500px">
      <v-card class="mx-auto pa-5">
        <v-row  :style="{color: currentTheme.onBackground}">
          <v-col cols="12" align="center">
            <p class="text-h4 font-weight-bold">Tambah Monitoring</p>
          </v-col>
        </v-row>

        <v-row  :style="{color: currentTheme.onBackground}">
          <v-col cols="12">
            <p class="text-h6 font-weight-bold">Tugas</p>
          </v-col>
        </v-row>

        <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
          <v-col cols="12">
            <v-text-field
              v-model="namaTugas"
              label="Nama Tugas"
              outlined
              clearable
              :color="currentTheme.colorSecondary"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
          <v-col cols="12">
            <p class="text-h6 font-weight-bold">Kriteria</p>
          </v-col>
        </v-row>
        <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
          <v-col cols="12">
            <v-combobox
              v-model="select"
              :items="items"
              label="Kriteria"
              multiple
              outlined
              dense
              clearable
              :color="currentTheme.colorSecondary"
            ></v-combobox>
          </v-col>
        </v-row> -->

        <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
          <v-col cols="6" align="right">
            <v-btn
            outlined
            :color="currentTheme.colorOnSecondary"
            @click="closeDialog()"
          >
            Batal
          </v-btn>
          </v-col>
          <v-col cols="6" align="left">
            <v-btn
            class=" white--text"
            :color="currentTheme.colorOnSecondary"
            @click="addTugas"
          >
            Submit
          </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogSubTask"
      max-width="500px"
    >
      <v-card>
        <v-card-text>
        <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
          <v-col cols="12">
            <p class="text-h6 font-weight-bold">Subtugas</p>
          </v-col>
        </v-row>

        <div v-for="(sub, i) in subtugas" :key="i">
          <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
            <v-col cols="12">
              <p class="text-h7 font-weight-bold">Subtugas {{i+1}}</p>
            </v-col>
          </v-row>
          <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
            <v-col cols="12">
              <v-text-field
                v-model="sub.value1"
                :label="sub.label1"
                outlined
                clearable
                :color="currentTheme.colorSecondary"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
            <v-col cols="12">
              <v-text-field
                v-model="sub.value2"
                :label="sub.label2"
                outlined
                clearable
                :color="currentTheme.colorSecondary"
              >
              </v-text-field>
              <!-- <v-date-picker v-model="date" mode="dateTime" is24hr>
                <template v-slot="{ inputValue, inputEvents }">
                  <input
                    class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
                    :value="inputValue"
                    v-on="inputEvents"
                  />
                </template>
              </v-date-picker> -->
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
        </v-card-text>
          <v-card-actions>
            <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
              <v-col cols="6" align="right">
                <v-btn
                outlined
                :color="currentTheme.colorOnSecondary"
                @click="dialogSubTask = false"
              >
                Batal
              </v-btn>
              </v-col>
              <v-col cols="6" align="left">
                <v-btn
                class=" white--text"
                :color="currentTheme.colorOnSecondary"
              >
                Simpan
              </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </template>

<script>
import { mapGetters } from "vuex"
import MonitoringDosen from "../../../datasource/api/monitoring/MonitoringDosen"
export default {
  name: "FormAddMonitoring",
  props: ["visible"],
  data () {
    return {
      dialogSubTask: false,
      namaTugas: "",
      subtugas: [],
      date: new Date(),
      select: ["Status", "Skala Pemahaman"],
      items: [
        "Status",
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
      currentTheme: "theme/getCurrentColor"
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
        value2: ""
      })
    },
    closeDialog () {
      this.$emit("close")
    },
    async addTugas () {
      var tugasBaru
      console.log(this.namaTugas)
      tugasBaru = await MonitoringDosen.postTugasBaru(this.namaTugas, "101")
      console.log(tugasBaru)
      this.$emit("close")
      location.reload()
    }
  }

}
</script>

<style scoped>
</style>
