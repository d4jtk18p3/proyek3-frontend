<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Dashboard</p>
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-row class="mt-2">
      <v-col v-if="isMobile"
          cols="6"
          md="3"
          class="ml-16"
        >
          <Kalender/>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-card
            class="pa-3 rounded-card rounded-lg ma-3"
            :style="{background: '#FB8C00'}"
            elevation="0"
          >
            <div class="text-h7 font-weight-medium ml-2 " :style="{color : isDark ? currentTheme.onSurface : currentTheme.surface}">Tugas</div>
          </v-card>
          <Tugas/>
        </v-col>
        <v-col
          :cols="12"
          md="3"
        >
          <Pintasan/>
          <TambahPintasan/>
        </v-col>
        <v-col v-if="!isMobile"
          cols="6"
          md="3"
          class="ml-16"
        >
          <Kalender/>
        </v-col>
      </v-row>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import Pintasan from "@/views/monitoring/component/mahasiswa/dashboard/Pintasan"
import TambahPintasan from "@/views/monitoring/component/mahasiswa/dashboard/TambahPintasan"
import Kalender from "@/views/monitoring/component/mahasiswa/dashboard/Kalender"
import Tugas from "@/views/monitoring/component/mahasiswa/dashboard/Tugas"

export default {
  name: "Dashboard",
  components: { Pintasan, Kalender, TambahPintasan, Tugas, Breadcumbs },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Dashboard",
          disabled: true,
          href: ""
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  }
}
</script>
