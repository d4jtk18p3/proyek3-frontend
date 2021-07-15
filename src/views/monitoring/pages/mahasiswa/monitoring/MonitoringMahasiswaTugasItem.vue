<template>
<div>
  <v-row :style="{color: currentTheme.onBackground}">
      <v-col cols="12">
        <p class="text-h4 font-weight-bold">Monitoring {{this.namaMatkul}} - {{this.namaTugas}}</p>
        <breadcumbs :breadcrumb-items="breadcrumbItems"/>
      </v-col>
      <v-col :cols="isMobile? 2 : 2">
        <v-card
        class="rounded-card rounded-lg pa-3"
        :style="{color: currentTheme.onSurface}">
          <div class="timer text-center" >
            <span class="minute font-weight-medium text-h7" style="color: red">{{ hours }}</span>
            <span>:</span>
            <span class="minute font-weight-medium text-h7" style="color: red">{{ minutes }}</span>
            <span>:</span>
            <span class="seconds font-weight-medium text-h7" style="color: red">{{ seconds }}</span>
          </div>
        </v-card>
      </v-col>
      <v-col
        class="text-right"
      >
        <v-btn
          :color="currentTheme.colorSecondary"
          dark
          @click="lihatMonitoringTeman()"
        >
          <span style="font-size: 12px" :style="{color : isDark ? currentTheme.colorPrimary : currentTheme.surface}">Lihat Monitoring Teman</span>
        </v-btn>
      </v-col>
  </v-row>
  <v-row>
      <v-col class="mt-2">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="items"
        :loading="isLoading"
        loading-text=""
        :items-per-page="7"
        class="elevation-3 white--text"
        :style="{backgroundColor: currentTheme.colorPrimary}"
      >
        <template v-slot:no-data>
          <p
            :style="{color: currentTheme.surface}"
            class="text-lg-subtitle-1 font-weight-bold"
          >No Data Available
          </p>
        </template>
        <template v-slot:[`item.status_subtugas`]="{ item }">
          <v-simple-checkbox
            v-model="item.status_subtugas"
            light
            disabled
            :color="currentTheme.colorOnPrimary"
          ></v-simple-checkbox>
        </template>
        <template v-slot:[`item.Detail`]="{ item }">
          <div class="start" v-show="btnMulai[item.id]" @click="mulaiItem(item.id)">
            <v-btn
              color="primary"
              dark
              width="70"
              rounded
              small
              class="mt-1"
            >
              <span style="font-size: 12px" class="font-weight-bold">Mulai</span>
            </v-btn>
          </div>
          <v-btn
            v-show="btnPause[item.id]"
            color="error"
            dark
            width="70"
            rounded
            small
            class="mt-1"
            @click="pauseItem(item.id)"
          >
            <span style="font-size: 12px" class="font-weight-bold">Pause</span>
          </v-btn>
          <v-btn
            v-show="btnSelesai[item.id]"
            :color="currentTheme.colorPrimary"
            dark
            width="70"
            rounded
            small
            class="mt-1 mb-1"
            @click="selesaiItem(item.id)"
          >
            <span style="font-size: 12px" class="font-weight-bold">Selesai</span>
          </v-btn>
        </template>
        <template v-slot:[`item.Edit`]="{ item }">
          <v-btn
            class="mr-5"
            icon :style="{color: currentTheme.colorPrimary}"
          >
            <v-icon
            @click="editItem(item.id)">
            mdi-pencil
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
      </v-col>
  </v-row>
  <editProgress :index="editedIndex" :subTask="namaSubtugas" :visible="dialog" @close="dialog=false" />
  <SerahkanTugas :index="editedIndex" :subTask="namaSubtugas" :visible="dialogSelesai" @close="dialogSelesai=false" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import editProgress from "@/views/monitoring/component/mahasiswa/monitoring/DialogFormEditProgress.vue"
