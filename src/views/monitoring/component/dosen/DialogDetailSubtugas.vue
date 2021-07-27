<template>
  <v-row>
    <v-dialog v-model="show" max-width="500px">
      <v-card class="mx-auto pa-5" :style="{background: currentTheme.surface}">
        <v-row  :style="{color: currentTheme.onBackground}">
          <v-col cols="12" align="center">
            <p class="text-h5 text-center font-weight-bold">Detail Pengerjaan Subtugas</p>
          </v-col>
        </v-row>

        <v-row  :style="{color: currentTheme.onBackground}">
          <v-col cols="12">
            <div class="text-subtitle-1 font-weight-medium">Nama Subtugas :
              <span class="text-subtitle-1 font-weight-normal">{{subtugas.nama_subtugas}}</span>
            </div>
          </v-col>
        </v-row>

        <v-row  :style="{color: currentTheme.onBackground}">
          <v-col cols="12">
            <div class="text-subtitle-1 font-weight-medium">Status :
              <span class="text-subtitle-1 font-weight-normal" v-if="subtugas.status_subtugas==true">Selesai</span>
              <span class="text-subtitle-1 font-weight-normal" v-if="subtugas.status_subtugas==false">Belum Selesai</span>
            </div>
          </v-col>
        </v-row>

        <v-row  :style="{color: currentTheme.onBackground}" v-if="kriteria.progress==true">
          <v-col cols="12">
            <div class="text-subtitle-1 font-weight-medium">Progress :
              <span class="text-subtitle-1 font-weight-normal">{{subtugas.progress}}%</span>
            </div>
          </v-col>
        </v-row>

        <v-row  :style="{color: currentTheme.onBackground}" v-if="kriteria.skala==true">
          <v-col cols="12">
            <div class="text-subtitle-1 font-weight-medium">Skala Pemahaman :
              <span class="text-subtitle-1 font-weight-normal">{{subtugas.skala_pemahaman}}</span>
            </div>
          </v-col>
        </v-row>

        <v-row  :style="{color: currentTheme.onBackground}" v-if="kriteria.durasi==true">
          <v-col cols="12">
            <div class="text-subtitle-1 font-weight-medium">Durasi Pengerjaan :
              <span class="text-subtitle-1 font-weight-normal">{{subtugas.durasi}} menit</span>
            </div>
          </v-col>
        </v-row>

        <v-row  :style="{color: currentTheme.onBackground}" v-if="kriteria.catatan==true">
          <v-col cols="12">
            <div class="text-subtitle-1 font-weight-medium">Catatan :
              <span class="text-subtitle-1 font-weight-normal">{{subtugas.catatan}}</span>
            </div>
          </v-col>
        </v-row>

        <v-row  :style="{color: currentTheme.onBackground}" v-if="kriteria.lampiran==true">
          <v-col cols="12">
            <div class="text-subtitle-1 font-weight-medium">Lampiran :
              <a :href="subtugas.lampiran" target="_blank" class="text-subtitle-1 font-weight-normal">{{subtugas.lampiran}}</a>
            </div>
          </v-col>
        </v-row>

        <v-row class="mt-0 mb-0" :style="{color: currentTheme.onBackground}">
          <v-col cols="12" align="right">
            <v-btn
            outlined
            :color="isDark? currentTheme.colorSecondary : currentTheme.colorOnSecondary"
            @click="closeDialog()"
            >
              Tutup
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "DetailSubtugas",
  data () {
    return {
      dialogSubTask: false
    }
  },
  props: {
    subtugas: {
      type: Object
    },
    kriteria: {
      type: Object
    },
    visible: {
      type: Boolean
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
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit("close")
        }
      }
    }
  },
  methods: {
    closeDialog () {
      this.$emit("close")
    }
  }

}
</script>

<style scoped>
</style>
