<template>
    <v-row :style="{color: currentTheme.onBackground}">
        <v-col cols="12">
            <p class="text-h4 font-weight-bold">Monitoring APPL 1 - W1 Polymorphism</p>
        </v-col>
        <v-col
            cols="3"
            class="ml-auto pl-13 py-4"
        >
            <v-btn
            :color="currentTheme.colorSecondary"
            dark
          >
            <span style="font-size: 12px">Lihat Monitoring Teman</span>
          </v-btn>
        </v-col>
        <v-col cols="12">
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr :style="{background: currentTheme.colorPrimary}">
        <th class="text-center">
          <div :style="tableTitleStyle" class="text-subtitle-2">Selesai</div>
        </th>
        <th class="text-center">
          <div :style="tableTitleStyle" class="text-subtitle-2">Sub-task</div>
        </th>
        <th class="text-center">
          <div :style="tableTitleStyle" class="text-subtitle-2">Progress</div>
        </th>
        <th class="text-center">
          <div :style="tableTitleStyle" class="text-subtitle-2">Skala</div>
        </th>
        <th class="text-center">
          <div :style="tableTitleStyle" class="text-subtitle-2">Durasi</div>
        </th>
        <th class="text-center">
          <div :style="tableTitleStyle" class="text-subtitle-2">Catatan</div>
        </th><th class="text-center">
          <div :style="tableTitleStyle" class="text-subtitle-2">Lampiran</div>
        </th>
        <th class="text-center">
          <div :style="tableTitleStyle" class="text-subtitle-2">Aksi</div>
        </th>
        <th class="text-center">
          <div :style="tableTitleStyle" class="text-subtitle-2"> </div>
        </th>
      </tr>
      </thead>
      <tbody :style="{background: currentTheme.surface}">
      <tr
        v-for="subTask in SubTaskList"
        :key="subTask.selesai"
        :style="{pointerEvents: 'none' }"
        align-center
      >
        <td class="text-capitalize text-body-2 font-weight-light text-center test" :style="{color: currentTheme.onSurface}"></td>
        <td class="text-capitalize text-body-2 font-weight-light text-center" :style="{color: currentTheme.onSurface}">{{ subTask.subTask }}</td>
        <td class="text-capitalize text-body-2 font-weight-light text-center" :style="{color: currentTheme.onSurface}">{{ subTask.progress }}</td>
        <td class="text-capitalize text-body-2 font-weight-light text-center" :style="{color: currentTheme.onSurface}">{{ subTask.skala }}</td>
        <td class="text-capitalize text-body-2 font-weight-light text-center" :style="{color: currentTheme.onSurface}">{{ subTask.durasi }}</td>
        <td class="text-capitalize text-body-2 font-weight-light text-center" :style="{color: currentTheme.onSurface}">{{ subTask.catatan }}</td>
        <td class="text-capitalize text-body-2 font-weight-light text-center" :style="{color: currentTheme.onSurface}">{{ subTask.lampiran }}</td>
        <td class="text-capitalize text-body-2 font-weight-light text-center" :style="{color: currentTheme.onSurface}">{{ subTask.aksi }}
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
            >
                <span style="font-size: 12px" class="font-weight-bold">Selesai</span>
            </v-btn>
        </td>
        <td class="text-capitalize text-body-2 font-weight-light text-center" :style="{color: currentTheme.onSurface}">
            <EditProgress/>
        </td>
      </tr>
      <v-col>
      <SerahkanTugas/>
      <EditProgress/>
      </v-col>
      </tbody>
    </template>
  </v-simple-table>
        </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import EditProgress from "@/views/monitoring/pages/mahasiswa/monitoring/EditProgress"
import SerahkanTugas from "@/views/monitoring/pages/mahasiswa/monitoring/SerahkanTugas"

export default {
  name: "MhsViewTable",
  components: { EditProgress, SerahkanTugas },
  props: {
    SubTaskList: {
      type: Array,
      required: false,
      default: () => {
        return [
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
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
    tableTitleStyle () {
      return {
        color: this.currentTheme.colorOnPrimary
      }
    }
  }
}
</script>

<style scoped>
</style>
