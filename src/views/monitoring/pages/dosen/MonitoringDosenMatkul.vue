<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Monitoring Tugas</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col :cols="isMobile ? `12` : `3` " :offset="isMobile ? `0` : `0`">
        <p
        class="text-left font-weight-bold text-h5 mt-5"
        :style="{color: currentTheme.onBackground}"
        >Kelas</p>
        <v-card link class="mb-3" v-for="item in listKelas" :key="item" @click="getIdKelas(item)">
          <KelasItem :kelas="item"/>
        </v-card>
    </v-col>
    <v-divider v-if="!isMobile" vertical class="mx-5"></v-divider>
    <v-col :cols="isMobile? 12 : 8">
      <p
      class="text-left font-weight-bold text-h5"
      :style="{color: currentTheme.onBackground}"
      >Mata Kuliah</p>
      <v-row>
        <v-col
          no-gutters v-for="item in listMatkul" :key="item.id"
          :cols="isMobile? 12 : 6"
        >
          <MatkulItem :mataKuliah="item.nama" :idMatkul="item.id" :idPerkuliahan="item.id_perkuliahan" :semester="item.semester" :kelas="kelas"></MatkulItem>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import MatkulItem from "@/views/monitoring/component/dosen/MataKuliahItem"
import KelasItem from "@/views/monitoring/component/dosen/KelasItem"
import KelasMonitoringDosen from "../../../../datasource/network/monitoring/kelas"
import MatkulMonitoringDosen from "../../../../datasource/network/monitoring/matakuliah"
export default {
  name: "AbsensiDosenMain",
  components: { KelasItem, MatkulItem, Breadcumbs },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Monitoring",
          disabled: false,
          href: "/monitoring/dosen/monitoring-tugas"
        },
        {
          text: "Daftar Tugas",
          disabled: true,
          href: ""
        },
        {
          text: "Monitoring Subtugas",
          disabled: true,
          href: ""
        },
        {
          text: "Detail Subtugas",
          disabled: true,
          href: ""
        }
      ],
      listKelas: [],
      listMatkul: [],
      kelas: ""
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
    identity: function () {
      return this.$store.getters.identity
    }
  },
  methods: {
    async getIdKelas (item) {
      if (item != null) {
        this.kelas = item
        var temp = item.substr(0, 4)
      }
      var matkul = await MatkulMonitoringDosen.getMatkulKelas(this.identity.preferred_username, temp)
      var matkulList = []
      var j = 0
      while (j < matkul.listMatkul.length) {
        matkulList.push({
          id: matkul.listMatkul[j].id,
          nama: matkul.listMatkul[j].nama_mata_kuliah,
          semester: matkul.listMatkul[j].semester,
          id_perkuliahan: matkul.id_perkuliahan[j]
        })
        j++
      }
      this.listMatkul = matkulList
    }
  },
  async mounted () {
    var kelas = await KelasMonitoringDosen.getListKelas(this.identity.preferred_username)
    var i = 0
    var kelasList = []
    while (i < kelas.length) {
      kelasList[i] = kelas[i].kode_kelas + " - " + kelas[i].kode_program_studi
      i++
    }
    this.listKelas = kelasList
  }
}
</script>
