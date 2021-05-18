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
        <v-btn
          icon
          color="#FFFFFF"
          @click="onViewClick(item.tanggal, item.kegiatan, item.hasil, item.kesan)"
        >
          <v-icon>mdi-eye</v-icon>
        </v-btn>{{item.viewbutton}}
      </template>

      <template v-slot:[`item.editbutton`]="{ item }">
        <v-btn
          icon
          color="#FFFFFF"
          @click="onEditClick(item.tanggal, item.kegiatan, item.hasil, item.kesan)"
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>{{item.editbutton}}
      </template>

      <template v-slot:[`item.deletebutton`]="{ item }">
        <v-btn
          icon
          color="#FFFFFF"
          @click.stop="openConfirmDialog(item)"
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
        <v-btn
          icon
          color="#272343"
          @click="onViewClick(item.tanggal, item.kegiatan, item.hasil, item.kesan)"
        >
          <v-icon>mdi-eye</v-icon>
        </v-btn>{{item.viewbutton}}
      </template>

      <template v-slot:[`item.editbutton`]="{ item }">
        <v-btn
          icon
          color="#272343"
          @click="onEditClick(item.tanggal, item.kegiatan, item.hasil, item.kesan)"
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>{{item.editbutton}}
      </template>

      <template v-slot:[`item.deletebutton`]="{ item }">
        <v-btn
          icon
          color="#272343"
          @click.stop="openConfirmDialog(item)"
        >
          <v-icon>mdi-delete-sweep-outline</v-icon>
        </v-btn>{{item.deletebutton}}
      </template>
    </v-data-table>

    <v-dialog
      v-model="confirmdialog"
      width="500"
      persistent
    >
      <v-card
      :dark="isDark">
        <v-card-title class="headline font-weight-light">
          Apakah anda ingin menghapus data logbook ini?
        </v-card-title>

        <v-card-text>
          data yang akan dihapus yaitu data logbook tanggal <strong>{{this.deleteddatatanggal}}</strong>. Data yang telah dihapus tidak dapat dikembalikan.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="error"
            @click="closeConfirmDialog"
          >
            tidak
          </v-btn>
          <v-btn
            outlined
            :color="isDark ? currentTheme.onSurface:'#272343'"
            @click="openDialog"
          >
            ya
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="successdialog"
      width="500"
      persistent
    >
      <v-card
      :dark="isDark">
        <v-card-title class="headline font-weight-light"
        :class="currentTheme.colorPrimary">
          Logbook Berhasil Dihapus
        </v-card-title>

        <v-card-text>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            :color="isDark ? currentTheme.onSurface:'#272343'"
            @click="closeSuccessDialog"
          >
            ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="errordialog"
      width="500"
      persistent
    >
      <v-card
      :dark="isDark">
        <v-card-title class="headline font-weight-light red--text"
        :class="currentTheme.colorPrimary">
          Logbook Gagal Dihapus
        </v-card-title>

        <v-card-text>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            :color="isDark ? currentTheme.onSurface:'#272343'"
            @click="closeErrorDialog"
          >
            ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      ],
      confirmdialog: false,
      successdialog: false,
      errordialog: false,
      delete: true,
      deleteddata: null,
      deleteddatatanggal: ""
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
    onEditClick (tanggal, kegiatan, hasil, kesan) {
      var parts = tanggal.split("-")
      var date = new Date(parts[2], parts[1] - 1, parts[0], 7).toISOString().substr(0, 10)
      alert(date)
      this.$router.push({
        name: "EditLogbook",
        path: "/logbook/editlogbook/" + date,
        params: {
          logbookdate: date,
          kegiatan: kegiatan,
          hasil: hasil,
          kesan: kesan
        }
      })
      this.$router.go(1)
    },
    onViewClick (tanggal, kegiatan, hasil, kesan) {
      var parts = tanggal.split("-")
      var date = new Date(parts[2], parts[1] - 1, parts[0], 7).toISOString().substr(0, 10)
      alert(date)
      this.$router.push({
        name: "ViewLogbook",
        path: "/logbook/viewlogbook/" + date,
        params: {
          logbookdate: date,
          kegiatan: kegiatan,
          hasil: hasil,
          kesan: kesan
        }
      })
      this.$router.go(1)
    },
    openConfirmDialog (data) {
      this.deleteddata = data
      this.deleteddatatanggal = this.deleteddata.tanggal
      this.confirmdialog = true
    },
    closeConfirmDialog () {
      this.confirmdialog = false
    },
    openSuccessDialog () {
      this.confirmdialog = false
      this.successdialog = true
    },
    closeSuccessDialog () {
      this.successdialog = false
    },
    openErrorDialog () {
      this.confirmdialog = false
      this.errordialog = true
    },
    closeErrorDialog () {
      this.errordialog = false
    },
    openDialog () {
      if (!this.delete) {
        this.openErrorDialog()
      } else {
        this.openSuccessDialog()
      }
    }
  }
}
</script>

<style scoped>
</style>
