<template>
  <v-sheet class="mx-auto" max-width="1000">
    <v-slide-group
      class="d-flex align-center pr-15"
      show-arrows
      value="3"
    >
      <v-slide-item
        v-for="(item, index) in jadwalMhs"
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
            <h3 class="pt-0 pb-5 text-center"> {{item.nama_mata_kuliah}} <br/> {{item.jenis}}</h3>
            <v-row justify="center">
                <v-card-text
                  v-for="(dosen, index) in item.dosens"
                  :key="index" class="pt-0 pb-0">
                  {{dosen.nama}}
                </v-card-text>
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
    }
  }
}
</script>
