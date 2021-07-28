<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Dashboard Mahasiswa</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col :cols="isMobile ? 12 : 4" class="mt-2">
      <DataMahasiswa :DataMahasiswa="Mahasiswa"/>
    </v-col>
    <v-col :cols="isMobile ? 12 : 2" class="mt-2">
      <DataIPMahasiswa :DataMahasiswa="Mahasiswa"/>
    </v-col>
    <v-col :cols="isMobile ? 12 : 6">
    </v-col>
    <v-col :cols="isMobile ? 12 : 12">
      <GraphSection :ipList="listIP" :nilaiList="listNilai" />
    </v-col>
    <v-col :cols="isMobile ? 3 : 1" class="mt-2 mr-2" v-for="(mhs) in Mahasiswa.Nilai" :key="mhs.label">
      <v-btn rounded :color="currentTheme.colorPrimary" :style="{'color': currentTheme.surface}" @click="NilaiSemesterSelected = mhs"> {{ mhs.label }} </v-btn>
    </v-col>
    <v-col :cols="isMobile ? 0 : 2">
    </v-col>
    <v-col :cols="isMobile ? 6 : 2" class="mt-2" v-if="NilaiSemesterSelected">
    <v-card
        class="mx-auto"
        height="130"
        v-if="NilaiSemesterSelected.JumlahSKS != 0"
    >
        <v-card-title class="text-h6 font-weight-bold" :style="{color: currentTheme.onBackground, background: currentTheme.colorSecondary, 'line-height': '10px'}">IP Semester</v-card-title>
        <v-card-text>
            <v-card-title class="text-h3 font-weight-bold mt-2" :style="{color: currentTheme.onBackground, 'line-height': '30px'}">{{ NilaiSemesterSelected.IPSemester }}</v-card-title>
        </v-card-text>
    </v-card>
    </v-col>
    <v-col :cols="isMobile ? 6 : 2" class="mt-2" v-if="NilaiSemesterSelected">
        <v-card
            class="mx-auto"
            height="130"
            v-if="NilaiSemesterSelected.JumlahSKS != 0"
        >
            <v-card-title class="text-h6 font-weight-bold" :style="{color: currentTheme.onBackground, background: currentTheme.colorSecondaryVariant, 'line-height': '10px'}">Jumlah SKS</v-card-title>
            <v-card-text>
                <v-card-title class="text-h3 font-weight-bold mt-2" :style="{color: currentTheme.onBackground, 'line-height': '30px'}">{{ NilaiSemesterSelected.JumlahSKS }}</v-card-title>
            </v-card-text>
        </v-card>
    </v-col>
    <v-col :cols="isMobile ? 0 : 10">
    </v-col>
    <v-col :cols="isMobile ? 12 : 12" v-if="NilaiSemesterSelected">
        <v-simple-table v-if="NilaiSemesterSelected.JumlahSKS != 0">
            <thead>
                <tr>
                  <th class="text-left" :style="{background: currentTheme.onBackground, color: currentTheme.background, 'border': '1px solid' + currentTheme.background}">
                      Kode Mata Kuliah
                  </th>
                  <th class="text-left" :style="{background: currentTheme.onBackground, color: currentTheme.background, 'border': '1px solid' + currentTheme.background}">
                      Mata Kuliah
                  </th>
                  <th class="text-left" :style="{background: currentTheme.onBackground, color: currentTheme.background, 'border': '1px solid' + currentTheme.background}">
                      SKS
                  </th>
                  <th class="text-left" :style="{background: currentTheme.onBackground, color: currentTheme.background, 'border': '1px solid' + currentTheme.background}">
                      Nilai
                  </th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="nilai in NilaiSemesterSelected.NilaiSemester"
                :key="nilai.KodeMK"
                >
                <td>{{ nilai.KodeMK }}</td>
                <td>{{ nilai.MataKuliah }}</td>
                <td>{{ nilai.SKS }}</td>
                <td>{{ nilai['Nilai'] }}</td>
                </tr>
            </tbody>
        </v-simple-table>
    </v-col>
    <v-col cols="9">
    </v-col>
    <v-col cols="3">
    <v-btn :color="currentTheme.colorPrimary" elevation="2" outlined depressed @click="TranskripNilai(Mahasiswa.Nim)">Transkrip Nilai</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import DataMahasiswa from "@/views/penilaian/component/mahasiswa/DataMahasiswa"
import DataIPMahasiswa from "@/views/penilaian/component/mahasiswa/DataIPMahasiswa"
import GraphSection from "@/views/template/pages/nilai/mahasiswa/GraphSection"
import NilaiAkhir from "@/datasource/network/penilaian/PenilaianMahasiswa"

