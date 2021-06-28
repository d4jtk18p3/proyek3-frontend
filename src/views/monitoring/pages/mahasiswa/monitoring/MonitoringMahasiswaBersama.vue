<template>
  <v-container>
    <v-row :style="{color: currentTheme.onBackground}">
      <v-col cols="12">
        <p class="text-h4 font-weight-bold">Monitoring APPL 1 - W1 Polymorphism</p>
      </v-col>
      <v-col cols="12">
        <breadcumbs :breadcrumb-items="breadcrumbItems"/>
      </v-col>
      <v-col  class="ml-auto pl-13 py-4" cols="0" xs="6" sm="6" md="3" lg="4" xl="3">
        <v-select
        v-model="selectedItem"
        :dark="isDark"
        :items="listMahasiswa"
        item-color="#C4C4C4"
        solo
        dense
      >
      </v-select>
      </v-col>
      <v-col cols="12">
      <v-data-table
        v-model="selected"
        dark
        :headers="headers"
        :items="selectedData.items"
        :loading="isLoading"
        loading-text=""
        :items-per-page="5"
        class="elevation-3"
        :style="{backgroundColor: currentTheme.onBackground}"
      >
        <template v-slot:no-data>
          <p
            :style="{color: currentTheme.colorPrimary}"
            class="text-lg-subtitle-1 font-weight-bold"
          >No Data Available
          </p>
        </template>
        <template v-slot:[`item.selesai`]="{ item }">
          <v-simple-checkbox
            v-model="item.selesai"
            light
            disabled
            :color="currentTheme.colorPrimary"
          ></v-simple-checkbox>
        </template>
      </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"

export default {
  name: "MonitoringBersama",
  components: { Breadcumbs },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    listMahasiswa () {
      return this.data.map((data, index) => {
        return {
          text: data.Mahasiswa,
          value: index
        }
      })
    },
    selectedData () {
      if (this.selectedItem === -1) {
        return {}
      }
      return this.data[this.selectedItem]
    }
  },
  data () {
    return {
      selectedItem: -1,
      singleSelect: false,
      selected: [],
      dialog: false,
      dialogSelesai: false,
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
          value: "selesai",
          sortable: false,
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Sub-task",
          value: "subTask",
          sortable: false,
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Progress",
          align: "center",
          sortable: false,
          value: "progress",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Skala",
          align: "center",
          sortable: false,
          value: "skala",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Durasi",
          align: "center",
          sortable: false,
          value: "durasi",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Catatan",
          value: "catatan",
          align: "center",
          sortable: false,
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Lampiran",
          value: "lampiran",
          align: "center",
          sortable: false,
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        }
      ],
      data: [
        {
          Mahasiswa: "181524002-Alvira Putrina D",
          items: [
            {
              selesai: false,
              subTask: "Another Type of Employee",
              progress: "50",
              skala: "",
              durasi: "00:00:00",
              catatan: "",
              lampiran: ""
            },
            {
              selesai: true,
              subTask: "Painting Shapes",
              progress: "100",
              skala: "5",
              durasi: "00:11:32",
              catatan: "Dalam kasus ini multi-Thread, ketika program di run hasil nya kata Hello JTK 2018 tidak beraturan, ini dikarenakan thred . . . ",
              lampiran: "Link Doc"
            },
            {
              selesai: false,
              subTask: "Polymorphic Sorting",
              progress: "",
              skala: "",
              durasi: "00:00:00",
              catatan: "",
              lampiran: ""
            },
            {
              selesai: false,
              subTask: "Searching and Sorting an Integer List",
              progress: "",
              skala: "",
              durasi: "00:00:00",
              catatan: "",
              lampiran: ""
            },
            {
              selesai: false,
              subTask: "Timing Searching and Sorting Algorithms",
              progress: "",
              skala: "",
              durasi: "00:00:00",
              catatan: "",
              lampiran: ""
            },
            {
              selesai: true,
              subTask: "Coloring a moveable Cricle",
              progress: "",
              skala: "",
              durasi: "00:00:00",
              catatan: "",
              lampiran: ""
            },
            {
              selesai: false,
              subTask: "Speed Control",
              progress: "",
              skala: "",
              durasi: "00:00:00",
              catatan: "",
              lampiran: ""
            }
          ]
        },
        {
          Mahasiswa: "18152403-Ananda Bayu A",
          items: [
            {
              selesai: true,
              subTask: "Another Type of Employee",
              progress: "50",
              skala: "4.5",
              durasi: "01:00:00",
              catatan: "",
              lampiran: "Link Doc"
            },
            {
              selesai: true,
              subTask: "Painting Shapes",
              progress: "100",
              skala: "5",
              durasi: "00:30:32",
              catatan: "Dalam kasus ini multi-Thread, ketika program di run hasil nya kata Hello JTK 2018 tidak beraturan, ini dikarenakan thred . . . ",
              lampiran: "Link Doc"
            },
            {
              selesai: true,
              subTask: "Polymorphic Sorting",
              progress: "4.5",
              skala: "4",
              durasi: "00:40:50",
              catatan: "",
              lampiran: ""
            },
            {
              selesai: false,
              subTask: "Searching and Sorting an Integer List",
              progress: "",
              skala: "",
              durasi: "00:00:00",
              catatan: "",
              lampiran: ""
            },
            {
              selesai: false,
              subTask: "Timing Searching and Sorting Algorithms",
              progress: "",
              skala: "",
              durasi: "00:00:00",
              catatan: "",
              lampiran: ""
            },
            {
              selesai: false,
              subTask: "Coloring a moveable Cricle",
              progress: "",
              skala: "",
              durasi: "00:00:00",
              catatan: "",
              lampiran: ""
            },
            {
              selesai: false,
              subTask: "Speed Control",
              progress: "",
              skala: "",
              durasi: "00:00:00",
              catatan: "",
              lampiran: ""
            }
          ]
        }
      ],
      isLoading: false,
      rulesFile: {
      }
    }
  },
  methods: {
    editItem () {
      this.dialog = true
    },
    selesaiItem () {
      this.dialogSelesai = true
    }
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
  }
</style>
