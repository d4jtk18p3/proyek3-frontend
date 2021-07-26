<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Logbook Saya</p>
    </v-col>
    <v-col cols="12">
        <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-row class="py-5 ml-3">
      <v-col :cols="isMobile ? '4' : '2'" class="py-0">
        <div class="text-start">Nama</div>
      </v-col>
      <v-col :cols="isMobile ? '7' : '3'" class="py-0">
        <div class="text-start">: {{identitas.nama}}</div>
      </v-col>
      <v-col :cols="isMobile ? '1' : '7'"></v-col>
      <v-col :cols="isMobile ? '4' : '2'" class="py-0">
        <div class="text-start">NIM</div>
      </v-col>
      <v-col :cols="isMobile ? '7' : '2'" class="py-0">
        <div class="text-start">: {{identitas.nim}}</div>
      </v-col>
        <v-col :cols="isMobile ? '1' : '8'"></v-col>
      <v-col :cols="isMobile ? '4' : '2'" class="py-0">
        <div class="text-start">Kelas</div>
      </v-col>
      <v-col :cols="isMobile ? '7' : '2'" class="py-0">
        <div class="text-start">: {{kodeKelasToStringKelas(this.identitas.kode_kelas)}}</div>
      </v-col>
        <v-col :cols="isMobile ? '1' : '8'"></v-col>
      <v-col :cols="isMobile ? '4' : '2'" class="py-0">
        <div class="text-start">Prodi</div>
      </v-col>
      <v-col :cols="isMobile ? '7' : '3'" class="py-0">
        <div class="text-start">: {{kodeProdiToStringProdi(this.matkul.kode_program_studi)}}</div>
      </v-col>
      <v-col :cols="isMobile ? '1' : '7'"></v-col>
      <v-col :cols="isMobile ? '4' : '2'" class="py-0">
        <div class="text-start">Mata Kuliah</div>
      </v-col>
      <v-col :cols="isMobile ? '7' : '2'" class="py-0">
        <div class="text-start">: {{this.matkul.nama_mata_kuliah}}</div>
      </v-col>
    </v-row>
    <v-col cols="12" class="mt-2">
      <TabelItem :datas="this.datas" :idLogbooks="this.idLogbooks"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import TabelItem from "@/views/logbook/component/mahasiswa/TabelItem"
import BackEndLogbook from "../../../../datasource/network/logbook/logbook"
import BackEndMahasiswa from "../../../../datasource/network/logbook/mahasiswa"
import BackEndMatkul from "../../../../datasource/network/logbook/matakuliah"

export default {
  name: "LogbookSaya",
  components: { Breadcumbs, TabelItem },
  props: {
    identitas: {
      type: Object,
      required: false
    },
    datas: {
      type: Array,
      required: false
    },
    idLogbooks: {
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
          text: "Logbook Saya",
          disabled: true,
          href: ""
        }
      ],
      matkul: null
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
  watch: {
    identity: {
      immediate: true,
      handler: function (value) {
        console.log(value)
      }
    }
  },
  methods: {
    kodeKelasToStringKelas (kodekelas) {
      var date = new Date()
      var year = date.getFullYear()

      var kelasAngkaString = year.toString().substr(2, 4) // 2021 -> 21
      var kelasAngkaStringInput = kodekelas.toString().substr(0, 2) // 1803 -> 18

      var kelasAngka = parseInt(kelasAngkaString) - parseInt(kelasAngkaStringInput) // 21 - 18 = 3
      kelasAngkaString = kelasAngka.toString()

      var kelasHurufString = kodekelas.toString().substr(2, 4) // 1803 -> 03

      if (kelasHurufString === "01" || kelasHurufString === "03") {
        return kelasAngkaString + "A"
      } else {
        return kelasAngkaString + "B"
      }
    },
    kodeProdiToStringProdi (kodeprodi) {
      if (kodeprodi === "24") {
        return "D4 - Teknik Informatika"
      } else if (kodeprodi === "11") {
        return "D3 - Teknik Informatika"
      }
    }
  },
  async mounted () {
    this.datas = await BackEndLogbook.getAllEntriLogbooksMhsByNIM(this.identity.preferred_username)
    this.idLogbooks = await BackEndLogbook.getIdLogbooksMhsByNIM(this.identity.preferred_username)
    this.identitas = await BackEndMahasiswa.getOneMahasiswaByNim(this.identity.preferred_username)
    this.matkul = await BackEndMatkul.getLastProyek(this.identity.preferred_username)
  }
}
</script>
