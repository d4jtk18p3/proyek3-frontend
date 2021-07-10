<template>
<div>
  <v-row :style="{color: currentTheme.onBackground}">
      <v-col cols="12">
        <p class="text-h4 font-weight-bold">Monitoring {{this.namaMatkul}} - {{this.namaTugas}}</p>
        <breadcumbs :breadcrumb-items="breadcrumbItems"/>
      </v-col>
      <v-col cols="2">
        <v-card
        class="rounded-card rounded-lg"
        :style="{color: currentTheme.onSurface}">
          <Durasi
              :timer="formattedTime"
              :state="timerState"
              :visible="dialog"
              ref="durasi"
              @clicked="onClickChild"
          />
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
          <v-btn
            v-if="btnMulai[item.id]"
            color="primary"
            dark
            width="70"
            rounded
            small
            class="mt-1"
            @click="mulaiItem(item.id)"
          >
            <span style="font-size: 12px" class="font-weight-bold">Mulai</span>
          </v-btn>
          <v-btn
            v-if="btnPause[item.id]"
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
            v-if="btnSelesai[item.id]"
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
        <!-- <template v-slot:[`item.lampiran`]>
          <td><a v-bind:href="items.lampiran" :key="items.lampiran"> link </a></td>
        </template> -->
        <template  v-slot:[`item.durasi`]="{ item }">
          <p v-if="!btnMulai[item.id]">{{item.durasi}}</p>
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
import Durasi from "@/views/monitoring/component/mahasiswa/monitoring/Durasi.vue"
import SubTugasMonitoringBersama from "../../../../../datasource/network/monitoring/monitoringbersama"
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
      timerState: "stopped",
      currentTimer: 0,
      formattedTime: "00:00:00",
      ticker: undefined,
      snackbar: false,
      singleSelect: false,
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
      countSubtugas: 0,
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
      editedIndex: -1,
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
      this.namaSubtugas = this.items[item - 1].nama_subtugas
      this.editedIndex = item
      this.dialog = true
    },
    selesaiItem (item) {
      this.editedIndex = item
      this.dialogSelesai = true
    },
    mulaiItem (item) {
      this.btnPause[item] = true
      this.btnSelesai[item] = true
      this.btnMulai = false
      this.$refs.durasi.start()
    },
    pauseItem (item) {
      this.btnMulai = true
      this.btnPause[item] = false
      this.$refs.durasi.stop()
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
    this.items = items
    console.log(items[0].nama_subtugas)
    this.countSubtugas = items.length
    var x = items[0].id - 2
    console.log("WOY" + x)
    for (var i = 1; i <= items.length; i++) {
      x = x + 1
      console.log(i)
      console.log(items[i - 1].nama_subtugas)
      console.log("item" + items[i - 1].id)
      console.log(items[i - 1].status_subtugas)
      if (items[i - 1].status_subtugas === true) {
        this.btnMulai[i] = false
      } else {
        this.btnMulai[i] = true
      }
      this.btnPause[i] = false
      this.btnSelesai[i] = false
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
