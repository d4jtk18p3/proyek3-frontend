<template>
  <v-container>
   <v-row no-gutters class="header">
      <v-col>
        <v-row no-gutters :style="{ color: currentTheme.onBackground }">
          <v-col cols="4">
            <h2>Mata Kuliah</h2>
          </v-col>
          <v-col>
            <h2> : {{item.mata_kuliah.nama_mata_kuliah}} </h2>
          </v-col>
        </v-row>
        <v-row no-gutters :style="{ color: currentTheme.onBackground }">
          <v-col cols="4">
            <h2>Kelas</h2>
          </v-col>
          <v-col>
            <h2>  : {{item.kelas.kode_kelas}} </h2>
          </v-col>
        </v-row >
        <v-row no-gutters :style="{ color: currentTheme.onBackground }">
          <v-col cols="4">
            <h2>Tanggal</h2>
          </v-col>
          <v-col>
            <h2>  : {{date}} </h2>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        justify="end"
        cols = "2">
        <v-card
        height="110px"
        elevation="2"
        :color= "currentTheme.onSurface"
        :style="{ color: currentTheme.colorOnPrimary }"
        align="center"
        justify="center">
        <v-form class="formmhs">
           <p>Jumlah Mahasiswa</p>
           <h1>{{jumlahMahasiswa}}</h1>
           <p>Mahasiswa</p>
        </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import { mapGetters } from "vuex"

export default {
  props: ["item"],
  data () {
    return {
      jumlahMahasiswa: 32,
      d: new Date(),
      date: "",
      months: [
        "January", "February",
        "March", "April", "May",
        "June", "July", "August",
        "September", "October",
        "November", "December"
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    })
  },
  beforeMount () {
    var month = "" + (this.d.getMonth() + 1)
    var day = "" + this.d.getDate()
    var year = this.d.getFullYear()
    this.date = day + " " + this.months[month] + " " + year
  }
}
</script>

<style scoped>
.formmhs {
  padding: 8px;
}
.header {
  padding-bottom: 20px;
}
p {
  margin : 0px;
}
</style>
