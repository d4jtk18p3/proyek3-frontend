<template>
<div>
    <v-row :style="{color: currentTheme.onBackground}">
      <v-col cols="12">
        <p class="text-h4 font-weight-bold">Monitoring APPL 1 - W1 Polymorphism</p>
        <breadcumbs :breadcrumb-items="breadcrumbItems"/>
      </v-col>
      <v-col class="mt-2">
      <v-data-table
        v-model="selected"
        dark
        :headers="headers"
        :items="items"
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
        <template v-slot:item.selesai="{ item }">
          <v-simple-checkbox
            v-model="item.selesai"
            light
            :color="currentTheme.colorPrimary"
          ></v-simple-checkbox>
        </template>
        <template v-slot:[`item.Detail`]>
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            width="70"
            rounded="6"
            small
            class="mt-1"
          >
            <span style="font-size: 12px" class="font-weight-bold">Mulai</span>
          </v-btn>
          <v-btn
            color="error"
            dark
            v-bind="attrs"
            v-on="on"
            width="70"
            rounded="6"
            small
            class="mt-1"
          >
            <span style="font-size: 12px" class="font-weight-bold">Pause</span>
          </v-btn>
          <v-btn
            :color="currentTheme.colorPrimary"
            dark
            v-bind="attrs"
            v-on="on"
            width="70"
            rounded="6"
            small
            class="mt-1 mb-1"
            @click="selesaiItem()"
          >
            <span style="font-size: 12px" class="font-weight-bold">Selesai</span>
          </v-btn>
        </template>
        <template v-slot:[`item.Edit`]>
          <v-btn
            class="mr-5"
            v-bind="attrs"
            v-on="on"
            icon :style="{color: currentTheme.onBackground}"
            @click="editItem()"
          >
            <v-icon>
            mdi-pencil
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:[`item.lampiran`]>
          <td><a v-bind:href="items.lampiran" :key="items.lampiran"> link </a></td>
        </template>
        <template v-slot:[`item.Durasi`]>
          <Durasi/>
        </template>
      </v-data-table>
      </v-col>
    </v-row>
  <editProgress :visible="dialog" @close="dialog=false" />
  <SerahkanTugas :visible="dialogSelesai" @close="dialogSelesai=false" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import editProgress from "@/views/monitoring/component/mahasiswa/monitoring/DialogFormEditProgress.vue"
import SerahkanTugas from "@/views/monitoring/component/mahasiswa/monitoring/DialogFormSerahkanTugas.vue"
import Durasi from "@/views/monitoring/component/mahasiswa/monitoring/Durasi.vue"
export default {
  name: "KelasItem",
  components: { Breadcumbs, editProgress, SerahkanTugas, Durasi },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  data () {
    return {
      singleSelect: false,
      selected: [],
      dialog: false,
      dialogSelesai: false,
      breadcrumbItems: [
        {
          text: "Monitoring",
          disabled: true,
          href: ""
        },
        {
          text: "MATA KULIAH APPL 1",
          disabled: false,
          href: ""
        },
        {
          text: "TUGAS W1 POLYMORPHISM",
          disabled: false,
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
          value: "Durasi",
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
        },
        {
          text: "Aksi",
          value: "Detail",
          align: "center",
          sortable: false,
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: " ",
          value: "Edit",
          align: "center",
          sortable: false,
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        }
      ],
      items: [
        {
          id: 1,
          selesai: false,
          subTask: "Another Type of Employee",
          progress: "50",
          skala: "",
          durasi: "00:00:00",
          catatan: "",
          lampiran: ""
        },
        {
          id: 2,
          selesai: true,
          subTask: "Painting Shapes",
          progress: "100",
          skala: "5",
          durasi: "00:11:32",
          catatan: "Dalam kasus ini multi-Thread, ketika program di run hasil nya kata Hello JTK 2018 tidak beraturan, ini dikarenakan thred . . . ",
          lampiran: "https://www.youtube.com/"
        },
        {
          id: 3,
          selesai: false,
          subTask: "Polymorphic Sorting",
          progress: "",
          skala: "",
          durasi: "00:00:00",
          catatan: "",
          lampiran: ""
        },
        {
          id: 4,
          selesai: false,
          subTask: "Searching and Sorting an Integer List",
          progress: "",
          skala: "",
          durasi: "00:00:00",
          catatan: "",
          lampiran: ""
        },
        {
          id: 5,
          selesai: false,
          subTask: "Timing Searching and Sorting Algorithms",
          progress: "",
          skala: "",
          durasi: "00:00:00",
          catatan: "",
          lampiran: ""
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
