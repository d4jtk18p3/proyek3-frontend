<template>
<v-container>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Monitoring Tugas</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col  class="ml-auto pl-13 py-4" cols="0" xs="6" sm="6" md="5" lg="4" xl="3">
      <v-select
        v-model="mahasiswa"
        :dark="isDark"
        :items="listMhs"
        item-text="Nama"
        item-value="Nim"
        item-color="#C4C4C4"
        solo
        dense
        return-object
        v-on:input="setMhs(mahasiswa.Nim)"
      >
      </v-select>
    </v-col>
    <v-col cols="12">
      <v-data-table
        dark
        :headers="headers"
        :items="subtugas"
        :loading="isLoading"
        loading-text=""
        :items-per-page="5"
        class="elevation-1"
        :style="{backgroundColor: currentTheme.colorPrimary}"
        @click:row="rowClicked"
      >
        <template v-slot:no-data>
          <p
            :style="{color: currentTheme.colorPrimary}"
            class="text-lg-subtitle-1 font-weight-bold"
          >No Data Available
          </p>
        </template>
        <template  v-slot:[`item.status_subtugas`]="{ item }">
          <v-simple-checkbox v-model="item.status_subtugas" light disabled></v-simple-checkbox>
        </template>
        <template v-slot:[`item.catatan`]="{ value }">
            <div class="text-truncate" style="max-width: 130px">
              {{ value }}
            </div>
        </template>
        <template v-slot:[`item.lampiran`]="{ value }">
            <div class="text-truncate" style="max-width: 130px">
              <a :href="value" target="_blank">{{ value }}</a>
            </div>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
  <DialogDetailSubtugas :visible="showDialogDetail" :subtugas="subValue" :kriteria="kriteria" @close="showDialogDetail=false" />
</v-container>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import DialogDetailSubtugas from "@/views/monitoring/component/dosen/DialogDetailSubtugas"
import SubtugasMonitoringDosen from "../../../../datasource/network/monitoring/subtugas"
import TugasMonitoringDosen from "../../../../datasource/network/monitoring/tugas"
export default {
  name: "DosenViewTable",
  components: { Breadcumbs, DialogDetailSubtugas },
  data () {
    return {
      isLoading: false,
      showDialogDetail: false,
      subValue: {},
      rulesFile: {
      },
      mahasiswa: "",
      listMhs: [
      ],
      breadcrumbItems: [
        {
          text: "Monitoring",
          disabled: false,
          href: "/monitoring/dosen/monitoring-tugas"
        },
        {
          text: "Daftar Tugas",
          disabled: false,
          href: "/monitoring/dosen/monitoring-tugas/daftar-tugas/" + this.$route.params.id_matkul + "/" + this.$route.params.id_perkuliahan
        },
        {
          text: "Monitoring Subtugas",
          disabled: false,
          href: "/monitoring/dosen/monitoring-tugas/daftar-tugas/" + this.$route.params.id_matkul + "/" + this.$route.params.id_perkuliahan + "/tugas/" + this.$route.params.id_tugas
        },
        {
          text: "Detail Subtugas",
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
          text: "Nama",
          value: "nama_subtugas",
          width: "200",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        }
      ],
      subtugas: [],
      kriteria: {}
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
    identity: function () {
      return this.$store.getters.identity
    }
  },
  methods: {
    async setMhs (a) {
      this.$router.push("/monitoring/dosen/monitoring-tugas/daftar-tugas/" + this.$route.params.id_tugas + "/" + this.$route.params.id_perkuliahan + "/tugas/" + this.$route.params.id_tugas + "/" + a).catch(error => {
        if (error.name !== "NavigationDuplicated") {
          throw error
        }
      })
      location.reload()
    },
    rowClicked (value) {
      this.showDialogDetail = true
      this.subValue = value
      console.log(this.subValue)
    }
  },
  async mounted () {
    var sub = await SubtugasMonitoringDosen.getSubtugasByMahasiswa(this.$route.params.id_tugas, this.$route.params.id_mhs)
    var mhs = await TugasMonitoringDosen.getMahasiswaByTugas(this.$route.params.id_tugas)
    var kriteria = await TugasMonitoringDosen.getKriteriaByTugas(this.$route.params.id_tugas)
    var i = 0
    var mhsList = []
    this.subtugas = sub
    this.mahasiswa = this.$route.params.id_mhs
    while (i < mhs.listNIMMahasiswa.length) {
      mhsList.push({
        Nim: mhs.listNIMMahasiswa[i],
        Nama: mhs.listNamaMahasiswa[i]
      })
      i++
    }
    this.listMhs = mhsList
    this.kriteria = kriteria
    if (kriteria.progress === true) {
      this.headers.push({
        text: "Progress",
        align: "center",
        value: "progress",
        sortable: true,
        class: "white--text text-lg-subtitle-1 font-weight-bold"
      })
    }
    if (kriteria.skala === true) {
      this.headers.push({
        text: "Skala Pemahaman",
        align: "center",
        value: "skala_pemahaman",
        class: "white--text text-lg-subtitle-1 font-weight-bold"
      })
    }
    if (kriteria.durasi === true) {
      this.headers.push({
        text: "Durasi",
        align: "center",
        value: "durasi",
        class: "white--text text-lg-subtitle-1 font-weight-bold"
      })
    }
    if (kriteria.catatan === true) {
      this.headers.push({
        text: "Catatan",
        value: "catatan",
        align: "center",
        sortable: false,
        class: "white--text text-lg-subtitle-1 font-weight-bold"
      })
    }
    if (kriteria.lampiran === true) {
      this.headers.push({
        text: "Lampiran",
        value: "lampiran",
        align: "center",
        class: "white--text text-lg-subtitle-1 font-weight-bold"
      })
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
    .checkbox{
      color:purple;
    }
  }
</style>
