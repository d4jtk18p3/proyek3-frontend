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
      <template v-slot:item.editbutton="{ item }">
        <v-btn
          icon
          color="#FFFFFF"
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>{{item.editbutton}}
      </template>

      <template v-slot:item.deletebutton="{ item }">
        <v-btn
          icon
          color="#FFFFFF"
        >
          <v-icon>mdi-delete-sweep-outline</v-icon>
        </v-btn>{{item.deletebutton}}
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
      <template v-slot:item.editbutton="{ item }">
        <v-btn
          icon
          color="#000000"
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>{{item.editbutton}}
      </template>

      <template v-slot:item.deletebutton="{ item }">
        <v-btn
          icon
          color="#000000"
        >
          <v-icon>mdi-delete-sweep-outline</v-icon>
        </v-btn>{{item.deletebutton}}
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
            tanggal: "19 April 2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "2",
            tanggal: "19 April 2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "3",
            tanggal: "19 April 2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "4",
            tanggal: "19 April 2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "5",
            tanggal: "19 April 2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "6",
            tanggal: "19 April 2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "7",
            tanggal: "19 April 2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "8",
            tanggal: "19 April 2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "9",
            tanggal: "19 April 2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "10",
            tanggal: "19 April 2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "11",
            tanggal: "19 April 2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          },
          {
            nomor: "12",
            tanggal: "19 April 2021",
            kegiatan: "Membuat design halaman utama log...",
            hasil: "Hasil design telah dikumpulkan di fig...",
            kesan: "Ketika mendesign dapat pengalaman..."
          }
        ]
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
          value: "kegiatan",
          class: "text-truncate"
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
          value: "editbutton"
        },
        {
          text: "",
          align: "center",
          sortable: false,
          value: "deletebutton"
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
  }
}
</script>

<style scoped>
</style>
