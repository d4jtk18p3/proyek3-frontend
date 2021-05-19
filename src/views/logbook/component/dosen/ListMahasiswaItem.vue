<template>
  <div class="pa-0 ma-0">
    <div class="container">
      <v-avatar
        :width="isMobile? '170' : '200'"
        :height="isMobile? '180' : '210'"
        class="avatar-class"
      >
        <img
          :src="dataMahasiswa.profilePicURL"
          alt="Foto Mahasiswa"
        />
      </v-avatar>
    </div>
    <div
      class="card-class"
    >
      <v-row :style="{background: isDark? currentTheme.colorSecondary : currentTheme.colorPrimary}"
             class="card-content mx-0">
        <v-col class="pa-0 ma-0" cols="12" style="height: 70px;"/>
      </v-row>
      <v-row class="mx-0 pa-3" :style="{background: currentTheme.surface, color: currentTheme.onSurface}">
        <v-col cols="12" class="mt-3 pa-0">
          <div class="text-center text-h6 font-weight-bold">{{dataMahasiswa.nama}}</div>
        </v-col>
        <v-col cols="12" class="mt-0 py-0">
          <div class="text-center text-subtitle-2  font-weight-light">{{dataMahasiswa.nim}}</div>
        </v-col>
        <v-col cols="12"></v-col>
        <v-col xl="12" lg="12" md="12" sm="12" cols="12" class="mt-3 py-0 d-flex align-content-center rounded-lg justify-center">
          <v-btn
            small
            @click="onLihatLogbookClick"
            :color="isDark ? currentTheme.colorSecondary : currentTheme.colorPrimary"
            rounded
            :class="!isDark ? 'white--text' : 'black--text'"
          >
            Lihat Logbook
          </v-btn>
        </v-col>
        <v-col cols="12"></v-col>
      </v-row>
    </div>
  </div>
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
    kelas: {
      type: String,
      required: false,
      default: "1A"
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
    onLihatLogbookClick () {
      var mahasiswa = {
        nama: this.dataMahasiswa.nama,
        nim: this.dataMahasiswa.nim,
        kelas: this.kelas,
        prodi: this.prodi,
        matakuliah: this.namaMataKuliah
      }
      this.$router.push({
        name: "ListLogbook",
        path: "/logbook/logbook-mahasiswa/" + this.prodi + "/" + this.mataKuliah + "/" + this.kelas + "/" + this.dataMahasiswa.nim,
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
