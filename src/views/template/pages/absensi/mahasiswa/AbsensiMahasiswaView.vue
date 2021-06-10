<template>
  <v-container>
    <v-row :style="{ color: currentTheme.onBackground }">
      <v-col cols="12">
        <p class="text-h4 font-weight-bold">Absensi Mahasiswa</p>
      </v-col>
      <v-col cols="12">
        <breadcumbs :breadcrumb-items="breadcrumbItems" />
      </v-col>
    </v-row>
    <v-row :style="{ color: currentTheme.onBackground }">
      <v-col :cols="isMobile ? `12` : `3` ">
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="30"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-if="isDark"
              v-model="date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              :color="currentTheme.colorOnPrimary"
              dark
              class="pr-16"
            ></v-text-field>
            <v-text-field
              v-else
              v-model="date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              :color="currentTheme.colorOnSecondary"
              light
              class="pr-16"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            v-if="isDark"
            dark
            @input="menu2 = false"
            :header-color="currentTheme.colorPrimary"
            :color="currentTheme.colorSecondaryVariant"
          ></v-date-picker>
          <v-date-picker
            v-model="date"
            v-else
            light
            @input="menu = false"
            :header-color="currentTheme.colorPrimary"
            :color="isDark ? currentTheme.colorSecondaryVariant : currentTheme.colorPrimary"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col :cols="isMobile ? `12` : `3` ">
        <p class="font-weight-bold text-h6">Keterangan</p>
        <ul>
          <li class="font-weight-medium text-subtitle-2">JA : Jam Awal Perkuliahan</li>
          <li class="font-weight-medium text-subtitle-2">JB : Jam Berakhir Perkuliahan</li>
        </ul>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="!isMobile" cols="12">
        <MhsViewTableDekstop/>
      </v-col>
      <v-col v-else cols="12">
        <MhsViewTableMobile/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import MhsViewTableDekstop from "@/views/template/component/absensi/MhsViewTableDekstop"
import MhsViewTableMobile from "@/views/template/component/absensi/MhsViewTableMobile"

export default {
  name: "AbsensiDosenMain",
  components: { Breadcumbs, MhsViewTableDekstop, MhsViewTableMobile },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Absensi",
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
