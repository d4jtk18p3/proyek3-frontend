<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Dashboard Tugas</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col xl="3" lg="3" md="4" sm="12"  cols="12" class="mt-5">
        <div
        class="text-left text-subtitle-1 font-weight-bold"
        >Tugas</div>
        <v-select
        v-model="tugas"
        :dark="isDark"
        :items="listTugas"
        item-text="nama_tugas"
        item-value="id_tugas"
        item-color="#C4C4C4"
        solo
        dense
        return-object
        v-on:input="setTugas(tugas.id_tugas)"
      >
        </v-select>
    </v-col>
    <v-col xl="3" lg="3" md="4" sm="13"  cols="12" class="mt-0 mt-5">
        <div
        class="text-left text-subtitle-1 font-weight-bold"
        >Mahasiswa</div>
        <v-select
        v-model="mahasiswa"
        :dark="isDark"
        :items="listMahasiswa"
        item-text="Nama"
        item-value="Nim"
        item-color="#C4C4C4"
        solo
        dense
        return-object
        v-on:input="setMhs(mahasiswa.Nim)"
      >
        </v-select>
    </v-col>
    <v-col xl="3" lg="3" md="4" sm="12"  cols="12" class="mt-0 mt-5">
        <div
        class="text-left text-subtitle-1 font-weight-bold"
        >Grafik</div>
        <v-select
        v-model="grafik"
        :dark="isDark"
        :items="listGrafik"
        item-color="#C4C4C4"
        solo
        dense
        v-on:input="setMhs"
      >
        </v-select>
    </v-col>
    <v-col :cols="isMobile? 12 : 8" class="mt-0 mt-5" v-if="grafik=='Progress Pengerjaan'">
      <GraphProgress :valList="valueList" :subTugas="listSubtugas" :namaSub="grafik" :average="rataRata"  :namaMhs="mahasiswa.Nama"/>
    </v-col>
    <v-col :cols="isMobile? 12 : 8" class="mt-0 mt-5" v-if="grafik=='Waktu Pengerjaan'">
      <GraphPemahamanDurasi :valList="valueList" :subTugas="listSubtugas" :namaSub="grafik" :titleGraf="title" :namaMhs="mahasiswa.Nama"/>
    </v-col>
    <v-col :cols="isMobile? 12 : 8" class="mt-0 mt-5" v-if="grafik=='Level Pemahaman'">
      <GraphPemahamanDurasi :valList="valueList" :subTugas="listSubtugas" :namaSub="grafik" :namaMhs="mahasiswa.Nama"/>
    </v-col>
    <v-col :cols="isMobile? 6 : 3" class="mt-5" v-if="grafik == 'Waktu Pengerjaan' || grafik == 'Level Pemahaman'">
      <CardRataRata :RataRata="rataRata" :titleCard="grafik"/>
      <CardAllMahasiswa :RataRata="ratarataAll" :titleCard="grafik"/>
    </v-col>
    <v-col :cols="isMobile? 6 : 3" class="mt-5"  v-if="grafik == 'Progress Pengerjaan'">
      <CardAllMahasiswa :RataRata="ratarataAll" :titleCard="grafik"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import GraphProgress from "@/views/monitoring/component/dosen/GraphProgress"
