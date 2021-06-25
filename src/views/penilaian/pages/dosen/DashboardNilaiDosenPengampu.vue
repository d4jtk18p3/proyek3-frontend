<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Dashboard Mata Kuliah</p>
      <p class="text-h5 font-weight-bold">Akungtangsi  KO005N</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col cols="4">
      <p class="text-h6 font-weight-bold">Informasi Mata Kuliah</p>
      <v-card color="#FB8C00">
       <v-card-title>Nama Pengajar</v-card-title>
       <v-card-text >
         <p class="text-h7 font-weight-bold">Pengajar 1</p>
         <p class="text-h7 font-weight-bold">Pengajar 2</p>
       </v-card-text>
      </v-card>
      <v-card :color="currentTheme.colorSecondaryVariant">
       <v-card-title class="mt-5">Perolehan Nilai</v-card-title>
       <v-card-text >
         <p class="text-h7 font-weight-bold">Tertinggi : 4.0</p>
         <p class="text-h7 font-weight-bold">Terendah : 2.9</p>
       </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="8">
      <nilai-rata-rata-card :nilai-list="nilaiList"/>
    </v-col>
    <v-col cols="6">
      <v-card>
       <v-card-title class="mt-5">Mahasiswa dengan nilai total rendah</v-card-title>
       <v-card-text >
         <p class="text-h7 font-weight-bold">Bandri (181524002)</p>
         <p class="text-h7 font-weight-bold">Dandri (181524004)</p>
       </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card>
       <v-card-title class="mt-5">Mahasiswa dengan nilai ETS rendah</v-card-title>
       <v-card-text >
         <p class="text-h7 font-weight-bold">Bandri (181524002)</p>
         <p class="text-h7 font-weight-bold">Dandri (181524004)</p>
       </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <p class="text-h6 font-weight-bold mt-5">Nilai Mahasiswa</p>
    </v-col>
    <v-col cols="12">
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left" :style="{background: currentTheme.onBackground, color: currentTheme.background, 'border': '1px solid' + currentTheme.background}">
          NIM
          </th>
          <th class="text-left" :style="{background: currentTheme.onBackground, color: currentTheme.background, 'border': '1px solid' + currentTheme.background}">
          Nama
          </th>
          <th class="text-left" :style="{background: currentTheme.onBackground, color: currentTheme.background, 'border': '1px solid' + currentTheme.background}">
          Nilai Akhir
          </th>
        </tr>
      </thead>
       <tbody>
                <tr
                v-for="nilai in Mahasiswa.Nilai"
                :key="nilai.nim"
                >
                <td>{{ nilai.nim }}</td>
                <td>{{ nilai.nama }}</td>
                <td>{{ nilai.nilaiAkhir }}</td>
                </tr>
            </tbody>
    </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import NilaiRataRataCard from "@/views/template/component/nilai/NilaiRataRataCard"
export default {
  name: "DashboardMain",
  components: { Breadcumbs, NilaiRataRataCard },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Penilaian",
          disabled: false,
          href: ""
        },
        {
          text: "Dashboard Dosen Pengampu",
          disabled: false,
          href: ""
        },
        {
          text: "",
          disabled: true,
          href: ""
        }
      ],
      Mahasiswa: {
        Nilai: [
          {
            nim: "181524002",
            nama: "Andri",
            nilaiAkhir: 3.2
          },
          {
            nim: "181524003",
            nama: "Bandri",
            nilaiAkhir: 2.9
          },
          {
            nim: "181524003",
            nama: "Candri",
            nilaiAkhir: 4.0
          },
          {
            nim: "181524004",
            nama: "Dandri",
            nilaiAkhir: 3.0
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
  mounted () {
  },
  methods: {
  }
}
</script>
