<template>
  <v-sheet class="mx-auto" max-width="1000">
    <v-slide-group
      v-model="model"
      class="d-flex align-center pr-15"
      show-arrows
      value="3"
    >
      <v-slide-item
        v-for="(item, index) in jadwalMhs"
        :key="item"
        class="d-flex align-self-center"
      >
        <v-col>
          <v-card
            class="text-center justify-center rounded-xl d-flex flex-column"
            width="255"
            height="300"
          >
            <v-card-text
              class="pb-0"
            > #{{item.id_studi}}</v-card-text>
            <h3 class="pt-0 text-center"> {{item.nama_mata_kuliah}} <br/> {{item.jenis}}</h3>
            <v-row justify="center">
              <v-col cols="1" class="mr-0">
                <v-avatar>
                  <v-icon>
                    mdi-account-circle
                  </v-icon>
                </v-avatar>
              </v-col>
              <v-col cols="10" >
                <v-card-text class="pb-0"> {{item.dosens[0].nama}}</v-card-text>
              </v-col>
            </v-row>
            <v-spacer></v-spacer>
            <v-card-actions class="justify-center">
              <v-btn
                v-if="item.absen"
                elevation="2"
                rounded
                class="ma-5"
                color="#4CAF50"
                width="120"
                @click="presensiMahasiswa(index, item.id_studi, item.id_jadwal)"
              > Hadir</v-btn>
              <v-btn
                v-else
                elevation="2"
                rounded
                class="ma-5"
                disabled
                width="120"
              > Hadir</v-btn>
            </v-card-actions>

          </v-card>
        </v-col>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex"
import PresensiMahasiswa from "../../../../datasource/api/absensi/PresensiMahasiswa"

// const THIRTY_MINUTES = 1000 * 60 * 30

export default {
  name: "AbsenCard",
  props: {
    jadwalMhs: {
      type: Array,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  methods: {
    presensiMahasiswa (index, idStudi, idJadwal) {
      PresensiMahasiswa.presensiMahasiswa(idStudi, idJadwal)
        .then(response => {
          this.jadwalMhs[index].absen = false
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
    },
    presensiSchedule () {
      // const schedule = require("node-schedule")
      const startTime = new Date(Date.now() + 5000)
      console.log(startTime)
      console.log(startTime.getTime())
      // for (var i in this.jadwalMhs) {
      //   const startTime = new Date(this.jadwalMhs[i].waktu_mulai - THIRTY_MINUTES)
      //   const endTime = new Date(this.jadwalMhs[i].waktu_mulai + THIRTY_MINUTES)
      //   schedule.scheduleJob({ start: startTime, end: endTime, rule: "*/1 * * * * *" }, function () {
      //     console.log("Time for tea!")
      //   })
      // }

      // schedule.scheduleJob("5 * * * * *", function () {
      //   console.log("The answer to life, the universe, and everything!")
      // })
    }
  },
  beforeMount () {
    this.presensiSchedule()
  }
}
</script>
