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
                @input="checkProgress"
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
                @input="checkProgress"
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
                @input="checkProgress"
            ></v-textarea>
        </v-col>
      </v-row>
      <v-row class="mt-0 mb-0" justify="center">
        <v-col cols="12">
          <v-progress-linear
          :value="this.progress"
          color="#59DCDC"
          ></v-progress-linear>
        </v-col>
      </v-row>
      <v-row class="mt-0 mb-0" justify="center">
        <v-btn
            color="#59DCDC"
            class="white--text mt-5"
            elevation="5"
          >
            Selesai
          </v-btn>
      </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "FormTambahLogbookItem",
  data () {
    return {
      kegiatan: "",
      hasil: "",
      kesan: "",
      progress: 0
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
  mounted () {
    this.checkProgress()
  },
  methods: {
    checkProgress () {
      if (this.kegiatan !== "" || this.hasil !== "" || this.kesan !== "") {
        this.progress = 100 / 3
      }
      if ((this.kegiatan !== "" && this.hasil !== "") || (this.kegiatan !== "" && this.kesan !== "") || (this.kesan !== "" && this.hasil !== "")) {
        this.progress = 100 * 2 / 3
      }
      if (this.kegiatan !== "" && this.hasil !== "" && this.kesan !== "") {
        this.progress = 100
      }
      if (this.kegiatan === "" && this.hasil === "" && this.kesan === "") {
        this.progress = 0
      }
    }
  }
}
</script>

<style>
</style>
