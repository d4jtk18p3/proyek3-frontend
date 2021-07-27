<template>
  <v-container>
    <v-row :style="{ color: currentTheme.onBackground }">
      <v-col cols="12">
        <p class="text-h4 font-weight-bold">Pendaftaran Akun Baru via Excel</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-file-input
          dense
          outlined
          show-size
          accept=".xlsx"
          placeholder="Pilih File"
          :rules="[rulesFile.onlyXlsx]"
          @change="onAddFile"
          @click:clear="clearItems"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row :style="{ color: currentTheme.onBackground }">
      <v-col>
        <p class="text-h5 font-weight-bold">Tinjauan XLSX</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <DataTable :headers="headers" :items="items" />
      </v-col>
    </v-row>
    <v-row>
      <v-col align="right">
        <v-btn
          dense
          :color="currentTheme.colorSecondary"
          width="150"
          style="color: #ffffff"
          @click="submitExcel"
          >Submit XLSX
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from "lodash"
import { mapGetters } from "vuex"
import XLSX from "xlsx"
import DataTable from "@/views/admin/component/AddNewUser/DataTable"
import { createOneAccount } from "@/datasource/network/admin/admin"

export default {
  name: "AddNewUserByExcel",
  components: { DataTable },
  data () {
    return {
      headers: [
        {
          text: "NIP/NIM",
          value: "nomorInduk",
          sortable: false,
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Jenis Nomor Induk",
          value: "jenisNomorInduk",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Nama",
          value: "nama",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "E-mail",
          value: "email",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Role/Jenis Akun",
          value: "role",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        }
      ],
      items: [],
      isLoading: false,
      rulesFile: {
        onlyXlsx: (v) =>
          v.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          "File harus bertipe *.xlsx"
      }
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  },
  methods: {
    onAddFile (file) {
      this.isLoading = true
      const reader = new FileReader()
      if (file != null) {
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result)
          const workbook = XLSX.read(data, { type: "array" })
          const worksheet = workbook.Sheets[workbook.SheetNames[0]]
          this.items = this.parse(worksheet)
        }
        reader.readAsArrayBuffer(file)
      }
      setTimeout(this.stopLoading, 1000)
    },
    async submitExcel () {
      var i
      for (i = 0; i < this.items.length; i++) {
        const noInduk = this.items[i].nomorInduk
        const jenisNoInduk = this.items[i].jenisNomorInduk
        const nama = this.items[i].nama
        const email = this.items[i].email
        let role = this.items[i].role
        if (role === "Tata Usaha") {
          role = "tata_usaha"
        }
        try {
          const result = await createOneAccount(
            noInduk,
            jenisNoInduk,
            nama,
            email,
            role
          )
          if (result instanceof Error) {
            throw result
          } else {
            console.log(result)
          }
        } catch (error) {
          console.log(error)
        }
      }
      alert("Akun baru berhasil di submit")
    },
    parse: function (worksheet) {
      switch (_.toUpper(_.get(worksheet, "['A1'].v", ""))) {
        case "BATCH-INSERT-USER;V1":
          return this.parseV1(worksheet)
      }
    },
    parseV1: function (worksheet) {
      const range = XLSX.utils.decode_range(worksheet["!ref"])

      return _.map(_.range(range.s.r + 2, range.e.r + 1, 1), (i) => {
        return {
          nomorInduk: _.get(
            worksheet[XLSX.utils.encode_cell({ r: i, c: range.s.c })],
            "v",
            null
          ),
          jenisNomorInduk: _.get(
            worksheet[XLSX.utils.encode_cell({ r: i, c: range.s.c + 1 })],
            "v",
            null
          ),
          nama: _.get(
            worksheet[XLSX.utils.encode_cell({ r: i, c: range.s.c + 2 })],
            "v",
            null
          ),
          email: _.get(
            worksheet[XLSX.utils.encode_cell({ r: i, c: range.s.c + 3 })],
            "v",
            null
          ),
          password: _.get(
            worksheet[XLSX.utils.encode_cell({ r: i, c: range.s.c + 4 })],
            "v",
            null
          ),
          role: _.get(
            worksheet[XLSX.utils.encode_cell({ r: i, c: range.s.c + 5 })],
            "v",
            null
          )
        }
      })
    },
    clearItems () {
      this.items = []
      this.isLoading = false
      console.log(this.isLoading)
    },
    stopLoading () {
      this.isLoading = false
    }
  }
}
</script>

<style>
</style>
