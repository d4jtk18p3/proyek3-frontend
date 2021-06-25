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
        :headers="headers"
        :items="items"
        :loading="isLoading"
        loading-text=""
        :items-per-page="5"
        class="elevation-3 white--text"
        :style="{backgroundColor: currentTheme.onBackground}"
      >
        <template v-slot:no-data>
          <p
            :style="{color: currentTheme.colorPrimary}"
            class="text-lg-subtitle-1 font-weight-bold"
          >No Data Available
          </p>
        </template>
        <template v-slot:item.status_subtugas="{ item }">
          <v-simple-checkbox
            v-model="item.status_subtugas"
            light
            disabled
            :color="currentTheme.colorPrimary"
          ></v-simple-checkbox>
        </template>
        <template v-slot:item.Detail="{ item }">
          <v-btn
            v-if="btnMulai[item.id]"
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            width="70"
            rounded="6"
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
            v-bind="attrs"
            v-on="on"
            width="70"
            rounded="6"
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
            v-bind="attrs"
            v-on="on"
            width="70"
            rounded="6"
            small
            class="mt-1 mb-1"
            @click="selesaiItem(item.id)"
          >
            <span style="font-size: 12px" class="font-weight-bold">Selesai</span>
          </v-btn>
        </template>
        <template v-slot:item.Edit="{ item }">
          <v-btn
            class="mr-5"
            v-bind="attrs"
            v-on="on"
            icon :style="{color: currentTheme.onBackground}"
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
        <template v-slot:[`item.Durasi`]>
          <Durasi/>
        </template>
      </v-data-table>
      </v-col>
    </v-row>
  <editProgress :index="editedIndex" :visible="dialog" @close="dialog=false" />
  <SerahkanTugas :index="editedIndex" :visible="dialogSelesai" @close="dialogSelesai=false" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import editProgress from "@/views/monitoring/component/mahasiswa/monitoring/DialogFormEditProgress.vue"
import SerahkanTugas from "@/views/monitoring/component/mahasiswa/monitoring/DialogFormSerahkanTugas.vue"
import Durasi from "@/views/monitoring/component/mahasiswa/monitoring/Durasi.vue"
import SubTugasMonitoringMahasiswa from "../../../../../datasource/network/monitoring/subtugas"
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
      btnMulai: [],
      btnPause: [],
      btnSelesai: [],
      countSubtugas: 0,
      pertama: true,
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
          value: "waktu_selesai",
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
    editItem (item) {
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
    },
    pauseItem (item) {
      this.btnMulai = true
    }
  },
  async mounted () {
    this.items = await SubTugasMonitoringMahasiswa.getSubTugasMatkul("1")
    this.countSubtugas = this.items.length
    if (this.pertama) {
      for (var i = 0; i <= this.countSubtugas; i++) {
        this.btnMulai.push(true)
        this.btnPause.push(false)
        this.btnSelesai.push(false)
      }
      this.pertama = false
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
