<template>
  <v-card
    class="rounded-card rounded-lg"
    elevation="10"
    @click="onCardClick"
  >
    <v-row class="pa-4 ma-0" :style="isDark ? {background : currentTheme.colorSecondary} : {background : currentTheme.colorPrimary}">
      <v-col align-self="center" class="pa-0 ma-0"
      cols="10">
        <div
          class="text-h5 text-uppercase font-weight-Light"
          :style="isDark ? {color : currentTheme.colorOnSecondary} : {color : currentTheme.colorOnPrimary}"
        >{{ dataMahasiswa.nama }}</div>
        <div
        v-if="isMobile"
          class="caption text-capitalize font-weight-medium"
          :style="isDark ? {color : currentTheme.colorOnSecondary} : {color : currentTheme.colorOnPrimary}"
        >{{ dataMahasiswa.nim }}</div>
      </v-col>
      <v-col cols="2" class="pa-0 ma-0" v-if="isMobile">
        <v-avatar color="#C4C4C4">
          <img
            :src="dataMahasiswa.profilePicURL"
            alt="Foto Mahasiswa"
          />
        </v-avatar>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"
const defaultImage = "https://firebasestorage.googleapis.com/v0/b/proyek3-95653.appspot.com/o/DSC_0020_2.jpg?alt=media&token=ec10fda4-20c1-410d-bce1-b870be48774c"
export default {
  name: "MahasiswaItem",
  props: {
    dataMahasiswa: {
      type: Object,
      required: false,
      default: () => {
        return {
          nama: "Cecep Gorbacep",
          nim: "181524000",
          profilePicURL: defaultImage
        }
      }
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
    },
    isXS () {
      return this.$vuetify.breakpoint.xs
    }
  },
  methods: {
    onCardClick () {
      var mahasiswa = {
        nama: this.dataMahasiswa.nama,
        nim: this.dataMahasiswa.nim,
        kelasString: this.kelasString,
        prodi: this.prodi,
        matakuliah: this.namaMataKuliah
      }
      this.$router.push({
        name: "ListLogbook",
        path: "/logbook/logbook-mahasiswa/" + this.prodi + "/" + this.mataKuliah + "/" + this.kelasString + "/" + this.dataMahasiswa.nim,
        params: {
          nim: this.dataMahasiswa.nim,
          identitas: mahasiswa
        }
      })
      this.$router.go(1)
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-content: center;
  z-index: 100;
}

.avatar-class {
  position: relative;
  top: 90px;
}

.card-class {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.card-content {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
</style>
