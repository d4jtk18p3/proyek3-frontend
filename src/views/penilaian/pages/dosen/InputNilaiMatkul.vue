<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Input Nilai Mahasiswa</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">{{ namaMatkul }}</p>
    </v-col>
    <v-col cols="2">
      <v-file-input
          id="fileInput"
          accept=".xlsx"
          @change="onAddFile"
          @click:clear="clearItems"
          class="d-none"
        ></v-file-input>
      <v-btn :color="currentTheme.colorPrimary" elevation="2" outlined depressed @click="openFile()">
        <v-icon left
                :color="currentTheme.onBackground"
              >
              mdi-file-upload
        </v-icon>
        Import From XLSX</v-btn>
    </v-col>
    <v-col cols="3" class="pl-10">
      <v-btn :color="currentTheme.colorPrimary" elevation="2" outlined depressed @click="downloadTemplate()">
        <v-icon left
                :color="currentTheme.onBackground"
              >
              mdi-download
        </v-icon>
        Download Template
        </v-btn>
    </v-col>
    <v-col cols="6">
    </v-col>
    <v-col cols="3" class="pt-0">
      <v-btn :color="currentTheme.colorPrimary" elevation="2" outlined depressed @click="resetTable()">Reset Tabel</v-btn>
    </v-col>
    <v-col cols="10" v-if="headerParentNilaiETS">
      <p class="text-h4 font-weight-bold">ETS</p>
    </v-col>
    <v-col cols="2" class="pt-10">
      <v-btn v-if="headerParentNilaiETS" :color="currentTheme.colorPrimary" :style="{width: '100%'}" elevation="2" outlined depressed @click="tambahKategori('ETS')">
        Tambah Kategori
        </v-btn>
    </v-col>
    <v-col cols="12">
      <v-simple-table>
        <thead>
          <tr>
            <th :style="{background: currentTheme.onBackground, color: currentTheme.background, 'text-align': 'center', 'border': '1px solid' + currentTheme.background}" v-for="(header, index) in headerParentNilaiETS" :key="header.key" :colspan="header.colspan" @click="changeBobot(header)">
              <v-badge
                v-if="index > 0"
                :color="currentTheme.onBackground"
                icon="mdi-pencil"
              >
              {{ header.label }} ({{ header.bobot }}%)
              </v-badge>
              <v-badge
                v-else
                :color="currentTheme.onBackground"
              >
              {{ header.label }}
              </v-badge>
            </th>
          </tr>
          <tr>
            <th :style="{background: currentTheme.onBackground, color: currentTheme.background, 'text-align': 'center', 'border': '1px solid' + currentTheme.background}" v-for="(header, index) in headerChildNilaiETS" :key="header.key" :colspan="header.colspan" @click="changeBobot(header)">
              <v-badge
                v-if="index > 1"
                :color="currentTheme.onBackground"
                icon="mdi-pencil"
              >
              {{ header.label }} ({{ header.bobot }}%)
              </v-badge>
              <v-badge
                v-else
                :color="currentTheme.onBackground"
              >
              {{ header.label }}
              </v-badge>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,indexNilai) in dataNilaiMahasiswaETS" :key="item.id">
            <td :style="{'min-width': '150px'}">
              {{ dataNilaiMahasiswaETS[indexNilai].NIM }}
            </td>
            <td :style="{'min-width': '150px'}">
              {{ dataNilaiMahasiswaETS[indexNilai].Nama }}
            </td>
            <template v-for="(itemNilai, indexItemNilai) in item.Nilai" :style="{'min-width': '150px'}">
                <td :key="toString(indexNilai) + indexItemNilai">
                  <input v-model="dataNilaiMahasiswaETS[indexNilai].Nilai[indexItemNilai]" placeholder="Enter nilai" @change="dataNilaiMahasiswaETS[indexNilai][name] = Math.max(Math.min(dataNilaiMahasiswaETS[indexNilai][name], 100), 0)" :style="{'width': '100px', 'text-align': 'center'}"/>
                </td>
            </template>
          </tr>
        </tbody>
      </v-simple-table>
      <v-btn class="mt-2" v-if="dataNilaiMahasiswaETS" :color="currentTheme.colorPrimary" elevation="2" outlined depressed @click="submitETS(nilaiakhir=true)">Submit Nilai ETS</v-btn>
    </v-col>
    <v-col cols="10" v-if="headerParentNilaiEAS">
      <p class="text-h4 font-weight-bold">EAS</p>
    </v-col>
    <v-col cols="2" class="pt-10">
      <v-btn v-if="headerParentNilaiEAS" :color="currentTheme.colorPrimary" elevation="2" :style="{width: '100%'}" outlined depressed @click="tambahKategori('EAS')">Tambah Kategori</v-btn>
    </v-col>
    <v-col cols="12">
      <v-simple-table>
        <thead>
          <tr>
            <th :style="{background: currentTheme.onBackground, color: currentTheme.background, 'text-align': 'center', 'border': '1px solid' + currentTheme.background}" v-for="(header, index) in headerParentNilaiEAS" :key="header.key" :colspan="header.colspan" @click="changeBobot(header)">
              <v-badge
                v-if="index > 0"
                :color="currentTheme.onBackground"
                icon="mdi-pencil"
              >
              {{ header.label }} ({{ header.bobot }}%)
              </v-badge>
              <v-badge
                v-else
                :color="currentTheme.onBackground"
              >
              {{ header.label }}
              </v-badge>
            </th>
          </tr>
          <tr>
            <th :style="{background: currentTheme.onBackground, color: currentTheme.background, 'text-align': 'center', 'border': '1px solid' + currentTheme.background}" v-for="(header, index) in headerChildNilaiEAS" :key="header.key" :colspan="header.colspan" @click="changeBobot(header)">
              <v-badge
                v-if="index > 1"
                :color="currentTheme.onBackground"
                icon="mdi-pencil"
              >
              {{ header.label }} ({{ header.bobot }}%)
              </v-badge>
              <v-badge
                v-else
                :color="currentTheme.onBackground"
              >
              {{ header.label }}
              </v-badge>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,indexNilai) in dataNilaiMahasiswaEAS" :key="item.id">
            <td :style="{'min-width': '150px'}">
              {{ dataNilaiMahasiswaEAS[indexNilai].NIM }}
            </td>
            <td :style="{'min-width': '150px'}">
              {{ dataNilaiMahasiswaEAS[indexNilai].Nama }}
            </td>
            <template v-for="(itemNilai, indexItemNilai) in item.Nilai" :style="{'min-width': '150px'}">
                <td :key="toString(indexNilai) + indexItemNilai">
                  <input v-model="dataNilaiMahasiswaEAS[indexNilai].Nilai[indexItemNilai]" placeholder="Enter nilai" @change="dataNilaiMahasiswaEAS[indexNilai][name] = Math.max(Math.min(dataNilaiMahasiswaEAS[indexNilai][name], 100), 0)" :style="{'width': '100px', 'text-align': 'center'}"/>
                </td>
            </template>
          </tr>
        </tbody>
      </v-simple-table>
      <v-btn class="mt-2" v-if="dataNilaiMahasiswaEAS" :color="currentTheme.colorPrimary" elevation="2" outlined depressed @click="submitEAS(nilaiakhir=true)">Submit Nilai EAS</v-btn>
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Edit Detail Tugas</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.label"
                    label="Label"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="8"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.bobot"
                    label="Bobot"
                    @input="bobotOnChange"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <p v-if="!saveButton" class="error--text">Bobot total melebihi 100! Sisa bobot: {{ sisaBobot }}</p>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="close"
            >
              Cancel
            </v-btn>
            <v-btn
              :disabled="!saveButton"
              color="blue darken-1"
              text
              @click="save()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialogKategori"
        max-width="500px"
        v-if="parentKategori"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Tambah Kategori</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-select
                    v-model="newKategori.parent"
                    :items="parentKategori.slice(1, parentKategori.length)"
                    :item-text="'label'"
                    :item-value="'key'"
                    label="Parrent Kategori"
                    outlined
                  >
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="newKategori.nama_kategori"
                    label="Nama Kategori"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="closeKategori"
            >
              Cancel
            </v-btn>
            <v-btn
              :disabled="!saveButton"
              color="blue darken-1"
              text
              @click="saveKategori()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<style>
