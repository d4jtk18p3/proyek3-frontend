<template>
    <v-container >
      <v-row class="mt-0 mb-0">
        <v-col cols="12">
            Kegiatan
            <vue-editor
              v-model="kegiatan"
              class="mt-3 mb-0 elevation-2"
              disabled
            ></vue-editor>
        </v-col>
      </v-row>
      <v-row class="mt-0 mb-0">
        <v-col cols="12">
            Hasil>
            <vue-editor
              v-model="hasil"
              class="mt-3 mb-0 elevation-2"
              disabled
            ></vue-editor>
        </v-col>
      </v-row>
      <v-row class="mt-0 mb-0">
        <v-col cols="12">
            Kesan
            <vue-editor
              v-model="kesan"
              class="mt-3 mb-0 elevation-2"
              disabled
            ></vue-editor>
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
import { VueEditor } from "vue2-editor"
export default {
  name: "ViewDetailLogbookItem",
  components: { VueEditor },
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
    nim: {
      type: String,
      required: false
    },
    nama: {
      type: String,
      required: false
    },
    namaMataKuliah: {
      type: String,
      required: false,
      default: "Proyek 1"
    },
    prodi: {
      type: String,
      required: false,
      default: "D4 - Teknik Informatika"
    },
    kelasString: {
      type: String,
      required: false
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
        path: "/logbook/logbook-mahasiswa/" + this.prodi + "/" + this.namaMataKuliah + "/" + this.kelasString + "/" + this.nim,
        params: {
          nim: this.nim,
          nama: this.nama,
          namaMataKuliah: this.namaMataKuliah,
          kelasString: this.kelasString,
          prodi: this.prodi
        }
      })
      this.$router.go(1)
    }
  }
}
</script>

<style>
</style>
