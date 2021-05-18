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
  name: "FormEditLogbookItem",
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
        path: "/logbook/mylogbook"
      })
    }
  }
}
</script>

<style>
</style>
