<template>
<v-container>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Monitoring APPL 1 - W1 Polymorphism</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col cols="12" class="text-right">
      <v-btn
        :color="currentTheme.colorSecondary"
        outlined
        class="ma-2"
        v-bind="attrs"
        v-on="on"
        @click="addSubtugas"
      >
        + Tambah Subtugas
      </v-btn>
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
        <template v-slot:[`item.Detail`]>
          <v-btn
              text
              color="primary"
              :to="`/monitoring/dosen/monitoring-tugas/tabel-detail`"
              v-bind="attrs"
              v-on="on"
              class="ma-2"
          >
            <span style="font-size: 12px">Lihat Detail</span>
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
  <DialogFormTambahSubtugas :visible="showDialogForm" @close="showDialogForm=false" />
</v-container>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import DialogFormTambahSubtugas from "@/views/monitoring/component/dosen/DialogFormTambahSubtugas"
export default {
  name: "KelasItem",
  components: { Breadcumbs, DialogFormTambahSubtugas },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  data () {
    return {
      showDialogForm: false,
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
          text: "NIM",
          align: "center",
          value: "Nim",
          sortable: false,
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Nama",
          value: "Nama",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Rata-Rata Progress",
          align: "center",
          value: "RataRataProgress",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Taks Dikerjakan",
          align: "center",
          value: "TaksDikerjakan",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Total Durasi",
          align: "center",
          value: "TotalDurasi",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Detail",
          value: "Detail",
          align: "center",
          sortable: false,
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        }
      ],
      items: [
        {
          Nim: "181524002",
          Nama: "Alvira Putrina Derajat",
          RataRataProgress: "50%",
          TaksDikerjakan: "3",
          TotalDurasi: "250"
        },
        {
          Nim: "181524003",
          Nama: "Ananda Bayu Fauzan",
          RataRataProgress: "60%",
          TaksDikerjakan: "5",
          TotalDurasi: "300"
        },
        {
          Nim: "181524004",
          Nama: "Chofief Al Farroqie Ariestotles",
          RataRataProgress: "60%",
          TaksDikerjakan: "4",
          TotalDurasi: "270"
        },
        {
          Nim: "181524005",
          Nama: "Dewanto Joyo Pramono",
          RataRataProgress: "50%",
          TaksDikerjakan: "4",
          TotalDurasi: "240"
        },
        {
          Nim: "181524006",
          Nama: "Dwinanda Alfauzan Suhando",
          RataRataProgress: "50%",
          TaksDikerjakan: "3",
          TotalDurasi: "150"
        },
        {
          Nim: "181524007",
          Nama: "Evan Lokajaya",
          RataRataProgress: "70%",
          TaksDikerjakan: "5",
          TotalDurasi: "340"
        },
        {
          Nim: "181524008",
          Nama: "Fajrina Aflaha",
          RataRataProgress: "50%",
          TaksDikerjakan: "4",
          TotalDurasi: "300",
          Detail: "Lihat Detail"
        },
        {
          Nim: "181524009",
          Nama: "Fatharani",
          RataRataProgress: "60%",
          TaksDikerjakan: "5",
          TotalDurasi: "300"
        },
        {
          Nim: "181524010",
          Nama: "Hafizh Muhammad F",
          RataRataProgress: "60%",
          TaksDikerjakan: "3",
          TotalDurasi: "300"
        },
        {
          Nim: "181524012",
          Nama: "Hanifah Sholihat",
          RataRataProgress: "50%",
          TaksDikerjakan: "2",
          TotalDurasi: "200"
        }
      ],
      isLoading: false,
      rulesFile: {
      }
    }
  },
  methods: {
    addSubtugas () {
      this.showDialogForm = true
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
