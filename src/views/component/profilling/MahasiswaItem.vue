<template>
  <div>
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
        <v-col cols="12" class="mt-3 py-0 px-lg-10 px-xl-10 px-md-10 px-sm-10 px-0">
          <v-alert
            dense
            text
            type="success"
            v-if="dataMahasiswa.isUKTLunas"
          >UKT LUNAS
          </v-alert>
          <v-alert
            dense
            text
            type="warning"
            v-else
          >UKT BELUM LUNAS
          </v-alert>
        </v-col>
        <v-col xl="6" lg="6" md="6" sm="6" cols="12" class="mt-3 py-0 d-flex align-content-center  rounded-lg" :class="isXS ? 'justify-center' : 'justify-end'">
          <v-btn
            small
            @click="onDataPribadiClicked"
          >
            Data Pribadi
          </v-btn>
        </v-col>
        <v-col xl="6" lg="6" md="6" sm="6" cols="12" class="mt-3 py-0 d-flex align-content-center rounded-lg" :class="isXS? 'justify-center ' : 'justify-start '">
          <v-btn
            small
            @click="onDataOrangTuaClicked"
          >
            Data OrangTua
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
          nama: "Nama Mahasiswa",
          isUKTLunas: true,
          nim: "181524000",
          profilePicURL: defaultImage
        }
      }
    },
    index: {
      type: Number,
      default: 0
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
    onDataPribadiClicked () {
      this.$emit("data-pribadi-clicked", this.index)
    },
    onDataOrangTuaClicked () {
      this.$emit("data-orang-tua-clicked", this.index)
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
