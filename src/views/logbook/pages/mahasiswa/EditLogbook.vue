<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Ubah Logbook Saya</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col :cols="isMobile ? `12` : `5`">
      <v-row justify="center">
        <v-col cols="12">
          <v-row class="py-5 ml-3">
            <v-col :cols="isMobile ? '4' : '3'" class="py-0">
              <div class="text-start">Nama</div>
            </v-col>
            <v-col :cols="isMobile ? '7' : '7'" class="py-0">
              <div class="text-start">: {{identitas.nama}}</div>
            </v-col>
            <v-col :cols="isMobile ? '1' : '2'"></v-col>
            <v-col :cols="isMobile ? '4' : '3'" class="py-0">
              <div class="text-start">NIM</div>
            </v-col>
            <v-col :cols="isMobile ? '7' : '5'" class="py-0">
              <div class="text-start">: {{identitas.nim}}</div>
            </v-col>
              <v-col :cols="isMobile ? '1' : '4'"></v-col>
            <v-col :cols="isMobile ? '4' : '3'" class="py-0">
              <div class="text-start">Kelas</div>
            </v-col>
            <v-col :cols="isMobile ? '7' : '5'" class="py-0">
              <div class="text-start">: {{kodeKelasToStringKelas(this.identitas.kode_kelas)}}</div>
            </v-col>
              <v-col :cols="isMobile ? '1' : '4'"></v-col>
            <v-col :cols="isMobile ? '4' : '3'" class="py-0">
              <div class="text-start">Prodi</div>
            </v-col>
            <v-col :cols="isMobile ? '7' : '7'" class="py-0">
              <div class="text-start">: {{kodeProdiToStringProdi(this.matkul.kode_program_studi)}}</div>
            </v-col>
            <v-col :cols="isMobile ? '1' : '2'"></v-col>
            <v-col :cols="isMobile ? '4' : '3'" class="py-0">
              <div class="text-start">Mata Kuliah</div>
            </v-col>
            <v-col :cols="isMobile ? '7' : '5'" class="py-0">
              <div class="text-start">: {{this.matkul.nama_mata_kuliah}}</div>
            </v-col>
            <v-col :cols="isMobile ? '1' : '4'"></v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="mt-3 py-0">
          <div class="text-center">Silakan pilih tanggal kegiatan...</div>
        </v-col>
        <v-col cols="12" class="mt-1">
          <DatePickerItem
          :picker="this.logbookdate"/>
        </v-col>

      </v-row>
    </v-col>
    <v-col :cols="isMobile ? `12` : `6` ">
      <FormEditLogbookItem
      :idLogbooks="this.idLogbooks"
      :idEntriLogbook="this.idEntriLogbook"
      :kegiatan="this.kegiatan"
      :hasil="this.hasil"
      :kesan="this.kesan"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import DatePickerItem from "@/views/logbook/component/mahasiswa/DatePickerItem"
import FormEditLogbookItem from "@/views/logbook/component/mahasiswa/FormEditLogbookItem"
import BackEndEntri from "../../../../datasource/network/logbook/entri"
import BackEndMahasiswa from "../../../../datasource/network/logbook/mahasiswa"
import BackEndMatkul from "../../../../datasource/network/logbook/matakuliah"

export default {
  name: "EditLogbook",
  components: { DatePickerItem, Breadcumbs, FormEditLogbookItem },
  props: {
    identitas: {
      type: Object,
      required: false
    },
    kegiatan: {
      type: String,
      required: false,
      default: () => {
        return ""
      }
    },
    hasil: {
      type: String,
      required: false,
      default: () => {
        return ""
      }
    },
    kesan: {
      type: String,
      required: false,
      default: () => {
        return ""
      }
    },
    logbookdate: {
      type: Date,
      required: false,
      default: () => {
        return new Date().toISOString().substr(0, 10)
      }
    },
    idLogbooks: {
      type: String,
      required: false
    },
    idEntriLogbook: {
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
          disabled: false,
          href: "/logbook/mylogbook"
        },
        {
          text: "Ubah Logbook Saya",
          disabled: true,
          href: ""
        },
        {
          text: this.logbookdate,
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
  watch: {
    identity: {
      immediate: true,
      handler: function (value) {
        console.log(value)
      }
    }
  },
  async mounted () {
    this.identitas = await BackEndMahasiswa.getOneMahasiswaByNim(this.identity.preferred_username)
    this.matkul = await BackEndMatkul.getLastProyek(this.identity.preferred_username)
    var data = await BackEndEntri.getOneEntryLogbookMhsByid(this.idEntriLogbook)
    this.logbookdate = data.tanggal
    var parts = data.tanggal.split("-")
    this.logbookdate = new Date(parts[2], parts[1] - 1, parts[0], 7).toISOString().substr(0, 10)
    this.kegiatan = data.kegiatan
    this.hasil = data.hasil
    this.kesan = data.kesan
  }
}
</script>
