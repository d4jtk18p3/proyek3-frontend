<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Logbook Mahasiswa</p>
    </v-col>
    <v-col cols="12">
        <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col cols="12">
        <p
          class="text-center font-weight-bold text-h5"
          :style="{color: currentTheme.onBackground}"
        >Mata Kuliah</p>
    </v-col>
    <v-col :cols="isMobile ? 12 : 4" v-for="(item, index) in listMataKuliah" :key="index">
        <MataKuliahItem :mataKuliah="item.namaMataKuliah" :prodi="item.prodi" :listKelas="item.listKelas"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import MataKuliahItem from "@/views/logbook/component/dosen/MataKuliahItem"

export default {
  name: "LogbookMahasiswa",
  components: { Breadcumbs, MataKuliahItem },
  props: {
    listMataKuliah: {
      type: Array,
      required: false,
      default: () => {
        return [
          {
            namaMataKuliah: "Proyek 2",
            prodi: "D3 - Teknik Informatika",
            listKelas: ["1A", "1B"]
          },
          {
            namaMataKuliah: "Proyek 1",
            prodi: "D4 - Teknik Informatika",
            listKelas: ["1A", "1B"]
          },
          {
            namaMataKuliah: "Proyek 4",
            prodi: "D3 - Teknik Informatika",
            listKelas: ["2A", "2B"]
          },
          {
            namaMataKuliah: "Proyek 6",
            prodi: "D3 - Teknik Informatika",
            listKelas: ["3A", "3B"]
          },
          {
            namaMataKuliah: "Proyek 2",
            prodi: "D4 - Teknik Informatika",
            listKelas: ["2A", "2B"]
          },
          {
            namaMataKuliah: "Proyek 3",
            prodi: "D4 - Teknik Informatika",
            listKelas: ["3A", "3B"]
          }
        ]
      }
    }
  },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Logbook",
          disabled: false,
          href: ""
        },
        {
          text: "Logbook Mahasiswa",
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
