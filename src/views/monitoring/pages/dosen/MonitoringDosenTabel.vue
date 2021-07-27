<template>
<v-container>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Monitoring Tugas</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col cols="12" class="text-right">
      <v-btn
        :color="currentTheme.colorSecondary"
        outlined
        class="ma-2"
        @click="addSubtugas"
      >
        + Tambah Subtugas
      </v-btn>
    </v-col>
    <v-col cols="12">
      <p
      class="text-center font-weight-bold text-h5"
      :style="{color: currentTheme.onBackground}"
      >Daftar Subtugas</p>
      <v-data-table
        dark
        :headers="headers"
        :items="subtugas"
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
        <template v-slot:[`item.id`]="{item}">
          <v-btn
              text
              color="primary"
              class="ma-2"
              @click="editSubtugas(item)"
          >
            <v-icon :style="{color: currentTheme.onBackground}">
            mdi-pencil
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="12">
      <p
      class="text-center font-weight-bold text-h5"
      :style="{color: currentTheme.onBackground}"
      >Monitoring Mahasiswa</p>
      <v-data-table
        dark
        :headers="headersMhs"
        :items="listMhs"
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
        <template v-slot:[`item.id`]="{item}">
          <v-btn
              text
              color="primary"
              class="ma-2"
              @click="routeLihatDetail(item)"
          >
            <span style="font-size: 12px">Lihat Detail</span>
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
  <DialogFormTambahSubtugas :visible="showDialogForm" @close="showDialogForm=false" />
  <DialogFormEditSubtugas :visible="showDialogFormEdit" :idSubtugas="id_subtugas" @close="showDialogFormEdit=false" />
</v-container>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import DialogFormTambahSubtugas from "@/views/monitoring/component/dosen/DialogFormTambahSubtugas"
import DialogFormEditSubtugas from "@/views/monitoring/component/dosen/DialogFormEditSubtugas"
import SubtugasMonitoringDosen from "../../../../datasource/network/monitoring/subtugas"
import TugasMonitoringDosen from "../../../../datasource/network/monitoring/tugas"
export default {
  name: "KelasItem",
  components: { Breadcumbs, DialogFormTambahSubtugas, DialogFormEditSubtugas },
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
  data () {
    return {
      id_subtugas: 0,
      showDialogForm: false,
      showDialogFormEdit: false,
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
          href: ""
        },
        {
          text: "Detail Subtugas",
          disabled: true,
          href: ""
        }
      ],
      subtugas: [],
      headers: [
        {
          text: "Nama Subtugas",
          align: "left",
          value: "NamaSub",
          sortable: false,
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Tenggat",
          value: "Tenggat",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Edit",
          align: "center",
          value: "id",
          sortable: false,
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        }
      ],
      headersMhs: [
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
        }
      ],
      listMhs: [],
      isLoading: false,
      rulesFile: {
      }
    }
  },
  methods: {
    addSubtugas () {
      this.showDialogForm = true
    },
    async editSubtugas (item) {
      this.showDialogFormEdit = true
      if (item != null) {
        this.id_subtugas = item.id
      }
      console.log(this.id_subtugas)
    },
    routeLihatDetail (item) {
      console.log(item.Nim)
      const currentRoute = this.$route.path
      this.$router.push(currentRoute + "/" + item.Nim).catch(error => {
        if (error.name !== "NavigationDuplicated") {
          throw error
        }
      })
    }
  },
  async mounted () {
    var sub = await SubtugasMonitoringDosen.getSubtugasByTugas(this.$route.params.id_tugas)
    var mhs = await TugasMonitoringDosen.getMahasiswaByTugas(this.$route.params.id_tugas)
    var kriteria = await TugasMonitoringDosen.getKriteriaByTugas(this.$route.params.id_tugas)
    var i = 0
    var j = 0
    var k = 0
    var progres = 0
    var mhsList = []
    var subList = []
    var task = 0
    var durasi = 0
    while (i < sub.length) {
      var date = new Date(sub[i].tenggat)
      var dateStr =
        ("00" + date.getDate()).slice(-2) + "/" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
        date.getFullYear() + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2)
      subList.push({
        id: sub[i].id,
        NamaSub: sub[i].nama_subtugas,
        Tenggat: dateStr
      })
      i++
    }
    if (kriteria.progress === true) {
      this.headersMhs.push({
        text: "Rata-Rata Progress",
        align: "center",
        value: "RataRataProgress",
        class: "white--text text-lg-subtitle-1 font-weight-bold"
      })
      this.headersMhs.push({
        text: "Taks Dikerjakan",
        align: "center",
        value: "TaksDikerjakan",
        class: "white--text text-lg-subtitle-1 font-weight-bold"
      })
    } else if (kriteria.durasi === true) {
      this.headersMhs.push({
        text: "Taks Dikerjakan",
        align: "center",
        value: "TaksDikerjakan",
        class: "white--text text-lg-subtitle-1 font-weight-bold"
      })
    }

    if (kriteria.durasi === true) {
      this.headersMhs.push({
        text: "Total Durasi",
        align: "center",
        value: "TotalDurasi",
        class: "white--text text-lg-subtitle-1 font-weight-bold"
      })
    }
    this.headersMhs.push({
      text: "Detail",
      value: "id",
      align: "center",
      sortable: false,
      class: "white--text text-lg-subtitle-1 font-weight-bold"
    })
    while (j < mhs.listNIMMahasiswa.length) {
      var subMhs = await SubtugasMonitoringDosen.getSubtugasByMahasiswa(this.$route.params.id_tugas, mhs.listNIMMahasiswa[j])
      while (k < subMhs.length) {
        if (subMhs[k].progress !== null) {
          progres += subMhs[k].progress
          task += 1
        } else if (subMhs[k].durasi !== null) {
          task += 1
        }

        if (subMhs[k].durasi !== null) {
          durasi += subMhs[k].durasi
        }
        k++
      }
      progres = progres / subMhs.length
      var progresFix = progres
      if (Number.isInteger(progres) === false) {
        progresFix = progres.toFixed(2)
      }
      mhsList.push({
        Nim: mhs.listNIMMahasiswa[j],
        Nama: mhs.listNamaMahasiswa[j],
        RataRataProgress: progresFix,
        TaksDikerjakan: task,
        TotalDurasi: durasi
      })
      progres = 0
      task = 0
      durasi = 0
      k = 0
      j++
    }

    this.subtugas = subList
    this.listMhs = mhsList
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
