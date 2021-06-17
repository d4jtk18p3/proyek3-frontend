<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Dashboard Mahasiswa</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col :cols="isMobile ? 12 : 4" class="mt-2">
      <DataMahasiswa/>
    </v-col>
    <v-col :cols="isMobile ? 12 : 2" class="mt-2">
      <DataIPMahasiswa/>
    </v-col>
    <v-col :cols="isMobile ? 12 : 6">
    </v-col>
    <v-col cols="12">
      <div>
      <GraphDekstop v-if="!isMobile" :nilai-list="nilaiList"  :ip-list="ipList"/>
      <GraphMobile v-else :nilai-list="nilaiList"  :ip-list="ipList"/>
      </div>
    </v-col>
    <v-col :cols="isMobile ? 3 : 1" class="mt-2 mr-2" v-for="(mhs) in Mahasiswa.Nilai" :key="mhs.label">
      <v-btn rounded :color="currentTheme.colorPrimary" :style="{'color': currentTheme.surface}" @click="NilaiSemesterSelected = mhs"> {{ mhs.label }} </v-btn>
    </v-col>
    <v-col :cols="isMobile ? 0 : 4">
    </v-col>
    <v-col :cols="isMobile ? 12 : 2" class="mt-2">
    <v-card
        class="mx-auto"
        height="130"
        v-if="NilaiSemesterSelected"
    >
        <v-card-title class="text-h6 font-weight-bold" :style="{color: currentTheme.onBackground, background: currentTheme.colorSecondary, 'line-height': '10px'}">IP Semester</v-card-title>
        <v-card-text>
            <v-card-title class="text-h3 font-weight-bold mt-2" :style="{color: currentTheme.onBackground, 'line-height': '30px'}">{{ NilaiSemesterSelected.IPSemester }}</v-card-title>
        </v-card-text>
    </v-card>
    </v-col>
    <v-col :cols="isMobile ? 12 : 2" class="mt-2">
        <v-card
            class="mx-auto"
            height="130"
            v-if="NilaiSemesterSelected"
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
        <v-simple-table>
            <thead>
                <tr>
                  <th class="text-left" :style="{background: currentTheme.onBackground, color: currentTheme.background, 'border': '1px solid' + currentTheme.background}">
                      Kode Dosen
                  </th>
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
                <td>{{ nilai.KodeDosen }}</td>
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
    <v-btn :color="currentTheme.colorPrimary" elevation="2" outlined depressed @click="TranskripNilai(idMahasiswa)">Transkrip Nilai</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import DataMahasiswa from "@/views/penilaian/component/mahasiswa/DataMahasiswa"
import DataIPMahasiswa from "@/views/penilaian/component/mahasiswa/DataIPMahasiswa"
import GraphDekstop from "@/views/template/pages/nilai/mahasiswa/GraphDekstop"
import GraphMobile from "@/views/template/pages/nilai/mahasiswa/GraphMobile"

export default {
  name: "DashboardMain",
  components: { Breadcumbs, DataMahasiswa, DataIPMahasiswa, GraphDekstop, GraphMobile },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Penilaian",
          disabled: false,
          href: ""
        },
        {
          text: "Dashboard Mahasiswa",
          disabled: false,
          href: ""
        },
        {
          text: "Link 2",
          disabled: true,
          href: ""
        }
      ],
      ipList: [3.2, 2.0, 2.95, 0.51, 2.52, 3.5, 1.0],
      nilaiList: [6, 7, 4, 7, 5],
      NilaiSemesterSelected: null,
      Mahasiswa: {
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
                Nilai: "A"
              },
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0003",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "A"
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
                Nilai: "A"
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
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "A"
              }
            ]
          },
          {
            label: "SEM -3",
            IPSemester: 4.0,
            JumlahSKS: 27,
            NilaiSemester: [
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0001",
                MataKuliah: "Project 3",
                SKS: 3,
                Nilai: "A"
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
                Nilai: "A"
              }
            ]
          },
          {
            label: "SEM -4",
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
                Nilai: "A"
              },
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0003",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "A"
              }
            ]
          },
          {
            label: "SEM -5",
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
                Nilai: "A"
              },
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0003",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "A"
              }
            ]
          },
          {
            label: "SEM -6",
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
                Nilai: "A"
              },
              {
                KodeDosen: "KO005N",
                KodeMK: "16TIN0003",
                MataKuliah: "Struktur Data dan Algoritma",
                SKS: 3,
                Nilai: "A"
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
    }
  },
  methods: {
    test (mhsNilai) {
      console.log(mhsNilai)
    },
    TranskripNilai (id) {
      this.$router.push("transkripsi-nilai/" + id)
    }
  }
}
</script>
