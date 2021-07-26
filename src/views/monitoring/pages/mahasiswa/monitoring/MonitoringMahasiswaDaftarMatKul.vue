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
        class="text-left font-weight-bold text-h5"
        :style="{color: currentTheme.onBackground}"
        >Mata Kuliah</p>
        <v-card link class="mb-3" v-for="item in listMatkul" :key="item.id" @click="getIdMatkul(item.nama, item.id)">
          <MatkulItem :mataKuliah="item.nama"></MatkulItem>
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
          no-gutters v-for="item in listTugas" :key="item.id"
          :cols="isMobile? 12 : 6"
        >
          <TugasItem :id="item.id" :tugas="item.nama" :Perkuliahan="idPerkuliahan" :Matkul=nama></TugasItem>
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
import MatkulMonitoringMahasiswa from "../../../../../datasource/network/monitoring/matakuliah"
import PerkuliahanMonitoringMahasiswa from "../../../../../datasource/network/monitoring/monitoringbersama"

export default {
  name: "AbsensiDosenMain",
  components: { MatkulItem, Breadcumbs, TugasItem },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Monitoring",
          disabled: false,
          href: ""
        },
        {
          text: "Tugas",
          disabled: true,
          href: ""
        },
        {
          text: "Lihat Monitoring Teman",
          disabled: true,
          href: ""
        }
      ],
      listMatkul: [
      ],
      listTugas: [
      ],
      idPerkuliahan: 0,
      nama: ""
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
    identity: function () {
      return this.$store.getters.identity
    }
  },
  methods: {
    async getIdMatkul (nama, id) {
      var coba = await PerkuliahanMonitoringMahasiswa.getidperkuliahan(this.identity.preferred_username, id)
      this.nama = nama
      var Tugas = await TugasMonitoringMahasiswa.getTugasMatkulMahasiswa(id, coba)
      var i = 0
      var tugasList = []
      this.idPerkuliahan = Tugas.perkuliahan[0].id
      while (i < Tugas.listTugas.length) {
        tugasList.push({
          id: Tugas.listidTugas[i],
          nama: Tugas.listTugas[i]
        })
        i++
      }
      this.listTugas = tugasList
    }
  },
  async mounted () {
    var Matkul = await MatkulMonitoringMahasiswa.getMatkulMahasiswa(this.identity.preferred_username)
    var i = 0
    var matkulList = []
    while (i < Matkul.length) {
      matkulList.push({
        id: Matkul[i].id,
        nama: Matkul[i].nama_mata_kuliah
      })
      i++
    }
    this.listMatkul = matkulList
  }
}
</script>
