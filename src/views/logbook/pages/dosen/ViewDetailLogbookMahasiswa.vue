<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Lihat Detail Logbook Mahasiswa</p>
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
        <v-col cols="12" class="mt-1">
          <DatePickerItem
          :picker="this.logbookdate"
          :viewOnly="true"/>
        </v-col>

      </v-row>
    </v-col>
    <v-col :cols="isMobile ? `12` : `6` ">
      <ViewDetailLogbookItem
      :kegiatan="this.kegiatan"
      :hasil="this.hasil"
      :kesan="this.kesan"
      :identitas="this.identitas"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import DatePickerItem from "@/views/logbook/component/dosen/DatePickerItem"
import ViewDetailLogbookItem from "@/views/logbook/component/dosen/ViewDetailLogbookItem"

export default {
  name: "LihatLogbook",
  components: { DatePickerItem, Breadcumbs, ViewDetailLogbookItem },
  props: {
    identitas: {
      type: Object,
      required: false,
      default: () => {
        return {
          nama: "Cecep Gorbacep",
          nim: "181524000",
          kelas: "3A",
          prodi: "D4 - Teknik Informatika",
          matakuliah: "Proyek 3"
        }
      }
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
          text: this.identitas.prodi.substring(0, 2) + " - " + this.identitas.matakuliah + " - " + this.identitas.kelas,
          disabled: false,
          href: "/logbook/logbook-mahasiswa/" + this.identitas.prodi + "/" + this.identitas.matakuliah + "/" + this.identitas.kelas
        },
        {
          text: this.identitas.nim,
          disabled: false,
          href: "/logbook/logbook-mahasiswa/" + this.identitas.prodi + "/" + this.identitas.matakuliah + "/" + this.identitas.kelas + "/" + this.identitas.nim
        },
        {
          text: "Lihat Detail Logbook",
          disabled: true,
          href: ""
        },
        {
          text: this.logbookdate,
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
