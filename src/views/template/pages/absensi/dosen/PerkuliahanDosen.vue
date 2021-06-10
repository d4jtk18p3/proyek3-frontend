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
    <HeaderPerkuliahan></HeaderPerkuliahan>
 </v-row>
  <v-divider>
    </v-divider>
  <br>
  <v-row>
    <v-col>
      <p class="text-h4 font-weight-bold">Daftar Kehadiran Mahasiswa</p>
    </v-col>
    <v-col justify="end"
    cols = "2">
      <UploadBAP></UploadBAP>
    </v-col>
  </v-row>
    <TabelAbsensi>
    </TabelAbsensi>
</v-container>
</template>

<script>
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import { mapGetters } from "vuex"
import HeaderPerkuliahan from "@/views/template/component/perkuliahan/HeaderPerkuliahan"
import UploadBAP from "@/views/template/component/perkuliahan/UploadBAP"
import TabelAbsensi from "@/views/template/component/perkuliahan/TabelAbsensi"

export default {
  name: "PerkuliahanDosen",
  components: { Breadcumbs, HeaderPerkuliahan, UploadBAP, TabelAbsensi },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Perkuliahan",
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
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  }
}
</script>
