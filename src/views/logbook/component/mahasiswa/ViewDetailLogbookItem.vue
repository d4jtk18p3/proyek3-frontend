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
            Hasil
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
  name: "FormEditLogbookItem",
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
