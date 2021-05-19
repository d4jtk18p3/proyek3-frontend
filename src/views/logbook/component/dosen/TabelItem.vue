<template>
  <div :style="{background : currentTheme.surface}"
  :class="isMobile ? 'pa-0' : 'pa-0'">
    <v-data-table
        :headers="headers"
        :items="datas"
        :items-per-page="10"
        class="elevation-5"
        v-if="isDark"
        dark
        mobile-breakpoint="100"
    >
      <template v-slot:[`item.kegiatan`]="{ item }">
        <div
        class="text-truncate"
        style="max-width: 200px;">
          {{item.kegiatan}}
        </div>
      </template>

      <template v-slot:[`item.hasil`]="{ item }">
        <div
        class="text-truncate"
        style="max-width: 200px;">
          {{item.hasil}}
        </div>
      </template>

      <template v-slot:[`item.kesan`]="{ item }">
        <div
        class="text-truncate"
        style="max-width: 200px;">
          {{item.kesan}}
        </div>
      </template>

      <template v-slot:[`item.viewbutton`]="{ item }">
         <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="#FFFFFF"
              @click="onViewClick(item.tanggal, item.kegiatan, item.hasil, item.kesan)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-eye</v-icon>
            </v-btn>{{item.viewbutton}}
          </template>
          <span>Lihat Detail Logbook</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-data-table
        :headers="headers"
        :items="datas"
        :items-per-page="10"
        class="elevation-5"
        v-if="!isDark"
        light
        mobile-breakpoint="100"
    >
      <template v-slot:[`item.kegiatan`]="{ item }">
        <div
        class="text-truncate"
        style="max-width: 200px;">
          {{item.kegiatan}}
        </div>
      </template>

      <template v-slot:[`item.hasil`]="{ item }">
        <div
        class="text-truncate"
        style="max-width: 200px;">
          {{item.hasil}}
        </div>
      </template>

      <template v-slot:[`item.kesan`]="{ item }">
        <div
        class="text-truncate"
        style="max-width: 200px;">
          {{item.kesan}}
        </div>
      </template>

      <template v-slot:[`item.viewbutton`]="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="#272343"
              @click="onViewClick(item.tanggal, item.kegiatan, item.hasil, item.kesan)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-eye</v-icon>
            </v-btn>{{item.viewbutton}}
          </template>
          <span>Lihat Detail Logbook</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "TugasItem",
  props: {
    datas: {
      type: Array,
      required: false,
      default: () => {
        return [
          {
            nomor: "1",
            tanggal: "01-03-2021",
            kegiatan: "Membuat design halaman utama log Membuat design halaman utama log",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "2",
            tanggal: "02-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "3",
            tanggal: "03-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "4",
            tanggal: "04-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "5",
            tanggal: "05-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "6",
            tanggal: "06-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "7",
            tanggal: "07-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "8",
            tanggal: "08-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "9",
            tanggal: "09-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "10",
            tanggal: "10-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "11",
            tanggal: "11-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "12",
            tanggal: "12-03-2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          }
        ]
      }
    },
    identitas: {
      type: Object,
      required: false,
      default: () => {
        return {
          nama: "Cecep Gorbacep",
          nim: "181524000",
          kelas: "3A",
          prodi: "D4 - Teknik Informatika",
          matakuliah: "Proyek 3"
        }
      }
    }
  },
  data () {
    return {
      headers: [
        {
          text: "Nomor",
          align: "center",
          value: "nomor"
        },
        {
          text: "Tanggal",
          align: "center",
          value: "tanggal"
        },
        {
          text: "Kegiatan",
          align: "start",
          value: "kegiatan"
        },
        {
          text: "Hasil",
          align: "start",
          value: "hasil"
        },
        {
          text: "Kesan",
          align: "start",
          value: "kesan"
        },
        {
          text: "",
          align: "center",
          sortable: false,
          value: "viewbutton"
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  },
  methods: {
    onViewClick (tanggal, kegiatan, hasil, kesan) {
      var parts = tanggal.split("-")
      var date = new Date(parts[2], parts[1] - 1, parts[0], 7).toISOString().substr(0, 10)
      alert(date)
      this.$router.push({
        name: "ViewLogbook",
        path: "/logbook/logbook-mahasiswa/" + this.identitas.prodi + "/" + this.identitas.mataKuliah + "/" + this.identitas.kelas + "/" + this.identitas.nim + "/viewlogbook/" + date,
        params: {
          logbookdate: date,
          kegiatan: kegiatan,
          hasil: hasil,
          kesan: kesan,
          identitas: this.identitas
        }
      })
      this.$router.go(1)
    }
  }
}
</script>

<style scoped>
</style>
