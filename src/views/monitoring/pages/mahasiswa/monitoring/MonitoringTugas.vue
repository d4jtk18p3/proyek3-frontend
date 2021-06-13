<template>
  <v-container>
    <v-row :style="{color: currentTheme.onBackground}">
      <v-col cols="12">
        <p class="text-h4 font-weight-bold">Monitoring APPL 1 - W1 Polymorphism</p>
      </v-col>
      <v-col cols="12">
        <breadcumbs :breadcrumb-items="breadcrumbItems"/>
      </v-col>
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
      </v-data-table>
      <v-dialog
        v-model="dialog"
        width="420"
      >
        <v-card
          :style="{background: currentTheme.surface}"
          class="pa-3"
        >
          <v-row justify="center" class="my-5">
            <v-col cols="12">
              <div class="text-h4 font-weight-bold text-center" :style="{color: currentTheme.onSurface}">Edit Progress</div>
              <div class="text-h7 font-weight-bold text-center font-italic" :style="{color: currentTheme.onSurface}">{{ subTask }}</div>
            </v-col>
            <v-col cols="12" sm="10" class="mt-3">
              <div class="text-h7 font-weight-bold" :style="{color: currentTheme.onSurface}">Target</div>
              <div class="text-caption font-weight-medium font-italic" :style="{color: currentTheme.onSurface}">*isi dengan rentang 1-100</div>
              <v-slider
                v-model="targetValue"
                :thumb-size="24"
                :color="currentTheme.colorSecondary"
                thumb-label
              ></v-slider>
              <div class="text-h7 font-weight-bold" :style="{color: currentTheme.onSurface}">Skala Pemahaman</div>
              <div class="text-caption font-weight-medium font-italic" :style="{color: currentTheme.onSurface}">*isi dengan rentang 1-5</div>
              <v-slider
                v-model="skalaPemahamanValue"
                :thumb-size="24"
                :color="currentTheme.colorSecondary"
                thumb-label
                max="5"
                step="0.1"
              ></v-slider>
              <div class="text-h7 font-weight-bold pb-1" :style="{color: currentTheme.onSurface}">Catatan</div>
              <v-textarea
                v-model="catatan"
                outlined
                :color="currentTheme.colorSecondary"
              ></v-textarea>
              <v-row justify="center">
                <v-col sm="5" class="mt-1">
                  <v-btn color="currentTheme.colorPrimary" elevation="2" width="100" outlined>
                    <span style="font-size: 12px" class="font-weight-bold">Batal</span>
                  </v-btn>
                </v-col>
                <v-col sm="5" class="mt-1">
                  <v-btn
                    :color="currentTheme.colorPrimary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    width="100"
                  >
                    <span style="font-size: 12px" class="font-weight-light">Simpan</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialogSelesai"
        width="420"
      >
        <v-card
          :style="{background: currentTheme.surface}"
          class="pa-3"
        >
          <v-row justify="center" class="my-5">
            <v-col cols="12">
              <div class="text-h4 font-weight-bold text-center" :style="{color: currentTheme.onSurface}">Serahkan Tugas</div>
              <div class="text-h7 font-weight-bold text-center font-italic" :style="{color: currentTheme.onSurface}">{{ subTask }}</div>
            </v-col>
            <v-col cols="12" sm="10" class="mt-3">
              <div class="text-h7 font-weight-bold" :style="{color: currentTheme.onSurface}">Lampiran</div>
              <div class="text-caption font-weight-medium font-italic" :style="{color: currentTheme.onSurface}">*Berupa link</div>
              <v-text-field
                v-model="lampiran"
                outlined
                class="mt-3 mb-0"
                :color="currentTheme.colorSecondary"
              ></v-text-field>
              <v-row justify="center">
                <v-col sm="5" class="mt-1">
                  <v-btn color="currentTheme.colorPrimary" elevation="2" width="100" outlined>
                    <span style="font-size: 12px" class="font-weight-bold">Batal</span>
                  </v-btn>
                </v-col>
                <v-col sm="5" class="mt-1">
                  <v-btn
                    :color="currentTheme.colorPrimary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    width="100"
                  >
                    <span style="font-size: 12px" class="font-weight-light">Simpan</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"

export default {
  name: "KelasItem",
  components: { Breadcumbs },
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
          selesai: "1",
          subTask: "Another Type of Employee",
          progress: "50",
          skala: "",
          durasi: "00:00:00",
          catatan: "",
          lampiran: ""
        },
        {
          selesai: "2",
          subTask: "Painting Shapes",
          progress: "100",
          skala: "5",
          durasi: "00:11:32",
          catatan: "Dalam kasus ini multi-Thread, ketika program di run hasil nya kata Hello JTK 2018 tidak beraturan, ini dikarenakan thred . . . ",
          lampiran: "Link Doc"
        },
        {
          selesai: "3",
          subTask: "Polymorphic Sorting",
          progress: "",
          skala: "",
          durasi: "00:00:00",
          catatan: "",
          lampiran: ""
        },
        {
          selesai: "4",
          subTask: "Searching and Sorting an Integer List",
          progress: "",
          skala: "",
          durasi: "00:00:00",
          catatan: "",
          lampiran: ""
        },
        {
          selesai: "5",
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
