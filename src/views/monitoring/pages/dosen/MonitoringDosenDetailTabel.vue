<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Monitoring APPL 1 - W1 Polymorphism</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col  class="ml-auto pl-13 py-4" cols="0" xs="6" sm="6" md="5" lg="4" xl="3">
      <v-combobox solo  v-model="select" :items="choices" :dark="isDark"></v-combobox>
    </v-col>
    <v-col cols="12">
      <v-data-table
        dark
        :headers="headers"
        :items="items"
        :loading="isLoading"
        loading-text=""
        :items-per-page="5"
        class="elevation-1"
        :style="{backgroundColor: currentTheme.colorPrimary}"
      >
        <template v-slot:no-data>
          <p
            :style="{color: currentTheme.colorPrimary}"
            class="text-lg-subtitle-1 font-weight-bold"
          >No Data Available
          </p>
        </template>
        <template  v-slot:[`item.Selesai`]="{ item }">
          <v-simple-checkbox v-model="item.Selesai" light disabled></v-simple-checkbox>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"

export default {
  name: "DosenViewTable",
  components: { Breadcumbs },
  data () {
    return {
      isLoading: false,
      rulesFile: {
      },
      select: [
        "Alvira Putrina D"
      ],
      choices: [
        "Alvira Putrina D",
        "Ananda Bayu"
      ],
      breadcrumbItems: [
        {
          text: "Monitoring",
          disabled: false,
          href: ""
        },
        {
          text: "Link 1",
          disabled: false,
          href: ""
        },
        {
          text: "Link 2",
          disabled: true,
          href: ""
        }
      ],
      headers: [
        {
          text: "Selesai",
          align: "center",
          value: "Selesai",
          sortable: false,
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Nama",
          value: "Nama",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Skala Pemahaman",
          align: "center",
          value: "SkalaPemahaman",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Durasi",
          align: "center",
          value: "Durasi",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Catatan",
          value: "Catatan",
          align: "center",
          sortable: false,
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Lampiran",
          value: "Lampiran",
          align: "center",
          sortable: false,
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        }
      ],
      items: [
        {
          Selesai: true,
          Nama: "Another Type of Employee",
          Target: "50",
          SkalaPemahaman: "8.5",
          Durasi: "00:30:00",
          Catatan: "",
          Lampiran: "Link Spreadsheet"
        },
        {
          Selesai: true,
          Nama: "Another Type of Employee",
          Target: "50",
          SkalaPemahaman: "8",
          Durasi: "00:30:00",
          Catatan: "Dalam kasus ini multi-Thread, ketika program di run hasilnya kata Hello JTK 2018 tidak beraturan,ini dikarenakan thread..",
          Lampiran: "Link Dokumen"
        },
        {
          Selesai: false,
          Nama: "Planning Shapes",
          Target: "50",
          SkalaPemahaman: "5",
          Durasi: "00:30:00",
          Catatan: "",
          Lampiran: "Link Dokumen"
        },
        {
          Selesai: true,
          Nama: "Polymorphic Sorting",
          Target: "50",
          SkalaPemahaman: "4.5",
          Durasi: "00:30:00",
          Catatan: "",
          Lampiran: "Link Dokumen"
        },
        {
          Selesai: true,
          Nama: "Timming Searching and Sorting Algorithms",
          Target: "50",
          SkalaPemahaman: "5",
          Durasi: "00:30:00",
          Catatan: "",
          Lampiran: "Link Dokumen"
        },
        {
          Selesai: false,
          Nama: "Coloring a Moveaible Circle",
          Target: "80",
          SkalaPemahaman: "4.2",
          Durasi: "00:50:00",
          Catatan: "",
          Lampiran: "Link Spreadsheet"
        },
        {
          Selesai: false,
          Nama: "Speed Control",
          Target: "100",
          SkalaPemahaman: "5",
          Durasi: "01:02:00",
          Catatan: "Dalam kasus ini multi-Thread, ketika program di run hasilnya kata Hello JTK 2018 tidak beraturan,ini dikarenakan thread..",
          Lampiran: "Link Spreadsheet"
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    })
  }
}
</script>

<style lang="scss">
  tbody {
    tr:hover {
      background-color: #b9b9b9 !important;
    }
    tr {
      color: black;
      background-color: #FFFFFF !important;
    }
    .checkbox{
      color:purple;
    }
  }
</style>
