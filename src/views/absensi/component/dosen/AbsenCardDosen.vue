<template>
  <v-sheet class="mx-auto" max-width="1000">
    <v-slide-group
      class="d-flex align-center pr-15"
      show-arrows
      value="3"
    >
      <v-slide-item
        v-for="(item, index) in jadwalDsn"
        :key="index"
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
            <h3 class="pt-0 pb-5 text-center"> {{item.mata_kuliah.nama_mata_kuliah}} <br/> {{item.jenis}}</h3>
            <v-spacer></v-spacer>
            <div>
              <v-card-actions class="justify-center">
                <v-btn
                  :disabled="statusKehadiranMahasiswa(item.id_jadwal)"
                  elevation="2"
                  rounded
                  class="ma-5"
                  color="#4CAF50"
                  width="120"
                  @click="presensiDosen(index, item.id_studi, item.id_jadwal)"
                > Hadir</v-btn>
              </v-card-actions>
            </div>
            <div>
              <v-card-actions class="justify-center">
                <v-btn
                  @click="toPerkuliahan(index, item)"
                  elevation="2"
                  rounded
                  class="mb-5 pt-0"
                  width="150"
                  color="#FB8C00"
                > Perkuliahan</v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex"
import PresensiDosen from "@/datasource/network/absensi/PresensiDosen"

// const THIRTY_MINUTES = 1000 * 60 * 30

export default {
  name: "AbsenCardDosen",
  created () {
    var current = new Date()
    this.currentDay = current.getDay()
  },
  props: {
    jadwalDsn: {
      type: Array,
      default () {
        return {}
      }
    },

    dosen: {
      type: Object,
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
    presensiDosen (index, idStudi, idJadwal) {
      PresensiDosen.presensiDosen(199112182019032000, idStudi, idJadwal)
        .then(response => {
          this.jadwalDsn[index].absen = false
          console.log("Dosen telah absen untuk jadwal " + idStudi)
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
    },
    statusKehadiranMahasiswa (idJadwal) {
      PresensiDosen.getStatusKehadiran(199112182019032000, idJadwal, this.currentDate)
        .then(response => {
          this.dosen = response.result
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
    },
    toPerkuliahan (index, item) {
      console.log(index)
      this.$router.push({ name: "Perkuliahan", params: { item } })
    }
  }
}
</script>