import SerahkanTugas from "@/views/monitoring/component/mahasiswa/monitoring/DialogFormSerahkanTugas.vue"
import SubTugasMonitoringBersama from "../../../../../datasource/network/monitoring/monitoringbersama"
import SubtugasMonitoringDosen from "../../../../../datasource/network/monitoring/subtugas"
export default {
  name: "KelasItem",
  components: { Breadcumbs, editProgress, SerahkanTugas },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
    hours: function () {
      const hours = Math.floor(this.totalTime / 3600)
      return this.padTime(hours)
    },
    minutes: function () {
      const minutes = Math.floor((this.totalTime - (this.hours * 3600)) / 60)
      return this.padTime(minutes)
    },
    seconds: function () {
      const seconds = Math.floor((this.totalTime - (this.minutes * 60) - (this.hours * 3600)))
      return this.padTime(seconds)
    }
  },
  data () {
    return {
      timer: null,
      totalTime: (0 * 60),
      namaMatkul: "",
      namaTugas: "",
      namaSubtugas: "",
      id: 0,
      selected: [],
      dialog: false,
      dialogSelesai: false,
      btnMulai: [],
      btnPause: [],
      btnSelesai: [],
      breadcrumbItems: [
        {
          text: "Dasboard",
          disabled: false,
          href: "/monitoring/mahasiswa/dashboard"
        },
        {
          text: "MATA KULIAH " + this.$route.params.namaMatkul,
          disabled: false,
          href: "/monitoring/mahasiswa/matakuliah"
        },
        {
          text: "TUGAS " + this.$route.params.namaTugas,
          disabled: true,
          href: ""
        }
      ],
      items: [
      ],
      pertama: 0,
      editedIndex: -1,
      editedProgress: 0,
      editedSkalaPemahaman: 0,
      editedCatatan: "",
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
          sortable: true,
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
      isLoading: false,
      rulesFile: {
      }
    }
  },
  methods: {
    onClickChild (value) {
      console.log(value) // someValue
    },
    editItem (item) {
      this.editedIndex = item
      var i = this.pertama
      var count = 0
      while (i < this.editedIndex) {
        count += 1
        i++
      }
      this.namaSubtugas = this.items[count].nama_subtugas
      this.editProgress = this.items[count].progress
      this.editedSkalaPemahaman = this.items[count].skala_pemahaman
      this.editedCatatan = this.items[count].catatan
      this.dialog = true
    },
    selesaiItem (item) {
      this.editDurasi(item)
      this.editedIndex = item
      this.dialogSelesai = true
    },
    mulaiItem (item) {
      this.timer = setInterval(() => this.countdown(), 1000)
      this.btnMulai = true
      this.btnPause[item] = true
      this.btnSelesai[item] = true
      console.log(item)
    },
    countdown: function () {
      this.totalTime++
    },
    padTime: function (time) {
      return (time < 10 ? "0" : " ") + time
    },
    async editDurasi (item) {
      clearInterval(this.timer)
      var Index = item
      var i = this.pertama
      var count = 0
      while (i < Index) {
        count += 1
        i++
      }
      var durasi = Math.ceil(this.totalTime / 60) + this.items[count].durasi
      var updateSubTugas = await SubtugasMonitoringDosen.putSubTugasDurasi(Index, durasi)
      console.log(updateSubTugas)
    },
    async pauseItem (item) {
      clearInterval(this.timer)
      var Index = item
      var i = this.pertama
      var count = 0
      while (i < Index) {
        count += 1
        i++
      }
      var durasi = Math.ceil(this.totalTime / 60) + this.items[count].durasi
      var updateSubTugas = await SubtugasMonitoringDosen.putSubTugasDurasi(Index, durasi)
      console.log(updateSubTugas)
      window.location.reload()
    },
    lihatMonitoringTeman () {
      this.$router.push("/monitoring/mahasiswa/monitoringTeman/" + this.namaMatkul + "&" + this.namaTugas + "&" + this.id).catch(error => {
        if (error.name !== "NavigationDuplicated") {
          throw error
        }
      })
    }
  },
  async mounted () {
    this.namaMatkul = this.$route.params.namaMatkul
    this.namaTugas = this.$route.params.namaTugas
    this.id = this.$route.params.id
    var items = await SubTugasMonitoringBersama.getSubTugasbyMahasiswa(this.id, "181524002")
    console.log(items)
    var i = 0
    while (i < items.length) {
      if (i === 0) {
        this.pertama = items[i].id
      }
      this.items.push({
        id: items[i].id,
        index: i,
        nama_subtugas: items[i].nama_subtugas,
        status_subtugas: items[i].status_subtugas,
        progress: items[i].progress,
        skala_pemahaman: items[i].skala_pemahaman,
        catatan: items[i].catatan,
        durasi: items[i].durasi,
        lampiran: items[i].lampiran,
        tenggat: items[i].tenggat,
        waktu_selesai: items[i].waktu_selesai
      })
      i++
    }
    console.log(this.items)
    i = 0
    while (i < items.length) {
      if (items[i].status_subtugas !== true) {
        this.btnMulai[this.items[i].id] = true
      }
      this.btnPause[this.items[i].id] = false
      this.btnSelesai[this.items[i].id] = false
      i++
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
