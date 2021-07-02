<template>
  <v-container>
   <v-row no-gutters class="header">
      <v-col>
        <v-row no-gutters :style="{ color: currentTheme.onBackground }">
          <v-col cols="4">
            <h2>Mata Kuliah</h2>
          </v-col>
          <v-col>
            <h2> : {{perkuliahan[0]}} </h2>
          </v-col>
        </v-row>
        <v-row no-gutters :style="{ color: currentTheme.onBackground }">
          <v-col cols="4">
            <h2>Kelas</h2>
          </v-col>
          <v-col>
            <h2>  : {{perkuliahan[1]}} </h2>
          </v-col>
        </v-row >
        <v-row no-gutters :style="{ color: currentTheme.onBackground }">
          <v-col cols="4">
            <h2>Tanggal</h2>
          </v-col>
          <v-col>
            <h2>  : {{perkuliahan[2]}} </h2>
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
  data () {
    return {
      perkuliahan: ["Sistem Terdistribusi", "3A - D4 Teknik Informatika", "24 Maret 2021"],
      jumlahMahasiswa: 32
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    })
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
