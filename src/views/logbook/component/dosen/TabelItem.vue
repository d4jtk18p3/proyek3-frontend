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
              @click="onViewClick(item.id)"
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
        dark
        mobile-breakpoint="100"
        :style="{backgroundColor: currentTheme.onBackground}"
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
              color="#272343"
              @click="onViewClick(item.id, item.tanggal)"
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
  name: "TabelItem",
  props: {
    datas: {
      type: Array,
      required: false
    },
    nim: {
      type: String,
      required: false
    },
    nama: {
      type: String,
      required: false
    },
    namaMataKuliah: {
      type: String,
      required: false,
      default: "Proyek 1"
    },
    prodi: {
      type: String,
      required: false,
      default: "D4 - Teknik Informatika"
    },
    kelasString: {
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
    onViewClick (id, tanggal) {
      this.$router.push({
        name: "ViewLogbook",
        path: "/logbook/logbook-mahasiswa/" + this.prodi + "/" + this.namaMataKuliah + "/" + this.kelasString + "/" + this.nim + "/viewlogbook/" + id,
        params: {
          idEntri: id,
          logbookdate: tanggal,
          nim: this.nim,
          nama: this.nama,
          namaMataKuliah: this.namaMataKuliah,
          kelasString: this.kelasString,
          prodi: this.prodi
        }
      })
      this.$router.go(1)
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