import GraphPemahamanDurasi from "@/views/monitoring/component/dosen/GraphPemahamanDurasi"
import CardRataRata from "@/views/monitoring/component/dosen/CardRataRata"
import CardAllMahasiswa from "@/views/monitoring/component/dosen/CardAllMahasiswa"
import TugasMonitoringDosen from "../../../../datasource/network/monitoring/tugas"
import SubtugasMonitoringDosen from "../../../../datasource/network/monitoring/subtugas"
export default {
  name: "DashboardDosenMonitoring",
  components: {
    GraphProgress,
    GraphPemahamanDurasi,
    Breadcumbs,
    CardRataRata,
    CardAllMahasiswa
  },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "List Mata Kuliah",
          disabled: false,
          href: "/monitoring/dosen/dashboard-tugas"
        },
        {
          text: "Dashboard Tugas",
          disabled: false,
          href: ""
        }
      ],
      listTugas: [],
      listGrafik: ["Progress Pengerjaan", "Level Pemahaman", "Waktu Pengerjaan"],
      listMahasiswa: [],
      tugas: "",
      grafik: "",
      mahasiswa: "",
      listProgres: [],
      listSkala: [],
      listDurasi: [],
      listSubtugas: [],
      valueList: [],
      ratarataProgres: 0,
      ratarataSkala: 0,
      ratarataDurasi: 0,
      rataRata: "0",
      ratarataAllProgres: 0,
      ratarataAllSkala: 0,
      ratarataAllDurasi: 0,
      ratarataAll: "0",
      title: ""

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
    async setTugas (a) {
      var mhs = await TugasMonitoringDosen.getMahasiswaByTugas(this.tugas.id_tugas)
      var mhsList = []
      var j = 0
      while (j < mhs.listNIMMahasiswa.length) {
        mhsList.push({
          Nim: mhs.listNIMMahasiswa[j],
          Nama: mhs.listNamaMahasiswa[j]
        })
        j++
      }
      this.listMahasiswa = mhsList
    },
    async setMhs (a) {
      var sub = await SubtugasMonitoringDosen.getSubtugasByMahasiswa(this.tugas.id_tugas, this.mahasiswa.Nim)
      var allSub = await SubtugasMonitoringDosen.getAllSubtugasByTugas(this.tugas.id_tugas)
      var k = 0
      var l = 0
      var namaSub = []
      var progres = []
      var skala = []
      var durasi = []
      var totalDurasi = 0
      var totalSkala = 0
      var totalProgres = 0
      var totalAllDurasi = 0
      var totalAllSkala = 0
      var totalAllProgres = 0

      while (k < sub.length) {
        namaSub[k] = sub[k].nama_subtugas
        if (sub[k].progress !== null) {
          progres[k] = sub[k].progress
          totalProgres += progres[k]
        } else {
          progres[k] = 0
        }
        if (sub[k].durasi !== null) {
          durasi[k] = sub[k].durasi
          totalDurasi += durasi[k]
        } else {
          durasi[k] = 0
        }
        if (sub[k].skala_pemahaman !== null) {
          skala[k] = parseFloat(sub[k].skala_pemahaman)
          totalSkala += skala[k]
        } else {
          skala[k] = 0
        }
        k++
      }
      this.listProgres = progres
      this.listSkala = skala
      this.listDurasi = durasi
      this.listSubtugas = namaSub

      while (l < allSub.length) {
        if (allSub[l].progress !== null) {
          totalAllProgres += allSub[l].progress
        }
        if (allSub[l].durasi !== null) {
          totalAllDurasi += allSub[l].durasi
        }
        if (allSub[l].skala_pemahaman !== null) {
          totalAllSkala += parseFloat(allSub[l].skala_pemahaman)
        }
        l++
      }
      console.log(totalAllSkala)
      if (this.grafik === "Progress Pengerjaan") {
        this.valueList = this.listProgres
        this.ratarataProgres = totalProgres / sub.length
        if (Number.isInteger(this.ratarataProgres) === false) {
          this.ratarataProgres = this.ratarataProgres.toFixed(2)
        }
        this.rataRata = this.ratarataProgres.toString()
        this.ratarataAllProgres = totalAllProgres / allSub.length
        if (Number.isInteger(this.ratarataAllProgres) === false) {
          this.ratarataAllProgres = this.ratarataAllProgres.toFixed(3)
        }
        this.ratarataAll = this.ratarataAllProgres.toString() + "%"
      }
      if (this.grafik === "Level Pemahaman") {
        this.valueList = this.listSkala
        this.ratarataSkala = totalSkala / sub.length
        if (Number.isInteger(this.ratarataSkala) === false) {
          this.ratarataSkala = this.ratarataSkala.toFixed(2)
        }
        this.rataRata = this.ratarataSkala.toString()
        this.ratarataAllSkala = totalAllSkala / allSub.length
        if (Number.isInteger(this.ratarataAllSkala) === false) {
          this.ratarataAllSkala = this.ratarataAllSkala.toFixed(3)
        }
        this.ratarataAll = this.ratarataAllSkala.toString()
      }
      if (this.grafik === "Waktu Pengerjaan") {
        this.valueList = this.listDurasi
        this.ratarataDurasi = totalDurasi / sub.length
        if (Number.isInteger(this.ratarataDurasi) === false) {
          this.ratarataDurasi = this.ratarataDurasi.toFixed(2)
        }
        this.rataRata = this.ratarataDurasi.toString()
        this.title = this.grafik + " (menit)"
        this.ratarataAllDurasi = totalAllDurasi / allSub.length
        if (Number.isInteger(this.ratarataAllDurasi) === false) {
          this.ratarataAllDurasi = this.ratarataAllDurasi.toFixed(3)
        }
        this.ratarataAll = this.ratarataAllDurasi.toString()
      }
      this.ratarataProgres = 0
      this.ratarataSkala = 0
      this.ratarataDurasi = 0
      this.ratarataAllProgres = 0
      this.ratarataAllSkala = 0
      this.ratarataAllDurasi = 0
    }
  },
  async mounted () {
    var tugas = await TugasMonitoringDosen.getTugasMatkul(this.$route.params.id_matkul, this.$route.params.id_perkuliahan)
    var tugasList = []
    var i = 0
    while (i < tugas.listTugas.length) {
      tugasList.push({
        id_tugas: tugas.listidTugas[i],
        nama_tugas: tugas.listTugas[i]
      })
      i++
    }
    this.listTugas = tugasList
  }
}
</script>

<style scoped>

</style>
