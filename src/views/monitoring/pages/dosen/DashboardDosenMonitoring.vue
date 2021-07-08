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
        v-on:input="setGrafik"
      >
        </v-select>
    </v-col>
    <!-- <v-col cols="5" v-if="!isMobile"></v-col> -->
    <v-col xs="12" sm="12" md="12" lg="6" xl="6" class="mt-0 mt-5">
      <GraphProgress :valList="valueList" :subTugas="listSubtugas" :namaSub="grafik"/>
    </v-col>
    <v-col xs="3" sm="3" md="3" lg="2" xl="2" class="mt-5">
      <CardRataRata :RataRata="rataRata"/>
    </v-col>
    <v-col xs="3" sm="3" md="3" lg="3.5" xl="2" class="mt-5">
      <CardAllMahasiswa RataRata= "45%"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import GraphProgress from "@/views/monitoring/component/dosen/GraphProgress"
import CardRataRata from "@/views/monitoring/component/dosen/CardRataRata"
import CardAllMahasiswa from "@/views/monitoring/component/dosen/CardAllMahasiswa"
import TugasMonitoringDosen from "../../../../datasource/network/monitoring/tugas"
import SubtugasMonitoringDosen from "../../../../datasource/network/monitoring/subtugas"
export default {
  name: "DashboardDosen",
  components: {
    GraphProgress,
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
      rataRata: 0
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
  },
  methods: {
    async setTugas (a) {
      console.log(this.tugas.id_tugas)
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
      console.log(mhsList)
      this.listMahasiswa = mhsList
    },
    setGrafik () {
      if (this.grafik === "Progress Pengerjaan") {
        this.valueList = this.listProgres
        this.rataRata = this.ratarataProgres
      }
      if (this.grafik === "Level Pemahaman") {
        this.valueList = this.listSkala
        this.rataRata = this.ratarataSkala
      }
      if (this.grafik === "Waktu Pengerjaan") {
        this.valueList = this.listDurasi
        this.rataRata = this.ratarataDurasi
      }
      this.ratarataProgres = 0
      this.ratarataSkala = 0
      this.ratarataDurasi = 0
      console.log(this.valueList)
    },
    async setMhs (a) {
      console.log(this.mahasiswa.Nim)
      var sub = await SubtugasMonitoringDosen.getSubtugasByMahasiswa(this.tugas.id_tugas, this.mahasiswa.Nim)
      var k = 0
      var namaSub = []
      var progres = []
      var skala = []
      var durasi = []
      while (k < sub.length) {
        namaSub[k] = sub[k].nama_subtugas
        if (sub[k].progress !== null) {
          progres[k] = sub[k].progress
          this.ratarataProgres += sub[k].progress
        } else {
          progres[k] = 0
        }
        if (sub[k].durasi !== null) {
          durasi[k] = sub[k].durasi
          this.ratarataDurasi += sub[k].durasi
        } else {
          durasi[k] = 0
        }
        if (sub[k].skala_pemahaman !== null) {
          skala[k] = parseInt(sub[k].skala_pemahaman)
          this.ratarataSkala += parseInt(sub[k].skala_pemahaman)
        } else {
          skala[k] = 0
        }
        k++
      }
      this.listProgres = progres
      this.listSkala = skala
      this.listDurasi = durasi
      this.listSubtugas = namaSub
    }
  },
  async mounted () {
    var tugas = await TugasMonitoringDosen.getTugasMatkul(this.$route.params.id_matkul, this.$route.params.id_perkuliahan)
    var tugasList = []
    var i = 0
    while (i < tugas.length) {
      tugasList.push({
        id_tugas: tugas[i].id_tugas,
        nama_tugas: tugas[i].nama_tugas
      })
      i++
    }
    console.log(tugasList)
    this.listTugas = tugasList
  }
}
</script>

<style scoped>

</style>
