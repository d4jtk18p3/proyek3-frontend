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
            <v-col :cols="isMobile ? '7' : '8'" class="py-0">
              <div class="text-start">: {{nama}}</div>
            </v-col>
            <v-col :cols="isMobile ? '1' : '1'"></v-col>
            <v-col :cols="isMobile ? '4' : '3'" class="py-0">
              <div class="text-start">NIM</div>
            </v-col>
            <v-col :cols="isMobile ? '7' : '5'" class="py-0">
              <div class="text-start">: {{nim}}</div>
            </v-col>
              <v-col :cols="isMobile ? '1' : '4'"></v-col>
            <v-col :cols="isMobile ? '4' : '3'" class="py-0">
              <div class="text-start">Kelas</div>
            </v-col>
            <v-col :cols="isMobile ? '7' : '5'" class="py-0">
              <div class="text-start">: {{kelasString}}</div>
            </v-col>
              <v-col :cols="isMobile ? '1' : '4'"></v-col>
            <v-col :cols="isMobile ? '4' : '3'" class="py-0">
              <div class="text-start">Prodi</div>
            </v-col>
            <v-col :cols="isMobile ? '7' : '7'" class="py-0">
              <div class="text-start">: {{prodi}}</div>
            </v-col>
            <v-col :cols="isMobile ? '1' : '2'"></v-col>
            <v-col :cols="isMobile ? '4' : '3'" class="py-0">
              <div class="text-start">Mata Kuliah</div>
            </v-col>
            <v-col :cols="isMobile ? '7' : '5'" class="py-0">
              <div class="text-start">: {{namaMataKuliah}}</div>
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
      :nim="this.nim"
      :nama="this.nama"
      :kelasString="this.kelasString"
      :namaMataKuliah="this.namaMataKuliah"
      :prodi="this.prodi"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import DatePickerItem from "@/views/logbook/component/dosen/DatePickerItem"
import ViewDetailLogbookItem from "@/views/logbook/component/dosen/ViewDetailLogbookItem"
import BackEndLogbook from "../../../../datasource/network/logbook/logbook"
import BackEndEntri from "../../../../datasource/network/logbook/entri"

export default {
  name: "LihatLogbook",
  components: { DatePickerItem, Breadcumbs, ViewDetailLogbookItem },
  props: {
    nim: {
      type: String,
      required: false
    },
    nama: {
      type: String,
      required: false
    },
    namaMataKuliah: {
      type: String,
      required: false
    },
    prodi: {
      type: String,
      required: false
    },
    kelasString: {
      type: String,
      required: false
    },
    kegiatan: {
      type: String,
      required: false
    },
    hasil: {
      type: String,
      required: false
    },
    kesan: {
      type: String,
      required: false
    },
    logbookdate: {
      type: Date,
      required: false,
      default: () => {
        return new Date().toISOString().substr(0, 10)
      }
    },
    idEntri: {
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
          disabled: false,
          href: "/logbook/logbook-mahasiswa/" + this.prodi + "/" + this.namaMataKuliah + "/" + this.kelasString
        },
        {
          text: this.nim,
          disabled: false,
          href: "/logbook/logbook-mahasiswa/" + this.prodi + "/" + this.namaMataKuliah + "/" + this.kelasString + "/" + this.nim
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
  },
  async mounted () {
    var entri = await BackEndEntri.getOneEntryLogbookMhsByid(this.idEntri)
    this.kegiatan = entri.kegiatan
    this.hasil = entri.hasil
    this.kesan = entri.kesan
    var parts = entri.tanggal.split("-")
    this.logbookdate = new Date(parts[2], parts[1] - 1, parts[0], 7).toISOString().substr(0, 10)
    var logbooks = await BackEndLogbook.getLogbooksMhsByNIM(this.nim)
    this.nama = logbooks.nama
  }
}
</script>
