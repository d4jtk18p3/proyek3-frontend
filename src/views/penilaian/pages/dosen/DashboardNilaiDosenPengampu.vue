<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Dashboard Mata Kuliah</p>
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
      <nilai-rata-rata-card :nilai-list="nilaiList"/>
    </v-col>
    <v-col cols="6">
      <v-card>
       <v-card-title class="mt-5">Mahasiswa dengan nilai total dibawah 60</v-card-title>
       <template v-for="(mhs, index) in Mahasiswa.Nilai">
        <v-card-text v-if="mhs.nilai_akhir < 60"  :key="index" class="pt-0">
          <p class="text-h7 font-weight-bold">{{ mhs.nama }} ({{ mhs.nim }})</p>
        </v-card-text>
       </template>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card>
       <v-card-title class="mt-5">Mahasiswa dengan nilai ETS dibawah 60</v-card-title>
       <template v-for="(mhs, index) in Mahasiswa.Nilai">
        <v-card-text v-if="mhs.nilai_ets < 60"  :key="index" class="pt-0">
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
            <td>{{ (Math.round(nilai.nilai_ets * 100) / 100).toFixed(2) }}</td>
            <td>{{ (Math.round(nilai.nilai_eas * 100) / 100).toFixed(2) }}</td>
            <td>{{ (Math.round(nilai.nilai_akhir * 100) / 100).toFixed(2)}}</td>
            </tr>
        </tbody>
    </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import NilaiRataRataCard from "@/views/penilaian/component/dosen/NilaiRataRataCard"
import DosenAPI from "@/datasource/network/penilaian/PenilaianDosen"
export default {
  name: "DashboardMain",
  components: { Breadcumbs, NilaiRataRataCard },
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
        },
        {
          text: "",
          disabled: true,
          href: ""
        }
      ],
      Mahasiswa: {
        Nilai: []
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
  async mounted () {
    // this.nip = "196610181995121000"
    // http.get("http://localhost:5001/dosen/kelas/" + this.nip)
    //   .then((res) => {
    //     console.log(res.data.data.uniqueClass)
    //     this.listKelas = res.data.data.uniqueClass
    //   })
    // console.log(this.$route.matkul)

    var nilai = await DosenAPI.getNilaiAkhir(this.$route.params.id)
    console.log(nilai)
    this.Mahasiswa.Nilai = nilai.listNilaiAkhir
    for (var i = 0; i < this.Mahasiswa.Nilai.length; i++) {
      this.Mahasiswa.Nilai[i].nilai_akhir = (this.Mahasiswa.Nilai[i].nilai_ets + this.Mahasiswa.Nilai[i].nilai_eas) / 2
    }
    this.nilaiList = this.getNilaiList()

    // http.get("http://localhost:5001/penilaian/get-nilai-akhir/perkuliahan/" + this.$route.params.id)
    //   .then((res) => {
    //     this.Mahasiswa.Nilai = res.data.data.listNilaiAkhir
    //     for (var i = 0; i < this.Mahasiswa.Nilai.length; i++) {
    //       this.Mahasiswa.Nilai[i].nilai_akhir = (this.Mahasiswa.Nilai[i].nilai_ets + this.Mahasiswa.Nilai[i].nilai_eas) / 2
    //     }
    //   })
    //   .then(() => {
    //     this.nilaiList = this.getNilaiList()
    //   })
  },
  methods: {
    tertinggi () {
      return Math.max.apply(Math, this.Mahasiswa.Nilai.map(function (o) { return o.nilai_akhir })).toFixed(2)
    },
    terendah () {
      return Math.min.apply(Math, this.Mahasiswa.Nilai.map(function (o) { return o.nilai_akhir })).toFixed(2)
    },
    getNilaiList () {
      var listNilai = [0, 0, 0, 0, 0]
      for (var i = 0; i < this.Mahasiswa.Nilai.length; i++) {
        if (this.Mahasiswa.Nilai[i].nilai_akhir >= 80) {
          listNilai[0]++
        }
        if (this.Mahasiswa.Nilai[i].nilai_akhir < 80 && this.Mahasiswa.Nilai[i].nilai_akhir >= 60) {
          listNilai[1]++
        }
        if (this.Mahasiswa.Nilai[i].nilai_akhir < 60 && this.Mahasiswa.Nilai[i].nilai_akhir >= 40) {
          listNilai[2]++
        }
        if (this.Mahasiswa.Nilai[i].nilai_akhir < 40 && this.Mahasiswa.Nilai[i].nilai_akhir >= 30) {
          listNilai[3]++
        }
        if (this.Mahasiswa.Nilai[i].nilai_akhir < 30) {
          listNilai[4]++
        }
      }
      return listNilai
    }
  }
}
</script>
