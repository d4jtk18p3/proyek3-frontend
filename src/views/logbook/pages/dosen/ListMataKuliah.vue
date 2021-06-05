<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Logbook Mahasiswa</p>
    </v-col>
    <v-col cols="12">
        <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col cols="12">
        <p
          class="text-center font-weight-bold text-h5"
          :style="{color: currentTheme.onBackground}"
        >Mata Kuliah</p>
    </v-col>
    <v-col :cols="isMobile ? 12 : 4" v-for="(item, index) in listMataKuliah" :key="index">
        <MataKuliahItem :mataKuliah="item.namaMataKuliah" :prodi="item.prodi" :listKelas="item.listKelas"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import MataKuliahItem from "@/views/logbook/component/dosen/MataKuliahItem"
import BackEndMatakuliah from "../../../../datasource/api/logbook/matakuliah"
import BackEndPerkuliahan from "../../../../datasource/api/logbook/perkuliahan"
import BackEndKelas from "../../../../datasource/api/logbook/kelas"

export default {
  name: "LogbookMahasiswa",
  components: { Breadcumbs, MataKuliahItem },
  props: {
    listMataKuliah: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    dosen: {
      type: Object,
      required: false,
      default: () => {
        return {
          nip: 1822316,
          nama_dosen: "Ferry Feirizal",
          id_jabatan: "Pengampu"
        }
      }
    }
  },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Logbook",
          disabled: false,
          href: ""
        },
        {
          text: "Logbook Mahasiswa",
          disabled: true,
          href: ""
        }
      ]
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
    var matakuliah = await BackEndMatakuliah.getAllMataKuliahProyekyangDiampuDosen(this.dosen.nip)
    var perkuliahan = await BackEndPerkuliahan.getAllPerkuliahanyangDiampuDosen(this.dosen.nip)
    var i = 0
    while (i < perkuliahan.length) {
      var mataKuliahItem = matakuliah.filter(function (item) {
        return item.id === perkuliahan[i].id_mata_kuliah
      })
      var kelas = await BackEndKelas.getAllKelasByMatkul(this.dosen.nip, mataKuliahItem[0].id)
      var j = 0
      var kelasString = []
      while (j < kelas.length) {
        kelasString[j] = kelas[j].kode_kelas
        j++
      }

      this.listMataKuliah.push({
        namaMataKuliah: mataKuliahItem[0].nama_mata_kuliah.substr(0, 8),
        prodi: mataKuliahItem[0].kode_program_studi.substr(0, 2) + " - Teknik Informatika",
        listKelas: kelasString
      })
      i++
    }
  }
}
</script>
