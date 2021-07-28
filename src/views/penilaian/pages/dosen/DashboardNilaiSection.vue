<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Dashboard Nilai Mata Kuliah</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col :cols="isMobile ? `12` : `3` " :offset="isMobile ? `0` : `0`">
        <p
        class="text-left font-weight-bold text-h5"
        :style="{color: currentTheme.onBackground}"
        >Kelas</p>
        <v-item-group>
        <v-card link class="mb-3" v-for="item in listKelas" :key="item.Kelas">
          <v-item v-slot="{ active, toggle }">
            <KelasItem :kelas="item.kode_kelas" @click.native="getMatkulbyKelas(item) + toggle()" :bgcolor="active ? '#FB8C00' : currentTheme.surface"/>
          </v-item>
        </v-card>
        </v-item-group>
    </v-col>
    <v-divider v-if="!isMobile" vertical class="mx-5"></v-divider>
    <v-col sm="8">
    <p
    class="text-left font-weight-bold text-h5"
    :style="{color: currentTheme.onBackground}"
    >Mata Kuliah</p>
    <v-row v-if="listMatkul">
        <v-col
          no-gutters v-for="(item, index) in listMatkul" :key="item.Matkul"
          sm="4"
        >
          <NilaiMataKuliah :mataKuliah="item.nama_mata_kuliah" :semester="item.semester" :idMatkul="item.id" :idPerkuliahan="id_perkuliahan[index]" :onMatkulClicked="routeDashboardNilai"/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import NilaiMataKuliah from "@/views/penilaian/component/dosen/NilaiMataKuliah"
import KelasItem from "@/views/template/component/absensi/KelasItem"
import DosenAPI from "@/datasource/network/penilaian/PenilaianDosen"

export default {
  name: "AbsensiDosenMain",
  components: { KelasItem, NilaiMataKuliah, Breadcumbs },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Penilaian",
          disabled: false,
          href: "/penilaian"
        },
        {
          text: "Dashboard Nilai Dosen Pengampu",
          disabled: false,
          href: "/penilaian/dashboard-nilai-dosen-pengampu"
        }
      ],
      nip: null,
      listKelas: [
        { id_kelas: 0, Kelas: "1A - D3 Teknik Informatika" },
        { id_kelas: 1, Kelas: "2A - D3 Teknik Informatika" },
        { id_kelas: 2, Kelas: "1A - D4 Teknik Informatika" }
      ],
      listMatkul: [
        // { id_matkul: 0, Matkul: "Proyek 3" },
        // { id_matkul: 1, Matkul: "APPL 2" },
        // { id_matkul: 2, Matkul: "Pengantar Angkungtangsi" }
      ],
      id_perkuliahan: null
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
    async getMatkulbyKelas (kodeKelas, index) {
      // console.log(kodeKelas)
      const matkul = await DosenAPI.getMatkul(this.nip, kodeKelas.kode_kelas)
      this.id_perkuliahan = matkul.id_perkuliahan
      this.listMatkul = matkul.listMatkul
    },
    routeDashboardNilai (id) {
      // this.$router.push({ URL: "dashboard-nilai-dosen-pengampu/" + this.id_perkuliahan, params: { id: this.id_perkuliahan } })
      this.$router.push("dashboard-nilai-dosen-pengampu/" + id)
    }
  },
  async mounted () {
    const identity = this.$store.getters.identity
    this.nip = identity.preferred_username // "196610181995121000"
    const kelas = await DosenAPI.getKelas(this.nip)
    this.listKelas = kelas.uniqueClass
  }
}
</script>
