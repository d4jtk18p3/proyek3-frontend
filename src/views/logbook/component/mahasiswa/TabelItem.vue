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
        :style="{backgroundColor: currentTheme.colorPrimary}"
    >
      <template v-slot:[`item.kegiatan`]="{ item }">
        <div
        class="text-truncate"
        style="max-width: 200px;"
        v-text="removeTags(item.kegiatan)">
        </div>
      </template>

      <template v-slot:[`item.hasil`]="{ item }">
        <div
        class="text-truncate"
        style="max-width: 200px;"
        v-text="removeTags(item.hasil)">
        </div>
      </template>

      <template v-slot:[`item.kesan`]="{ item }">
        <div
        class="text-truncate"
        style="max-width: 200px;"
        v-text="removeTags(item.kesan)">
        </div>
      </template>

      <template v-slot:[`item.viewbutton`]="{ item }">
         <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="#FFFFFF"
              @click="onViewClick(item.id, item.tanggal, item.kegiatan, item.hasil, item.kesan)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-eye</v-icon>
            </v-btn>{{item.viewbutton}}
          </template>
          <span>Lihat Detail Logbook</span>
        </v-tooltip>
      </template>

      <template v-slot:[`item.editbutton`]="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="#FFFFFF"
              @click="onEditClick(item.tanggal, item.kegiatan, item.hasil, item.kesan)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>{{item.editbutton}}
          </template>
          <span>Ubah Logbook</span>
        </v-tooltip>
      </template>

      <template v-slot:[`item.deletebutton`]="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="#FFFFFF"
              @click.stop="openConfirmDialog(item)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-delete-sweep-outline</v-icon>
            </v-btn>{{item.deletebutton}}
          </template>
          <span>Hapus Logbook</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-data-table
        :headers="headers"
        :items="datas"
        :items-per-page="10"
        class="elevation-5"
        v-if="!isDark"
        dark
        mobile-breakpoint="100"
        :style="{backgroundColor: currentTheme.onBackground}"
    >
      <template v-slot:[`item.id`]="{ item }">
        <div
        class="text-truncate"
        style="max-width: 200px;"
        v-text="removeTags(item.kegiatan)">
        </div>
      </template>

      <template v-slot:[`item.kegiatan`]="{ item }">
        <div
        class="text-truncate"
        style="max-width: 200px;"
        v-text="removeTags(item.kegiatan)">
        </div>
      </template>

      <template v-slot:[`item.hasil`]="{ item }">
        <div
        class="text-truncate"
        style="max-width: 200px;"
        v-text="removeTags(item.hasil)">
        </div>
      </template>

      <template v-slot:[`item.kesan`]="{ item }">
        <div
        class="text-truncate"
        style="max-width: 200px;"
        v-text="removeTags(item.kesan)">
        </div>
      </template>

      <template v-slot:[`item.viewbutton`]="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="#272343"
              @click="onViewClick(item.id, item.tanggal, item.kegiatan, item.hasil, item.kesan)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-eye</v-icon>
            </v-btn>{{item.viewbutton}}
          </template>
          <span>Lihat Detail Logbook</span>
        </v-tooltip>
      </template>

      <template v-slot:[`item.editbutton`]="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="#272343"
              @click="onEditClick(item.id, item.tanggal, item.kegiatan, item.hasil, item.kesan)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>{{item.editbutton}}
          </template>
          <span>Ubah Logbook</span>
        </v-tooltip>
      </template>

      <template v-slot:[`item.deletebutton`]="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="#272343"
              @click.stop="openConfirmDialog(item)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-delete-sweep-outline</v-icon>
            </v-btn>{{item.deletebutton}}
          </template>
          <span>Hapus Logbook</span>
        </v-tooltip>
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
            @click="refreshAfterDeletion"
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
import BackEndEntri from "../../../../datasource/network/logbook/entri"
export default {
  name: "TugasItem",
  props: {
    datas: {
      type: Array,
      required: false
    },
    idLogbooks: {
      type: String,
      required: false
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
      delete: null,
      deleteddata: null,
      deleteddatatanggal: "",
      deleteddataid: ""
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
    onEditClick (id, tanggal, kegiatan, hasil, kesan) {
      var parts = tanggal.split("-")
      var date = new Date(parts[2], parts[1] - 1, parts[0], 7).toISOString().substr(0, 10)
      this.$router.push({
        name: "EditLogbook",
        path: "/logbook/editlogbook/" + id,
        params: {
          idLogbooks: this.idLogbooks,
          idEntriLogbook: id,
          logbookdate: date,
          kegiatan: kegiatan,
          hasil: hasil,
          kesan: kesan
        }
      })
      this.$router.go(1)
    },
    onViewClick (id, tanggal, kegiatan, hasil, kesan) {
      var parts = tanggal.split("-")
      var date = new Date(parts[2], parts[1] - 1, parts[0], 7).toISOString().substr(0, 10)
      this.$router.push({
        name: "ViewLogbookMahasiswa",
        path: "/logbook/viewlogbook/" + id,
        params: {
          idEntriLogbook: id,
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
      this.deleteddataid = this.deleteddata.id
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
    async openDialog () {
      this.delete = await BackEndEntri.deleteEntryLogbookMhs(this.idLogbooks, this.deleteddataid)
      console.log(this.delete)
      console.log(this.delete.status)
      if (this.delete.status === 200) {
        this.openSuccessDialog()
      } else {
        this.openErrorDialog()
      }
    },
    removeTags (str) {
      if ((str === null) || (str === "")) {
        return false
      } else {
        str = str.toString()
      }
      // Regular expression to identify HTML tags in
      // the input string. Replacing the identified
      // HTML tag with a null string.
      return str.replace(/(<([^>]+)>)/ig, "")
    },
    async refreshAfterDeletion () {
      await this.closeSuccessDialog()
      this.$router.go()
    }
  }
}
</script>

<style lang="scss">
tbody {
  tr {
    color: black;
    background-color: #FFFFFF !important;
  }
}
</style>
