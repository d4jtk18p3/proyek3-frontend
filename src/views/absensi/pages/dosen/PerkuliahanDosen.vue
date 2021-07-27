<template>
<v-container>
 <v-row :style="{color: currentTheme.onBackground}">
  <v-col cols="12">
   <p class="text-h4 font-weight-bold">Perkuliahan</p>
  </v-col>
  <v-col cols="12">
   <breadcumbs :breadcrumb-items="breadcrumbItems"/>
  </v-col>
 </v-row>
 <v-row>
    <HeaderPerkuliahan :item="item"></HeaderPerkuliahan>
 </v-row>
  <v-divider>
    </v-divider>
  <br>
  <v-row :style="{ color: currentTheme.onBackground }">
    <v-col>
      <p class="text-h4 font-weight-bold">Daftar Kehadiran Mahasiswa</p>
    </v-col>
    <v-col justify="end"
    cols = "2">
      <UploadBAP></UploadBAP>
    </v-col>
  </v-row>
    <TabelAbsensi :perkuliahan="item">
    </TabelAbsensi>
</v-container>
</template>

<script>
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import { mapGetters } from "vuex"
import HeaderPerkuliahan from "@/views/absensi/component/perkuliahan/HeaderPerkuliahan"
import UploadBAP from "@/views/absensi/component/perkuliahan/UploadBAP"
import TabelAbsensi from "@/views/absensi/component/perkuliahan/TabelAbsensi"

export default {
  name: "PerkuliahanDosen",
  props: {
    item: {
      type: Array,
      default () {
        return {}
      }
    }
  },
  components: { Breadcumbs, HeaderPerkuliahan, UploadBAP, TabelAbsensi },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Dashboard",
          disabled: false,
          href: "absensi"
        },
        {
          text: "Perkuliahan",
          disabled: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  methods: {
    getData () {
      console.log(this.item)
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
