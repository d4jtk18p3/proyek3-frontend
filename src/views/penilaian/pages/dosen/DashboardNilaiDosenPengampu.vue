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
         <p class="text-h7 font-weight-bold" >Tertinggi : {{ tertinggi() }}</p>
         <p class="text-h7 font-weight-bold">Terendah : {{ terendah() }}</p>
       </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="8">
      <nilai-rata-rata-card :nilai-list="getNilaiList()"/>
    </v-col>
    <v-col cols="6">
      <v-card>
       <v-card-title class="mt-5">Mahasiswa dengan nilai total dibawah 60</v-card-title>
       <template v-for="(mhs, index) in Mahasiswa.Nilai">
        <v-card-text v-if="mhs.nilaiAkhir < 60"  :key="index" class="pt-0">
          <p class="text-h7 font-weight-bold">{{ mhs.nama }} ({{ mhs.nim }})</p>
        </v-card-text>
       </template>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card>
       <v-card-title class="mt-5">Mahasiswa dengan nilai ETS dibawah 60</v-card-title>
       <template v-for="(mhs, index) in Mahasiswa.Nilai">
        <v-card-text v-if="mhs.ets < 60"  :key="index">
          <p class="text-h7 font-weight-bold">{{ mhs.nama }} ({{ mhs.nim }})</p>
        </v-card-text>
       </template>
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
          ETS
          </th>
          <th class="text-left" :style="{background: currentTheme.onBackground, color: currentTheme.background, 'border': '1px solid' + currentTheme.background}">
          EAS
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
            <td>{{ nilai.ets }}</td>
            <td>{{ nilai.eas }}</td>
            <td>{{ nilai.nilaiAkhir }}</td>
            </tr>
        </tbody>
    </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
// import http from "axios"
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import NilaiRataRataCard from "@/views/penilaian/component/dosen/NilaiRataRataCard"
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
            nim: "181524001",
            nama: "Andri",
            ets: 87.5,
            eas: 82.5,
            nilaiAkhir: 65
          },
          {
            nim: "181524002",
            nama: "Bandri",
            ets: 87.5,
            eas: 82.5,
            nilaiAkhir: 90
          },
          {
            nim: "181524003",
            nama: "Candri",
            ets: 86,
            eas: 84,
            nilaiAkhir: 50
          },
          {
            nim: "181524004",
            nama: "Dandri",
            ets: 90,
            eas: 70,
            nilaiAkhir: 70
          },
          {
            nim: "181524005",
            nama: "Endri",
            ets: 50,
            eas: 50,
            nilaiAkhir: 50
          }
        ]
      },
      nilaiList: [0, 0, 0, 0, 0]
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
    // this.nip = "196610181995121000"
    // http.get("http://localhost:5001/dosen/kelas/" + this.nip)
    //   .then((res) => {
    //     console.log(res.data.data.uniqueClass)
    //     this.listKelas = res.data.data.uniqueClass
    //   })
    // console.log(this.$route.matkul)
  },
  methods: {
    tertinggi () {
      return Math.max.apply(Math, this.Mahasiswa.Nilai.map(function (o) { return o.nilaiAkhir })).toFixed(2)
    },
    terendah () {
      return Math.min.apply(Math, this.Mahasiswa.Nilai.map(function (o) { return o.nilaiAkhir })).toFixed(2)
    },
    getNilaiList () {
      for (var i = 0; i < this.Mahasiswa.Nilai.length; i++) {
        if (this.Mahasiswa.Nilai[i].nilaiAkhir >= 80) {
          this.nilaiList[0]++
        }
        if (this.Mahasiswa.Nilai[i].nilaiAkhir < 80 && this.Mahasiswa.Nilai[i].nilaiAkhir >= 60) {
          this.nilaiList[1]++
        }
        if (this.Mahasiswa.Nilai[i].nilaiAkhir < 60 && this.Mahasiswa.Nilai[i].nilaiAkhir >= 40) {
          this.nilaiList[2]++
        }
        if (this.Mahasiswa.Nilai[i].nilaiAkhir < 40 && this.Mahasiswa.Nilai[i].nilaiAkhir >= 30) {
          this.nilaiList[3]++
        }
        if (this.Mahasiswa.Nilai[i].nilaiAkhir < 30) {
          this.nilaiList[4]++
        }
      }
      return this.nilaiList
    }
  }
}
</script>
