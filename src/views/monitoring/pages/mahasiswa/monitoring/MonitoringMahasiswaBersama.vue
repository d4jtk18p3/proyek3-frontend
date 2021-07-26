<template>
<div>
    <v-row :style="{color: currentTheme.onBackground}">
      <v-col cols="12">
        <p class="text-h4 font-weight-bold">Monitoring Teman {{this.namaMatkul}} - {{this.namaTugas}}</p>
      </v-col>
      <v-col cols="12">
        <breadcumbs :breadcrumb-items="breadcrumbItems"/>
      </v-col>
      <v-col  class="ml-auto pl-13" :style="{color : isDark ? currentTheme.colorSecondary : currentTheme.colorSecondary}" lg="3">
      <v-select
        v-model="selectedItem"
        :dark="isDark"
        :items="listMahasiswa"
        solo
        dense
      >
      </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mt-n6">
      <v-data-table
        v-model="selected"
        :expanded.sync="items"
        :headers="headers"
        :items="selectedData.items"
        :loading="isLoading"
        loading-text=""
        :items-per-page="5"
        class="elevation-3"
        show-expand
        :style="{backgroundColor: currentTheme.colorPrimary}"
      >
        <template v-slot:no-data>
          <p
            :style="{color: currentTheme.colorPrimary}"
            class="text-lg-subtitle-1 font-weight-bold"
          >No Data Available
          </p>
        </template>
        <template v-slot:[`item.status_subtugas`]="{ item }">
          <v-simple-checkbox
            v-model="item.status_subtugas"
            light
            disabled
            :color="currentTheme.colorPrimary"
          ></v-simple-checkbox>
        </template>
        <template v-slot:[`item.catatan`]="{ item }">
            <div class="text-truncate" style="max-width: 130px">
              {{ item.catatan }}
            </div>
        </template>
        <template v-slot:[`item.lampiran`]="{ item }">
          <div class="text-truncate" style="max-width: 130px">
            <a :href="item.lampiran" target="_blank">{{item.lampiran}}</a>
          </div>
        </template>
        <template v-slot:expanded-item="{ item }">
          <td :colspan="12">
            Catatan &nbsp; &nbsp;: {{ item.catatan }}
            <br />
            Lampiran : {{ item.lampiran }}
          </td>
        </template>
      </v-data-table>
      </v-col>
    </v-row>
</div>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import monitoringBersama from "../../../../../datasource/network/monitoring/monitoringbersama"

export default {
  name: "MonitoringBersama",
  components: { Breadcumbs },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    }),
    identity: function () {
      return this.$store.getters.identity
    },
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
      selectedItem: 1,
      namaMatkul: "",
      namaTugas: "",
      id: 0,
      singleSelect: false,
      selected: [],
      dialog: false,
      dialogSelesai: false,
      breadcrumbItems: [
        {
          text: "Monitoring",
          disabled: false,
          href: "/monitoring/mahasiswa/matakuliah"
        },
        {
          text: "Tugas",
          disabled: false,
          href: "/monitoring/mahasiswa/matakuliah/" + this.$route.params.namaMatkul + "&" + this.$route.params.namaTugas + "&" + this.$route.params.id
        },
        {
          text: "Lihat Monitoring Teman",
          disabled: false,
          href: ""
        }
      ],
      headers: [
        {
          text: "Selesai",
          align: "center",
          value: "status_subtugas",
          sortable: false,
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Sub-task",
          value: "nama_subtugas",
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
          value: "skala_pemahaman",
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
  },
  async mounted () {
    this.namaMatkul = this.$route.params.namaMatkul
    this.namaTugas = this.$route.params.namaTugas
    this.id = this.$route.params.id
    this.data = await monitoringBersama.getAllTugasMahasiswaByidtugas(this.$route.params.id)
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
