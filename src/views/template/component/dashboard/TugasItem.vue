<template>
  <v-card
    class="rounded-card rounded-lg"
    elevation="10"
  >
    <v-row class="pa-4 ma-0" :style="{background: '#FB8C00'}">
      <v-col cols="12" align-self="center" class="pa-0 ma-0">
        <div
          class="text-h5"
          :style="{color : isDark ? currentTheme.onSurface : currentTheme.surface}"
        >Tugas</div>
      </v-col>
    </v-row>
    <div :style="{background : currentTheme.surface}"
    :class="isMobile ? 'pa-0' : 'pa-6'">
        <v-data-table
            :headers="headers"
            :items="datas"
            :items-per-page="5"
            class="elevation-1"
            v-if="isDark"
            dark
            mobile-breakpoint="100"
        ></v-data-table>
        <v-data-table
            :headers="headers"
            :items="datas"
            :items-per-page="5"
            class="elevation-1"
            v-if="!isDark"
            light
            mobile-breakpoint="100"
        ></v-data-table>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "TugasItem",
  props: {
    datas: {
      type: Array,
      required: false,
      default: () => {
        return [
          {
            judul: "Review ebook",
            tenggat: "19 April 2021"
          },
          {
            judul: "Resume",
            tenggat: "19 April 2021"
          },
          {
            judul: "Logbook 4",
            tenggat: "19 April 2021"
          },
          {
            judul: "WBS",
            tenggat: "19 April 2021"
          },
          {
            judul: "Use Case",
            tenggat: "19 April 2021"
          },
          {
            judul: "Review ebook",
            tenggat: "19 April 2021"
          },
          {
            judul: "Resume",
            tenggat: "19 April 2021"
          },
          {
            judul: "Logbook 4",
            tenggat: "19 April 2021"
          },
          {
            judul: "WBS",
            tenggat: "19 April 2021"
          },
          {
            judul: "Use Case",
            tenggat: "19 April 2021"
          }
        ]
      }
    }
  },
  data () {
    return {
      headers: [
        {
          text: "Judul",
          align: "start",
          value: "judul"
        },
        {
          text: "Tenggat",
          align: "center",
          value: "tenggat"
        }
      ]
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
  }
}
</script>

<style scoped>
</style>
