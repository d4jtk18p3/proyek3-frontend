<template>
  <v-container>
    <v-row :style="{ color: currentTheme.onBackground }">
      <v-col cols="3.5">
        <p class="text-h4 font-weight-bold">Absensi Perkuliahan</p>
      </v-col>
      <v-col cols="4">
        <v-divider
        class="mt-5"
        ></v-divider>
      </v-col>
      <v-col cols="4">
        <v-btn
          class="ml-5"
          color="#FB8C00">
          + AJUKAN IZIN PERKULIAHAN
        </v-btn>
      </v-col>
      <v-col cols="12">
        <breadcumbs :breadcrumb-items="breadcrumbItems" />
      </v-col>
      <AbsenCard/>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/ui/Breadcumbs"
import AbsenCard from "@/views/template/component/absensi/AbsenCard"

export default {
  name: "AbsensiMahasiswa",
  components: { Breadcumbs, AbsenCard },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Dashboard",
          disabled: false,
          href: ""
        },
        {
          text: "Link 1",
          disabled: false,
          href: ""
        },
        {
          text: "Link 2",
          disabled: true,
          href: ""
        }
      ],
      date: new Date().toISOString().substr(0, 10),
      menu: false
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
  // methods: {
  //   itemRowBackground: function (isDark) {
  //     return isDark ? "white" : "black"
  //   }
  // }
}

</script>
