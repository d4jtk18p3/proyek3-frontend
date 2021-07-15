<template>
  <v-card
    class="rounded-xl elevation-5"
    @click="onMatkulClick()"
  >
    <v-row class="pa-2 ma-0" style="background: #2196F3">
      <v-col cols="12" align-self="center" class="pa-0 ma-0">
        <div
          class="text-h6 text-center text-uppercase font-weight-bold"
          :style="{color : currentTheme.colorOnPrimary}"
        >{{ mataKuliah }}</div>
      </v-col>
      <v-col cols="12" class="pa-0 ma-0">
        <div
          class="text-subtitle-2 text-center text-capitalize font-weight-medium"
          :style="{color : currentTheme.colorOnPrimary}"
        >{{ prodi }}</div>
      </v-col>
    </v-row>
    <div class="pa-6" :style="{background : currentTheme.surface}">
      <v-row class="pa-0 ma-0">
        <v-col cols="6" class="pa-0 ma-0">
          <div
            class="text-subtitle-2 text-left text-capitalize font-weight-medium"
            style="{color : #000000}"
          >Kode</div>
        </v-col>
        <v-col cols="6" class="pa-0 ma-0">
          <div
            class="text-subtitle-2 text-left text-capitalize font-weight-medium"
            style="{color : #000000}"
          >: {{ kode }}</div>
        </v-col>
        <v-col cols="6" class="pa-0 ma-0">
          <div
            class="text-subtitle-2 text-left text-capitalize font-weight-medium"
            style="{color : #000000}"
          >Semester</div>
        </v-col>
        <v-col cols="6" class="pa-0 ma-0">
          <div
            class="text-subtitle-2 text-left text-capitalize font-weight-medium"
            style="{color : #000000}"
          >: {{ semester }}</div>
        </v-col>
      </v-row>

    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "MataKuliahItem",
  props: {
    kode: {
      type: String,
      required: false
    },
    mataKuliah: {
      type: String,
      required: false
    },
    prodi: {
      type: String,
      required: false
    },
    semester: {
      type: Number,
      required: false
    },
    kelas: {
      type: String,
      required: false
    },
    kelasString: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  methods: {
    onMatkulClick () {
      this.$router.push({
        name: "ListMahasiswa",
        path: "/logbook/logbook-mahasiswa/" + this.prodi + "/" + this.mataKuliah + "/" + this.kelasString,
        params: {
          namaMataKuliah: this.mataKuliah,
          kelasString: this.kelasString,
          prodi: this.prodi
        }
      })
      this.$router.go(1)
    },
    stringKelasToKodeKelas (stringKelas) {
      // harus jadi 1803
      var angkaKelas = parseInt(stringKelas.substr(0, 1)) // "3A" -> 3
      var date = new Date()
      var year = date.getFullYear()

      var kelasAngka = parseInt(year.toString().substr(2, 4)) // 21
      kelasAngka -= angkaKelas // 21 - 3 = 18
      var kelasAngkaString = kelasAngka.toString() // 18 -> "18"
      if (this.prodi === "D4 Teknik Informatika") {
        if (stringKelas.substr(1, 2) === "A") {
          return kelasAngkaString + "03"
        } else if (stringKelas.substr(1, 2) === "B") {
          return kelasAngkaString + "04"
        }
      } else if (this.prodi === "D3 Teknik Informatika") {
        if (stringKelas.substr(1, 2) === "A") {
          return kelasAngkaString + "01"
        } else if (stringKelas.substr(1, 2) === "B") {
          return kelasAngkaString + "02"
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