th:hover {
    cursor: pointer;
}
</style>

<script>
// import http from "axios"
import _ from "lodash"
import XLSX from "xlsx"
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import DosenAPI from "@/datasource/network/penilaian/PenilaianDosen"
// import { PENILAIAN_API_URL } from "../../../../config"

export default {
  name: "InputNilaiMatkul",
  components: { Breadcumbs },
  props: {
    namaMatkul: {
      type: String,
      required: false,
      default: "PROYEK 1"
    }
  },
  data () {
    return {
      idMatkul: null,
      headerETS: { kode_kategori: "", parent: null, nama_kategori: "ETS", bobot_nilai: 0 },
      headerEAS: { kode_kategori: "", parent: null, nama_kategori: "ETS", bobot_nilai: 0 },
      dialog: false,
      newKategori: {
        parent: "",
        nama_kategori: "",
        type: ""
      },
      dialogKategori: false,
      saveButton: true,
      sisaBobot: 0,
      headerSelected: null,
      editedItem: {
        bobot: 0
      },
      defaultBobot: null,
      breadcrumbItems: [
        {
          text: "Penilaian",
          disabled: false,
          href: "/penilaian"
        },
        {
          text: "Input Nilai Mahasiswa",
          disabled: false,
          href: "/penilaian/input-nilai"
        },
        {
          text: this.namaMatkul,
          disabled: false,
          href: "/penilaian/input-nilai-matkul/" + this.$route.params.id
        }
      ],
      parentKategori: null,
      dataNilaiMahasiswaETS: null,
      dataNilaiMahasiswaEAS: null,
      headerParentNilaiETS: null,
      headerChildNilaiETS: null,
      headerParentNilaiEAS: null,
      headerChildNilaiEAS: null
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  methods: {
    onAddFile: function (file) {
      this.isLoading = true
      const reader = new FileReader()
      if (file != null) {
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result)
          const workbook = XLSX.read(data, { type: "array" })
          const worksheetETS = workbook.Sheets[workbook.SheetNames[0]] // ETS
          const worksheetEAS = workbook.Sheets[workbook.SheetNames[1]] // EAS

          var headers = [{ label: "Detail Mahasiswa", colspan: 2, key: "parrent1", readOnly: true }]
          var range = XLSX.utils.decode_range(worksheetETS["!ref"])
          var C; var R = range.s.r /* start in the first row */
          /* walk every column in the range */
          var iter = 2
          for (C = range.s.c + 2; C <= range.e.c; ++C) {
            var cell = worksheetETS[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */

            var hdr = "UNKNOWN " + C // <-- replace with your desired default
            if (cell && cell.t) {
              hdr = XLSX.utils.format_cell(cell)
              var obj = { label: hdr, colspan: 1, key: "parrent" + iter, bobot: 0 }
              headers.push(obj)
              iter++
            } else {
              headers[headers.length - 1].colspan = headers[headers.length - 1].colspan + 1
            }
          }

          this.headerParentNilaiETS = headers
          console.log(headers)

          var fieldNilai = [{ label: "NIM", colspan: 1, key: "NIM", readOnly: true }, { label: "Nama", colspan: 1, key: "Nama", readOnly: true }]
          R = range.s.r + 1/* start in the first row */
          /* walk every column in the range */
          var child = 1
          for (C = range.s.c + 2; C <= range.e.c; ++C) {
            cell = worksheetETS[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */

            hdr = "UNKNOWN " + C // <-- replace with your desired default
            if (cell && cell.t) {
              hdr = XLSX.utils.format_cell(cell)
              var obj1 = { label: hdr, colspan: 1, key: "Nilai" + child, bobot: 0 }
              fieldNilai.push(obj1)
              child++
            } else {
              fieldNilai[fieldNilai.length - 1].colspan = fieldNilai[fieldNilai.length - 1].colspan + 1
            }
          }

          this.headerChildNilaiETS = fieldNilai
          console.log(fieldNilai)

          // console.log(this.parse(worksheetETS, this.headerChildNilaiETS))
          this.dataNilaiMahasiswaETS = this.parse(worksheetETS, this.headerChildNilaiETS)
          console.log(this.dataNilaiMahasiswaETS)

          // Data Nilai EAS
          headers = [{ label: "Detail Mahasiswa", colspan: 2, key: "parrent1", readOnly: true }]
          range = XLSX.utils.decode_range(worksheetEAS["!ref"])
          R = range.s.r /* start in the first row */
          /* walk every column in the range */
          iter = 2
          for (C = range.s.c + 2; C <= range.e.c; ++C) {
            cell = worksheetEAS[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */

            hdr = "UNKNOWN " + C // <-- replace with your desired default
            if (cell && cell.t) {
              hdr = XLSX.utils.format_cell(cell)
              obj = { label: hdr, colspan: 1, key: "parrent" + iter, bobot: 0 }
              headers.push(obj)
              iter++
            } else {
              headers[headers.length - 1].colspan = headers[headers.length - 1].colspan + 1
            }
          }

          this.headerParentNilaiEAS = headers
          // console.log(headers)

          fieldNilai = [{ label: "NIM", colspan: 1, key: "NIM", readOnly: true }, { label: "Nama", colspan: 1, key: "Nama", readOnly: true }]
          R = range.s.r + 1/* start in the first row */
          /* walk every column in the range */
          child = 1
          for (C = range.s.c + 2; C <= range.e.c; ++C) {
            cell = worksheetEAS[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */

            hdr = "UNKNOWN " + C // <-- replace with your desired default
            if (cell && cell.t) {
              hdr = XLSX.utils.format_cell(cell)
              obj1 = { label: hdr, colspan: 1, key: "Nilai" + child, bobot: 0 }
              fieldNilai.push(obj1)
              child++
            } else {
              fieldNilai[fieldNilai.length - 1].colspan = fieldNilai[fieldNilai.length - 1].colspan + 1
            }
          }

          this.headerChildNilaiEAS = fieldNilai
          // console.log(fieldNilai)

          // console.log(this.parse(worksheetEAS, this.headerChildNilaiEAS))
          this.dataNilaiMahasiswaEAS = this.parse(worksheetEAS, this.headerChildNilaiEAS)
        }
        reader.readAsArrayBuffer(file)
      }
      setTimeout(this.stopLoading, 1000)
    },
    parse: function (worksheet, header) {
      return this.parseV1(worksheet, header)
    },
    parseV1: function (worksheet, header) {
      const range = XLSX.utils.decode_range(worksheet["!ref"])
      return _.map(_.range(range.s.r + 2, range.e.r + 1, 1), (i) => {
        var data = {
          NIM: _.get(worksheet[
            XLSX.utils.encode_cell({ r: i, c: range.s.c })
          ], "v", null),
          Nama: _.get(worksheet[
            XLSX.utils.encode_cell({ r: i, c: range.s.c + 1 })
          ], "v", null)
        }

        var arrayOfNilai = []
        for (var j = 2; j < header.length; j++) {
          var nilai = _.get(worksheet[
            XLSX.utils.encode_cell({ r: i, c: range.s.c + j })
          ], "v", null)
          arrayOfNilai.push(nilai)
        }

        data.Nilai = arrayOfNilai

        return data
      })
    },
    clearItems () {
      this.items = []
      this.isLoading = false
      console.log(this.isLoading)
    },
    stopLoading () {
      this.isLoading = false
    },
    openFile () {
      document.getElementById("fileInput").click()
    },
    changeBobot (header) {
      var i
      var totalindex
      if (!header.readOnly) {
        if (this.headerParentNilaiETS.indexOf(header) > 0) {
          this.headerSelected = this.headerParentNilaiETS
        } else if (this.headerParentNilaiEAS.indexOf(header) > 0) {
          this.headerSelected = this.headerParentNilaiEAS
        } else if (this.headerChildNilaiETS.indexOf(header) > 0) {
          this.headerSelected = this.headerChildNilaiETS
          i = 1
          totalindex = 2
          // console.log("index=" + this.headerSelected.indexOf(header))
          while (totalindex < this.headerSelected.indexOf(header) + 1) {
            totalindex += parseInt(this.headerParentNilaiETS[i].colspan)
            i++
          }
          // console.log(this.headerParentNilaiETS[i - 1].label)
          // console.log("dari" + (totalindex - parseInt(this.headerParentNilaiETS[i - 1].colspan)) + " hingga " + (totalindex - 1))
          this.headerSelected = []
          for (i = (totalindex - parseInt(this.headerParentNilaiETS[i - 1].colspan)); i <= (totalindex - 1); i++) {
            this.headerSelected.push(this.headerChildNilaiETS[i])
          }
          // console.log(this.headerSelected)
        } else {
          this.headerSelected = this.headerChildNilaiEAS
          i = 1
          totalindex = 2
          // console.log("index=" + this.headerSelected.indexOf(header))
          while (totalindex < this.headerSelected.indexOf(header) + 1) {
            totalindex += parseInt(this.headerParentNilaiEAS[i].colspan)
            i++
          }
          // console.log(this.headerParentNilaiETS[i - 1].label)
          // console.log("dari" + (totalindex - parseInt(this.headerParentNilaiEAS[i - 1].colspan)) + " hingga " + (totalindex - 1))
          this.headerSelected = []
          for (i = (totalindex - parseInt(this.headerParentNilaiEAS[i - 1].colspan)); i <= (totalindex - 1); i++) {
            this.headerSelected.push(this.headerChildNilaiEAS[i])
          }
          // console.log(this.headerSelected)
        }
        this.defaultBobot = header.bobot
        this.editedItem = header
        this.dialog = true
      }
    },
    tambahKategori (type) {
      this.dialogKategori = true
      if (type === "ETS") {
        // this.headerParentNilaiETS.push({ bobot: 0, colspan: 1, key: "didnot", label: "Test kategori" })
        this.parentKategori = this.headerParentNilaiETS
        this.newKategori.type = "ETS"
        // console.log("haloo")
        // console.log(this.headerParentNilaiETS)
      } else {
        this.parentKategori = this.headerParentNilaiEAS
        this.newKategori.type = "EAS"
        // console.log("halo eas")
      }
    },
    saveKategori () {
      var mahasiswa
      if (this.newKategori.parent === "") {
        if (this.newKategori.type === "ETS") {
          this.headerParentNilaiETS.push({ label: this.newKategori.nama_kategori, colspan: 1, key: "ETS-newKategori", bobot: 0 })
          this.headerChildNilaiETS.push({ label: "Tugas 1", colspan: 1, key: "ETS-" + this.newKategori.nama_kategori + "-Tugas 1", bobot: 0 })
          for (mahasiswa = 0; mahasiswa < this.dataNilaiMahasiswaETS.length; mahasiswa++) {
            this.dataNilaiMahasiswaETS[mahasiswa].Nilai.push(0)
          }
        } else {
          this.headerParentNilaiEAS.push({ label: this.newKategori.nama_kategori, colspan: 1, key: "EAS-newKategori", bobot: 0 })
          this.headerChildNilaiEAS.push({ label: "Tugas 1", colspan: 1, key: "ETS-" + this.newKategori.nama_kategori + "-Tugas 1", bobot: 0 })
          for (mahasiswa = 0; mahasiswa < this.dataNilaiMahasiswaEAS.length; mahasiswa++) {
            this.dataNilaiMahasiswaEAS[mahasiswa].Nilai.push(0)
          }
        }
      } else {
        var totalColspan = 0
        var i, index
        if (this.newKategori.type === "ETS") {
          // console.log(this.headerParentNilaiETS[this.headerParentNilaiETS.findIndex(obj => obj.key === this.newKategori.parent)])
          // console.log(this.headerParentNilaiETS)
          index = this.headerParentNilaiETS.findIndex(obj => obj.key === this.newKategori.parent)
          for (i = 0; i <= index; i++) {
            totalColspan += this.headerParentNilaiETS[i].colspan
          }
          this.headerChildNilaiETS.splice(totalColspan, 0, { label: this.newKategori.nama_kategori, colspan: 1, key: "ETS-newKategori-newChild" + this.newKategori.nama_kategori, bobot: 0 })
          this.headerParentNilaiETS[this.headerParentNilaiETS.findIndex(obj => obj.key === this.newKategori.parent)].colspan += 1

          for (mahasiswa = 0; mahasiswa < this.dataNilaiMahasiswaETS.length; mahasiswa++) {
            this.dataNilaiMahasiswaETS[mahasiswa].Nilai.splice(totalColspan - 2, 0, 0)
          }
          // console.log(totalColspan)
          // this.headerParentNilaiETS[this.headerParentNilaiETS.findIndex(obj => obj.key === this.newKategori.parent)].colspan += 1
          // tambah kolom child
          console.log(this.dataNilaiMahasiswaETS)
        } else {
          index = this.headerParentNilaiEAS.findIndex(obj => obj.key === this.newKategori.parent)
          for (i = 0; i <= index; i++) {
            totalColspan += this.headerParentNilaiEAS[i].colspan
          }
          this.headerChildNilaiEAS.splice(totalColspan, 0, { label: this.newKategori.nama_kategori, colspan: 1, key: "ETS-newKategori-newChild" + this.newKategori.nama_kategori, bobot: 0 })
          this.headerParentNilaiEAS[this.headerParentNilaiEAS.findIndex(obj => obj.key === this.newKategori.parent)].colspan += 1

          for (mahasiswa = 0; mahasiswa < this.dataNilaiMahasiswaEAS.length; mahasiswa++) {
            this.dataNilaiMahasiswaEAS[mahasiswa].Nilai.splice(totalColspan - 2, 0, 0)
          }
          // console.log(this.headerParentNilaiEAS)
          // totalColspan = 0
          // for (i = 0; i < this.headerParentNilaiEAS.length - 1; i++) {
          //   totalColspan += this.headerParentNilaiEAS[i].colspan
          // }
          // console.log(totalColspan)
          // this.headerParentNilaiEAS[this.headerParentNilaiEAS.findIndex(obj => obj.key === this.newKategori.parent)].colspan += 1
        }
        console.log(this.newKategori.parent)
      }
      // console.log(this.newKategori)
      this.closeKategori()
    },
    closeKategori (type) {
      this.newKategori.parent = ""
      this.newKategori.nama_kategori = ""
      this.newKategori.type = ""
      this.parentKategori = null
      this.dialogKategori = false
    },
    bobotOnChange () {
      var totalBeban = 0
      for (var i = 0; i < this.headerSelected.length; i++) {
        if (!(i === this.headerSelected.indexOf(this.editedItem)) && !this.headerSelected[i].readOnly) {
          totalBeban += parseInt(this.headerSelected[i].bobot)
        }
      }
      if (totalBeban + parseInt(this.editedItem.bobot) > 100) {
        this.sisaBobot = 100 - totalBeban
        this.saveButton = false
      } else {
        this.saveButton = true
      }
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem.bobot = this.defaultBobot
        this.editedItem = { bobot: 0 }
        this.defaultBobot = null
      })
    },
    save () {
      this.editedItem = { bobot: 0 }
      this.defaultBobot = null
      this.close()
    },
    submitETS (finalize) {
      var dataNilaiMahasiswa = {}

      // Input Mata Kuliah
      dataNilaiMahasiswa.id_perkuliahan = parseInt(this.$route.params.id) // get id mata kuliah from API

      // Input Kategori
      var kategoriNilai = []
      // var getLastIdKategori = 1 // get last idKategori
      // getLastIdKategori++
      this.headerETS.kode_kategori = dataNilaiMahasiswa.id_perkuliahan + "-ETS"
      this.headerETS.parent = ""
      this.headerETS.id_perkuliahan = dataNilaiMahasiswa.id_perkuliahan
      // getLastIdKategori++ // increment last idKategori

      kategoriNilai.push(this.headerETS)
      var kategori = {}
      for (var i = 1; i < this.headerParentNilaiETS.length; i++) {
        kategori = {
          kode_kategori: dataNilaiMahasiswa.id_perkuliahan + "-" + this.headerParentNilaiETS[i].label,
          parent: this.headerETS.kode_kategori,
          nama_kategori: this.headerParentNilaiETS[i].label,
          bobot_nilai: parseFloat(this.headerParentNilaiETS[i].bobot),
          id_perkuliahan: dataNilaiMahasiswa.id_perkuliahan
        }
        kategoriNilai.push(kategori)
        // getLastIdKategori++
      }

      var listParent = kategoriNilai

      var kategoriNilaiChild = []
      var iter = 2
      for (var j = 1; j < listParent.length; j++) {
        for (var k = 0; k < this.headerParentNilaiETS[j].colspan; k++) {
          kategori = {
            kode_kategori: dataNilaiMahasiswa.id_perkuliahan + "-" + listParent[j].nama_kategori + "-" + this.headerChildNilaiETS[k + iter].label, // getLastIdKategori,
            parent: listParent[j].kode_kategori,
            nama_kategori: this.headerChildNilaiETS[k + iter].label,
            bobot_nilai: parseFloat(this.headerChildNilaiETS[k + iter].bobot),
            id_perkuliahan: dataNilaiMahasiswa.id_perkuliahan
          }
          kategoriNilaiChild.push(kategori)
          // getLastIdKategori++
        }
        iter += this.headerParentNilaiETS[j].colspan
      }
      kategoriNilai = kategoriNilai.concat(kategoriNilaiChild)

      dataNilaiMahasiswa.dataKategori = kategoriNilai

      // Input Nilai Mahasiswa
      var dataNilai = []
      var nilai = {}
      for (j = 0; j < this.dataNilaiMahasiswaETS.length; j++) {
        for (i = 0; i < kategoriNilaiChild.length; i++) {
          nilai = {
            kode_kategori: kategoriNilaiChild[i].kode_kategori,
            nilai: parseFloat(this.dataNilaiMahasiswaETS[j].Nilai[i]),
            nim: this.dataNilaiMahasiswaETS[j].NIM.toString()
          }
          // console.log(this.dataNilaiMahasiswaETS[j].Nilai[i])
          dataNilai.push(nilai)
        }
      }
      dataNilaiMahasiswa.dataNilai = dataNilai
      console.log(dataNilaiMahasiswa) // submit nilai mhs

      // const result = DosenAPI.importNilai(dataNilaiMahasiswa, this.$route.params.id)
      // console.log(result)
      // http
      //   .post(new URL("/penilaian/import-nilai/perkuliahan/", "http://localhost:5001").href + this.$route.params.id, dataNilaiMahasiswa)
      //   .then((res) => {
      //     console.log(res.data)
      //   })

      if (finalize) {
        for (i = 0; i < dataNilaiMahasiswa.dataNilai.length; i++) {
          var index = dataNilaiMahasiswa.dataKategori.findIndex(obj => obj.kode_kategori === dataNilaiMahasiswa.dataNilai[i].kode_kategori)
          dataNilaiMahasiswa.dataNilai[i].parent = dataNilaiMahasiswa.dataKategori[index].parent
          dataNilaiMahasiswa.dataNilai[i].nilai = dataNilaiMahasiswa.dataKategori[index].bobot_nilai / 100 * dataNilaiMahasiswa.dataNilai[i].nilai
        }
        var listMhs = []
        var dataMhs = []
        var indexMhs = 0
        for (i = 0; i < dataNilaiMahasiswa.dataNilai.length; i++) {
          if (indexMhs < 1) {
            dataMhs.push(dataNilaiMahasiswa.dataNilai[i])
            indexMhs++
          } else {
            if (dataNilaiMahasiswa.dataNilai[i].nim === dataMhs[indexMhs - 1].nim) {
              dataMhs.push(dataNilaiMahasiswa.dataNilai[i])
              indexMhs++
              // listMhs.push(dataMhs)
              // dataMhs = []
              // indexMhs = 0
            } else {
              listMhs.push(dataMhs)
              dataMhs = []
              dataMhs.push(dataNilaiMahasiswa.dataNilai[i])
              indexMhs = 1
              // dataMhs.push(dataNilaiMahasiswa.dataNilai[i])
              // indexMhs++
            }
          }
        }
        listMhs.push(dataMhs)

        // console.log(listMhs) // total nilai level child

        var listNilaiMhs = []
        var nilaiMhs = []
        var iNilai = 0
        for (i = 0; i < listMhs.length; i++) {
          nilaiMhs.push({ totalNilai: listMhs[i][0].nilai, nim: listMhs[i][0].nim, parent: listMhs[i][0].parent })
          iNilai++
          for (j = 1; j < listMhs[i].length; j++) {
            if (listMhs[i][j].parent === nilaiMhs[iNilai - 1].parent) {
              nilaiMhs[iNilai - 1].totalNilai += listMhs[i][j].nilai
            } else {
              nilaiMhs[iNilai - 1].bobot = dataNilaiMahasiswa.dataKategori[dataNilaiMahasiswa.dataKategori.findIndex(obj => obj.kode_kategori === nilaiMhs[iNilai - 1].parent)].bobot_nilai
              nilaiMhs[iNilai - 1].totalNilai = nilaiMhs[iNilai - 1].totalNilai * nilaiMhs[iNilai - 1].bobot / 100

              nilaiMhs.push({ totalNilai: listMhs[i][j].nilai, nim: listMhs[i][j].nim, parent: listMhs[i][j].parent })
              iNilai++
            }
          }
          nilaiMhs[iNilai - 1].bobot = dataNilaiMahasiswa.dataKategori[dataNilaiMahasiswa.dataKategori.findIndex(obj => obj.kode_kategori === nilaiMhs[iNilai - 1].parent)].bobot_nilai
          nilaiMhs[iNilai - 1].totalNilai = nilaiMhs[iNilai - 1].totalNilai * nilaiMhs[iNilai - 1].bobot / 100
          listNilaiMhs.push(nilaiMhs)
          nilaiMhs = []
          iNilai = 0
        }

        // console.log(listNilaiMhs) // total nilai level parent

        var listNilaiFinal = []
        for (i = 0; i < listNilaiMhs.length; i++) {
          var totalNilaiAkhir = 0
          for (j = 0; j < listNilaiMhs[i].length; j++) {
            totalNilaiAkhir += listNilaiMhs[i][j].totalNilai
          }
          listNilaiFinal.push({ nim: listNilaiMhs[i][0].nim, nilai_ets: totalNilaiAkhir })
        }

        this.putNilaiAkhir(this.$route.params.id, listNilaiFinal)

        console.log(listNilaiFinal) // total nilai level ets/eas
      }
    },
    submitEAS (finalize) {
      this.submitETS(finalize)
      var dataNilaiMahasiswa = {}

      // Input Mata Kuliah
      dataNilaiMahasiswa.id_perkuliahan = parseInt(this.$route.params.id) // get id mata kuliah from API

      // Input Kategori
      var kategoriNilai = []
      // var getLastIdKategori = 1 // get last idKategori
      // getLastIdKategori++
      this.headerEAS.kode_kategori = dataNilaiMahasiswa.id_perkuliahan + "-EAS"
      this.headerEAS.parent = ""
      this.headerEAS.id_perkuliahan = dataNilaiMahasiswa.id_perkuliahan
      // getLastIdKategori++ // increment last idKategori

      kategoriNilai.push(this.headerEAS)
      var kategori = {}
      for (var i = 1; i < this.headerParentNilaiEAS.length; i++) {
        kategori = {
          kode_kategori: dataNilaiMahasiswa.id_perkuliahan + "-" + this.headerParentNilaiEAS[i].label,
          parent: this.headerEAS.kode_kategori,
          nama_kategori: this.headerParentNilaiEAS[i].label,
          bobot_nilai: parseFloat(this.headerParentNilaiEAS[i].bobot),
          id_perkuliahan: dataNilaiMahasiswa.id_perkuliahan
        }
        kategoriNilai.push(kategori)
        // getLastIdKategori++
      }

      var listParent = kategoriNilai

      var kategoriNilaiChild = []
      var iter = 2
      for (var j = 1; j < listParent.length; j++) {
        for (var k = 0; k < this.headerParentNilaiEAS[j].colspan; k++) {
          kategori = {
            kode_kategori: dataNilaiMahasiswa.id_perkuliahan + "-" + listParent[j].nama_kategori + "-" + this.headerChildNilaiEAS[k + iter].label, // getLastIdKategori,
            parent: listParent[j].kode_kategori,
            nama_kategori: this.headerChildNilaiEAS[k + iter].label,
            bobot_nilai: parseFloat(this.headerChildNilaiEAS[k + iter].bobot),
            id_perkuliahan: dataNilaiMahasiswa.id_perkuliahan
          }
          kategoriNilaiChild.push(kategori)
          // getLastIdKategori++
        }
        iter += this.headerParentNilaiEAS[j].colspan
      }
      kategoriNilai = kategoriNilai.concat(kategoriNilaiChild)

      dataNilaiMahasiswa.dataKategori = kategoriNilai

      // Input Nilai Mahasiswa
      var dataNilai = []
      var nilai = {}
      for (j = 0; j < this.dataNilaiMahasiswaEAS.length; j++) {
        for (i = 0; i < kategoriNilaiChild.length; i++) {
          nilai = {
            kode_kategori: kategoriNilaiChild[i].kode_kategori,
            nilai: parseFloat(this.dataNilaiMahasiswaEAS[j].Nilai[i]),
            nim: this.dataNilaiMahasiswaEAS[j].NIM.toString()
          }
          dataNilai.push(nilai)
        }
      }
      dataNilaiMahasiswa.dataNilai = dataNilai
      console.log(dataNilaiMahasiswa)

      // const result = DosenAPI.importNilai(dataNilaiMahasiswa, this.$route.params.id)
      // console.log(result)
      // http
      //   .post(new URL("/penilaian/import-nilai/perkuliahan/", "http://localhost:5001").href + this.$route.params.id, dataNilaiMahasiswa)
      //   .then((res) => {
      //     console.log(res.data)
      //   })

      if (finalize) {
        for (i = 0; i < dataNilaiMahasiswa.dataNilai.length; i++) {
          var index = dataNilaiMahasiswa.dataKategori.findIndex(obj => obj.kode_kategori === dataNilaiMahasiswa.dataNilai[i].kode_kategori)
          dataNilaiMahasiswa.dataNilai[i].parent = dataNilaiMahasiswa.dataKategori[index].parent
          dataNilaiMahasiswa.dataNilai[i].nilai = dataNilaiMahasiswa.dataKategori[index].bobot_nilai / 100 * dataNilaiMahasiswa.dataNilai[i].nilai
        }
        var listMhs = []
        var dataMhs = []
        var indexMhs = 0
        for (i = 0; i < dataNilaiMahasiswa.dataNilai.length; i++) {
          if (indexMhs < 1) {
            dataMhs.push(dataNilaiMahasiswa.dataNilai[i])
            indexMhs++
          } else {
            if (dataNilaiMahasiswa.dataNilai[i].nim === dataMhs[indexMhs - 1].nim) {
              dataMhs.push(dataNilaiMahasiswa.dataNilai[i])
              indexMhs++
              // listMhs.push(dataMhs)
              // dataMhs = []
              // indexMhs = 0
            } else {
              listMhs.push(dataMhs)
              dataMhs = []
              dataMhs.push(dataNilaiMahasiswa.dataNilai[i])
              indexMhs = 1
              // dataMhs.push(dataNilaiMahasiswa.dataNilai[i])
              // indexMhs++
            }
          }
        }
        listMhs.push(dataMhs)

        // console.log(listMhs) // total nilai level child

        var listNilaiMhs = []
        var nilaiMhs = []
        var iNilai = 0
        for (i = 0; i < listMhs.length; i++) {
          nilaiMhs.push({ totalNilai: listMhs[i][0].nilai, nim: listMhs[i][0].nim, parent: listMhs[i][0].parent })
          iNilai++
          for (j = 1; j < listMhs[i].length; j++) {
            if (listMhs[i][j].parent === nilaiMhs[iNilai - 1].parent) {
              nilaiMhs[iNilai - 1].totalNilai += listMhs[i][j].nilai
            } else {
              nilaiMhs[iNilai - 1].bobot = dataNilaiMahasiswa.dataKategori[dataNilaiMahasiswa.dataKategori.findIndex(obj => obj.kode_kategori === nilaiMhs[iNilai - 1].parent)].bobot_nilai
              nilaiMhs[iNilai - 1].totalNilai = nilaiMhs[iNilai - 1].totalNilai * nilaiMhs[iNilai - 1].bobot / 100

              nilaiMhs.push({ totalNilai: listMhs[i][j].nilai, nim: listMhs[i][j].nim, parent: listMhs[i][j].parent })
              iNilai++
            }
          }
          nilaiMhs[iNilai - 1].bobot = dataNilaiMahasiswa.dataKategori[dataNilaiMahasiswa.dataKategori.findIndex(obj => obj.kode_kategori === nilaiMhs[iNilai - 1].parent)].bobot_nilai
          nilaiMhs[iNilai - 1].totalNilai = nilaiMhs[iNilai - 1].totalNilai * nilaiMhs[iNilai - 1].bobot / 100
          listNilaiMhs.push(nilaiMhs)
          nilaiMhs = []
          iNilai = 0
        }

        // console.log(listNilaiMhs) // total nilai level parent

        var listNilaiFinal = []
        for (i = 0; i < listNilaiMhs.length; i++) {
          var totalNilaiAkhir = 0
          for (j = 0; j < listNilaiMhs[i].length; j++) {
            totalNilaiAkhir += listNilaiMhs[i][j].totalNilai
          }
          listNilaiFinal.push({ nim: listNilaiMhs[i][0].nim, nilai_eas: totalNilaiAkhir })
        }

        this.putNilaiAkhir(this.$route.params.id, listNilaiFinal)

        console.log(listNilaiFinal) // total nilai level ets/eas
      }
    },
    resetTable () {
      this.dataNilaiMahasiswaETS = null
      this.dataNilaiMahasiswaEAS = null
      this.headerParentNilaiETS = null
      this.headerChildNilaiETS = null
      this.headerParentNilaiEAS = null
      this.headerChildNilaiEAS = null
      window.location.reload()
    },
    downloadTemplate () {
      window.open("https://drive.google.com/u/1/uc?id=1rr4m8CVjXLBj8CjogpB4LEt_wAMEp5_y&export=download")
    },
    async putNilaiAkhir (id, data) {
      const resultAkhir = await DosenAPI.updateNilaiAkhir(data, id)
      console.log(resultAkhir)
      // http
      //   .put(new URL("/penilaian/update-nilai-akhir/perkuliahan/", "http://localhost:5001").href + this.$route.params.id, { dataNilaiAkhir: listNilaiFinal })
      //   .then((res) => {
      //     console.log(res.data)
      //   })
    }
  },
  mounted () {
    this.idMatkul = parseInt(this.$route.params.id)
  }
}
</script>
