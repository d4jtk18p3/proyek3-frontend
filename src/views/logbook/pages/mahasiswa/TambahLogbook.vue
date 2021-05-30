<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Tambah Logbook</p>
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
            <v-col :cols="isMobile ? '7' : '5'" class="py-0">
              <div class="text-start">: {{identitas.nama}}</div>
            </v-col>
            <v-col :cols="isMobile ? '1' : '4'"></v-col>
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
              <div class="text-start">: {{identitas.kelas}}</div>
            </v-col>
              <v-col :cols="isMobile ? '1' : '4'"></v-col>
            <v-col :cols="isMobile ? '4' : '3'" class="py-0">
              <div class="text-start">Prodi</div>
            </v-col>
            <v-col :cols="isMobile ? '7' : '7'" class="py-0">
              <div class="text-start">: {{identitas.prodi}}</div>
            </v-col>
            <v-col :cols="isMobile ? '1' : '2'"></v-col>
            <v-col :cols="isMobile ? '4' : '3'" class="py-0">
              <div class="text-start">Mata Kuliah</div>
            </v-col>
            <v-col :cols="isMobile ? '7' : '5'" class="py-0">
              <div class="text-start">: {{identitas.matakuliah}}</div>
            </v-col>
            <v-col :cols="isMobile ? '1' : '4'"></v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="mt-3 py-0">
          <div class="text-center">Silakan pilih tanggal kegiatan...</div>
        </v-col>
        <v-col cols="12" class="mt-1">
          <DatePickerItem/>
        </v-col>

      </v-row>
    </v-col>
    <v-col :cols="isMobile ? `12` : `6` ">
      <FormTambahLogbookItem :identitas="this.identitas"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import DatePickerItem from "@/views/logbook/component/mahasiswa/DatePickerItem"
import FormTambahLogbookItem from "@/views/logbook/component/mahasiswa/FormTambahLogbookItem"

export default {
  name: "TambahLogbook",
  components: { DatePickerItem, Breadcumbs, FormTambahLogbookItem },
  props: {
    identitas: {
      type: Object,
      required: false,
      default: () => {
        return {
          nama: "Khoirunnisa Putri",
          nim: "181524014",
          kelas: "3A",
          prodi: "D4 - Teknik Informatika",
          matakuliah: "Proyek 3"
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
          text: "Tambah Logbook",
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
  }
}
</script>
