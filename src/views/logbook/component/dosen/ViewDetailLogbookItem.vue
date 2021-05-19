<template>
    <v-container >
      <v-row class="mt-0 mb-0">
        <v-col cols="12">
            Kegiatan
            <v-textarea
                v-model="kegiatan"
                outlined
                class="mt-3 mb-0"
                :dark="isDark"
                color="#272343"
                readonly
            ></v-textarea>
        </v-col>
      </v-row>
      <v-row class="mt-0 mb-0">
        <v-col cols="12">
            Hasil
            <v-textarea
                v-model="hasil"
                outlined
                class="mt-3 mb-0"
                :dark="isDark"
                color="#272343"
                readonly
            ></v-textarea>
        </v-col>
      </v-row>
      <v-row class="mt-0 mb-0">
        <v-col cols="12">
            Kesan
            <v-textarea
                v-model="kesan"
                outlined
                class="mt-3 mb-0"
                :dark="isDark"
                color="#272343"
                readonly
            ></v-textarea>
        </v-col>
      </v-row>
      <v-row class="mt-0 mb-0" justify="center">
        <v-btn
          color="#59DCDC"
          class="white--text mt-5"
          elevation="5"
          @click="onClickKembali"
        >
          Kembali
        </v-btn>
      </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "ViewDetailLogbookItem",
  props: {
    kegiatan: {
      type: String,
      required: false,
      default: () => {
        return ""
      }
    },
    hasil: {
      type: String,
      required: false,
      default: () => {
        return ""
      }
    },
    kesan: {
      type: String,
      required: false,
      default: () => {
        return ""
      }
    },
    identitas: {
      type: Object,
      required: false,
      default: () => {
        return {
          nama: "Cecep Gorbacep",
          nim: "181524000",
          kelas: "3A",
          prodi: "D4 - Teknik Informatika",
          matakuliah: "Proyek 3"
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  },
  methods: {
    onClickKembali () {
      this.$router.push({
        name: "ListLogbook",
        path: "/logbook/logbook-mahasiswa/" + this.identitas.prodi + "/" + this.identitas.matakuliah + "/" + this.identitas.kelas + "/" + this.identitas.nim,
        params: {
          nim: this.identitas.nim,
          identitas: this.identitas
        }
      })
      this.$router.go(1)
    }
  }
}
</script>

<style>
</style>
