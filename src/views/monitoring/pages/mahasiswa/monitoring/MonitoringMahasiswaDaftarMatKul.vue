<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Monitoring Tugas</p>
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col :cols="isMobile ? `12` : `3` " :offset="isMobile ? `0` : `0`">
        <p
        class="text-left font-weight-bold text-h5"
        :style="{color: currentTheme.onBackground}"
        >Mata Kuliah</p>
        <v-card link class="mb-3" v-for="item in listMatkul" :key="item" @click="getIdMatkul(item)">
          <MatkulItem :mataKuliah="item.idMatkul"></MatkulItem>
        </v-card>
    </v-col>
    <v-divider v-if="!isMobile" vertical class="mx-5"></v-divider>
    <v-col :cols="isMobile? 12 : 8">
      <p
      class="text-left font-weight-bold text-h5"
      :style="{color: currentTheme.onBackground}"
      >Tugas</p>
      <v-row>
        <v-col
          no-gutters v-for="item in listTugas" :key="item"
          :cols="isMobile? 12 : 6"
        >
            <TugasItem :tugas="item"></TugasItem>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import MatkulItem from "@/views/monitoring/component/mahasiswa/monitoring/MatkulItem"
import TugasItem from "@/views/monitoring/component/mahasiswa/monitoring/TugasItem"
import TugasMonitoringMahasiswa from "../../../../../datasource/network/monitoring/tugas"
export default {
  name: "AbsensiDosenMain",
  components: { MatkulItem, Breadcumbs, TugasItem },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Monitoring",
          disabled: true,
          href: ""
        },
        {
          text: "Mata Kuliah",
          disabled: false,
          href: ""
        }
      ],
      listMatkul: [
        {
          idMatkul: "16TIN4014",
          idPerkuliahan: "5"
        },
        {
          idMatkul: "16TIN4024",
          idPerkuliahan: "6"
        }
      ],
      listTugas: [
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
  },
  methods: {
    async getIdMatkul (item) {
      var idPerkuliahan = item.idPerkuliahan
      var idMatkul = item.idMatkul
      this.listTugas = await TugasMonitoringMahasiswa.getTugasMatkul(idMatkul, idPerkuliahan)
      console.log(this.listTugas)
    }
  },
  beforeMount () {
    this.getIdMatkul()
  }
  // async mounted () {
  //   this.listKelas = await MonitoringDosen.getListKelas("196610181995121001")
  //   this.listMatkul = await MonitoringDosen.getMatkulKelas("196610181995121001", "301")
  // }
}
</script>