export default {
  name: "DashboardMain",
  components: { Breadcumbs, DataMahasiswa, DataIPMahasiswa, GraphSection },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Penilaian",
          disabled: false,
          href: "/penilaian"
        },
        {
          text: "Dashboard Mahasiswa",
          disabled: false,
          href: "/penilaian/dashboard-nilai-mahasiswa"
        }
      ],
      NilaiSemesterSelected: null,
      listIP: [],
      listNilai: [],
      Mahasiswa: {
        Nama: "Zefan",
        Kelas: null,
        Prodi: "D4 Teknik Informatika",
        Nim: "181524032",
        IPKumulatif: 0,
        Nilai: [
          {
            label: "SEM -1",
            IPSemester: 4.0,
            JumlahSKS: 27,
            NilaiSemester: [
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0001",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "A"
              },
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0002",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "BC"
              },
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0003",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "E"
              }
            ]
          },
          {
            label: "SEM -2",
            IPSemester: 3.0,
            JumlahSKS: 20,
            NilaiSemester: [
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0001",
                MataKuliah: "Angkungtansi",
                SKS: 3,
                Nilai: "C"
              },
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0002",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "CD"
              },
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0003",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "AB"
              }
            ]
          },
          {
            label: "SEM -3",
            IPSemester: 1.6,
            JumlahSKS: 27,
            NilaiSemester: [
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0001",
                MataKuliah: "Project 3",
                SKS: 3,
                Nilai: "BC"
              },
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0002",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "A"
              },
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0003",
                MataKuliah: "Angkungtansi 2",
                SKS: 3,
                Nilai: "D"
              }
            ]
          },
          {
            label: "SEM -4",
            IPSemester: 3.2,
            JumlahSKS: 27,
            NilaiSemester: [
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0001",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "D"
              },
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0002",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "B"
              },
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0003",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "AB"
              }
            ]
          },
          {
            label: "SEM -5",
            IPSemester: 3.6,
            JumlahSKS: 27,
            NilaiSemester: [
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0001",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "C"
              },
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0002",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "BC"
              },
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0003",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "BC"
              }
            ]
          },
          {
            label: "SEM -6",
            IPSemester: 2.0,
            JumlahSKS: 27,
            NilaiSemester: [
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0001",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "C"
              },
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0002",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "B"
              },
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0003",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "C"
              }
            ]
          }
        ]
      }
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
  async mounted () {
    const identity = this.$store.getters.identity
    this.Mahasiswa.Nim = identity.preferred_username
    var dataMhs = await NilaiAkhir.getNilaiAkhirMhs(this.$store.getters.identity.preferred_username)
    this.Mahasiswa.Nama = dataMhs.Mahasiswa.nama
    this.Mahasiswa.Kelas = dataMhs.Mahasiswa.kode_kelas
    this.Mahasiswa.Nilai = dataMhs.Nilai
    this.listIP = this.getIPSemester(dataMhs)
    this.listNilai = this.getNilaiList(dataMhs)
    this.NilaiSemesterSelected = dataMhs.Nilai[0]
    // console.log(dataMhs.Nilai)
    for (var i = 0; i < dataMhs.Nilai.length; i++) {
      this.Mahasiswa.IPKumulatif += dataMhs.Nilai[i].IPSemester
    }
    this.Mahasiswa.IPKumulatif = (Math.round((this.Mahasiswa.IPKumulatif / 8) * 100) / 100).toFixed(2)
  },
  methods: {
    getIPSemester (data) {
      var listIP = []
      for (var i = 0; i < data.Nilai.length; i++) {
        listIP.push(data.Nilai[i].IPSemester)
      }
      return listIP
    },
    getNilaiList (data) {
      var listNilai = [0, 0, 0, 0, 0]
      for (var i = 0; i < data.Nilai.length; i++) {
        for (var j = 0; j < data.Nilai[i].NilaiSemester.length; j++) {
          switch (data.Nilai[i].NilaiSemester[j].Nilai) {
            case "A" :
              listNilai[0] += 1
              break
            case "AB" :
              listNilai[0] += 1
              break
            case "B" :
              listNilai[1] += 1
              break
            case "BC" :
              listNilai[1] += 1
              break
            case "C" :
              listNilai[2] += 1
              break
            case "CD" :
              listNilai[2] += 1
              break
            case "D" :
              listNilai[3] += 1
              break
            case "E" :
              listNilai[4] += 1
              break
          }
        }
      }
      return listNilai
    },
    TranskripNilai (id) {
      this.$router.push({
        name: "Transkripsi Nilai",
        path: "transkripsi-nilai/" + id,
        params: {
          Mahasiswa: this.Mahasiswa
        }
      })
    }
  }
}
</script>
