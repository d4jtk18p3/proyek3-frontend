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
                :timezone="timezone"
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
                  >{{ formattedDate }}
                  </v-text-field>
                </template>
              </vc-date-picker>
          </v-col>
        </v-row>

        <!-- <div v-for="(sub, i) in subtugas" :key="i">
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
        </v-row> -->

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
    // add () {
    //   this.subtugas.push({
    //     label1: "Nama Subtugas",
    //     value1: "",
    //     label2: "Tenggat",
    //     date: new Date()
    //     // date: ("0" + new Date().getDate()).slice(-2) + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" +
    //     //             new Date().getFullYear() + " " + ("0" + new Date().getHours()).slice(-2) + ":" + ("0" + new Date().getMinutes()).slice(-2)
    //   })
    // },
    closeDialog () {
      this.$emit("close")
    },
    async addSubtugas () {
      var subtugasBaru
      var date = this.tenggat
      var d = new Date(date)
      var dateStr = d.toISOString()
      // d.getFullYear() + "-" +
      // ("00" + (d.getMonth() + 1)).slice(-2) + "-" +
      // ("00" + d.getDate()).slice(-2)
      // ("00" + d.getDate()).slice(-2) + " " +
      // ("00" + d.getHours()).slice(-2) + ":" +
      // ("00" + d.getMinutes()).slice(-2) + ":" +
      // ("00" + d.getSeconds()).slice(-2) + "+07"
      // var d = new Date(date)
      // var month = "" + (d.getMonth() + 1)
      // var day = "" + d.getDate()
      // var year = d.getFullYear()
      // var hour = d.getHours()
      // var min = d.getMinutes()

      // if (month.length < 2) {
      //   month = "0" + month
      // }
      // if (day.length < 2) {
      //   day = "0" + day
      // }

      // var dateVal = [year, month, day].join("-")
      console.log(this.namaSubtugas, dateStr)
      subtugasBaru = await SubtugasMonitoringDosen.postSubtugasBaru(this.namaSubtugas,
        dateStr, "2", "1")
      console.log(subtugasBaru)
      this.$emit("close")
      location.reload()
    }
  }

}
</script>

<style scoped>
</style>
