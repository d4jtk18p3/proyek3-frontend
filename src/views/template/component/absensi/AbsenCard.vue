<template>
  <v-sheet class="mx-auto" max-width="1000">
    <v-slide-group
      v-model="model"
      class="d-flex align-center pr-15"
      show-arrows
      value="3"
    >
      <v-slide-item
        v-for="item in jadwalList"
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
            > {{item.kode}}</v-card-text>
            <h3 class="pt-0 text-center"> {{item.matkul}} <br/> {{item.kategori}}</h3>
            <v-row justify="center">
              <v-col cols="1" class="mr-0">
                <v-avatar>
                  <v-icon>
                    mdi-account-circle
                  </v-icon>
                </v-avatar>
              </v-col>
              <v-col cols="10" >
                <v-card-text class="pb-0"> {{item.dosen}}</v-card-text>
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

export default {
  name: "AbsenCard",

  props: {
    jadwalList: {
      type: Array,
      required: false,
      default: () => {
        return [
          {
            dosen: "Urip Teguh Setihatmojo",
            kode: "#16TIN6023",
            matkul: "Sistem Terdistribusi",
            kategori: "Teori",
            ja: "1",
            jb: "2",
            absen: true,
            hadir: false
          },
          {
            dosen: "Setiadi Rachmat",
            kode: "#16TIN6023",
            matkul: "Sistem Terdistribusi",
            kategori: "Praktek",
            ja: "3",
            jb: "5",
            absen: false,
            hadir: true
          },
          {
            dosen: "Bambang Wisnuadhi",
            kode: "#16TIN6013",
            matkul: "Analisis dan Perancangan Perangkat Lunak 2",
            kategori: "Teori",
            ja: "3",
            jb: "5",
            absen: false,
            hadir: false
          },
          {
            dosen: "Bambang Wisnuadhi",
            kode: "#16TIN6013",
            matkul: "Analisis dan Perancangan Perangkat Lunak 2",
            kategori: "Praktek",
            ja: "7",
            jb: "8",
            absen: false,
            hadir: false
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  }
}
</script>
