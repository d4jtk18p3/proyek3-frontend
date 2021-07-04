<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">List Mahasiswa</p>
    </v-col>
    <v-col cols="12">
        <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col cols="12">
      <v-row class="py-5 ml-3">
        <v-col :cols="isMobile ? '4' : '2'" class="py-0">
          <div class="text-start">Prodi</div>
        </v-col>
        <v-col :cols="isMobile ? '7' : '5'" class="py-0">
          <div class="text-start">: {{prodi}}</div>
        </v-col>
        <v-col :cols="isMobile ? '1' : '4'"></v-col>
        <v-col :cols="isMobile ? '4' : '2'" class="py-0">
          <div class="text-start">Mata Kuliah</div>
        </v-col>
        <v-col :cols="isMobile ? '7' : '5'" class="py-0">
          <div class="text-start">: {{namaMataKuliah}}</div>
        </v-col>
        <v-col :cols="isMobile ? '1' : '4'"></v-col>
        <v-col :cols="isMobile ? '4' : '2'" class="py-0">
          <div class="text-start">Kelas</div>
        </v-col>
        <v-col :cols="isMobile ? '7' : '5'" class="py-0">
          <div class="text-start">: {{kelasString}}</div>
        </v-col>
          <v-col :cols="isMobile ? '1' : '4'"></v-col>
      </v-row>
    </v-col>
    <v-col :cols="isMobile ? 12 : 4" v-for="item in this.listMahasiswa" :key="item.nim">
        <ListMahasiswaItem v-if="!isMobile" :namaMataKuliah="namaMataKuliah" :prodi="prodi" :kelasString="kelasString" :dataMahasiswa="item"/>
        <ListMahasiswaItemMobile v-if="isMobile" :namaMataKuliah="namaMataKuliah" :prodi="prodi" :kelasString="kelasString"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import ListMahasiswaItem from "@/views/logbook/component/dosen/ListMahasiswaItem"
import ListMahasiswaItemMobile from "@/views/logbook/component/dosen/ListMahasiswaItemMobile"
import BackEndMahasiswa from "../../../../datasource/network/logbook/mahasiswa"

export default {
  name: "ListMahasiswa",
  components: { Breadcumbs, ListMahasiswaItem, ListMahasiswaItemMobile },
  props: {
    namaMataKuliah: {
      type: String,
      required: false,
      default: "Proyek 1"
    },
    prodi: {
      type: String,
      required: false,
      default: "D4 - Teknik Informatika"
    },
    kelas: {
      type: String,
      required: false
    },
    listMahasiswa: {
      type: Array,
      required: false
    },
    kelasString: {
      type: String,
      required: false
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
          disabled: false,
          href: "/logbook/logbook-mahasiswa"
        },
        {
          text: this.prodi.substring(0, 2) + " - " + this.namaMataKuliah + " - " + this.kelasString,
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
  methods: {
    stringKelasToKodeKelas (stringKelas) {
      // harus jadi 1803
      var angkaKelas = parseInt(stringKelas.substr(0, 1)) // "3A" -> 3
      var date = new Date()
      var year = date.getFullYear()

      var kelasAngka = parseInt(year.toString().substr(2, 4)) // 21
      kelasAngka -= angkaKelas // 21 - 3 = 18
      var kelasAngkaString = kelasAngka.toString() // 18 -> "18"
      if (this.prodi === "D4 Teknik Informatika") {
        if (stringKelas.substr(1, 2) === "A") {
          return kelasAngkaString + "03"
        } else if (stringKelas.substr(1, 2) === "B") {
          return kelasAngkaString + "04"
        }
      } else if (this.prodi === "D3 Teknik Informatika") {
        if (stringKelas.substr(1, 2) === "A") {
          return kelasAngkaString + "01"
        } else if (stringKelas.substr(1, 2) === "B") {
          return kelasAngkaString + "02"
        }
      }
    }
  },
  async mounted () {
    this.kelas = this.stringKelasToKodeKelas(this.kelasString)
    this.listMahasiswa = await BackEndMahasiswa.getAllMahasiswaByKelas(this.kelas)
  }
}
</script>
