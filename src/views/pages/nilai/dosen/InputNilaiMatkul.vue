<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Input Nilai Mahasiswa</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col cols="6">
      <p class="text-h4 font-weight-bold">PROYEK 1</p>
    </v-col>
    <v-col cols="2">
      <v-file-input
          id="fileInput"
          accept=".xlsx"
          @change="onAddFile"
          @click:clear="clearItems"
          class="d-none"
        ></v-file-input>
      <v-btn :color="currentTheme.colorPrimary" elevation="2" outlined depressed @click="openFile()">Import From CSV</v-btn>
    </v-col>
    <v-col cols="2">
      <v-btn :color="currentTheme.colorPrimary" elevation="2" outlined depressed @click="resetTable()">Reset Tabel</v-btn>
    </v-col>
    <v-col cols="2">
      <v-btn :color="currentTheme.colorPrimary" elevation="2" outlined depressed >Tambah Kategori</v-btn>
    </v-col>
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">ETS</p>
      <v-simple-table>
        <thead>
          <tr>
            <th :style="{background: currentTheme.onBackground, color: currentTheme.background, 'text-align': 'center', 'border': '1px solid' + currentTheme.background}" v-for="(header, index) in headerParentNilaiETS" :key="header.key" :colspan="header.colspan" @click="changeBobot(header)">
              <v-badge
                v-if="index > 0"
                :color="currentTheme.onBackground"
                icon="mdi-pencil"
              >
              {{ header.label }}
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
              {{ header.label }}
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
            <td v-for="(value,name,index) in item" :key="index" :style="{'min-width': '150px'}">
              <template v-if="headerChildNilaiETS[index].readOnly" >
                {{ dataNilaiMahasiswaETS[indexNilai][name] }}
              </template>
              <input v-else v-model="dataNilaiMahasiswaETS[indexNilai][name]" placeholder="Enter nilai" type="number" :min="0" :max="100" @change="dataNilaiMahasiswaETS[indexNilai][name] = Math.max(Math.min(Math.round(dataNilaiMahasiswaETS[indexNilai][name]), 100), 0)" :style="{'width': '100px', 'text-align': 'center'}"/>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-btn class="mt-2" v-if="dataNilaiMahasiswaETS" :color="currentTheme.colorPrimary" elevation="2" outlined depressed @click="submitETS()">Submit Nilai ETS</v-btn>
    </v-col>
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">EAS</p>
      <v-simple-table>
        <thead>
          <tr>
            <th :style="{background: currentTheme.onBackground, color: currentTheme.background, 'text-align': 'center', 'border': '1px solid' + currentTheme.background}" v-for="(header, index) in headerParentNilaiEAS" :key="header.key" :colspan="header.colspan" @click="changeBobot(header)">
              <v-badge
                v-if="index > 0"
                :color="currentTheme.onBackground"
                icon="mdi-pencil"
              >
              {{ header.label }}
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
              {{ header.label }}
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
            <td v-for="(value,name,index) in item" :key="index" :style="{'min-width': '150px'}">
              <template v-if="headerChildNilaiEAS[index].readOnly" >
                {{ dataNilaiMahasiswaEAS[indexNilai][name] }}
              </template>
              <input v-else v-model="dataNilaiMahasiswaEAS[indexNilai][name]" placeholder="Enter nilai" type="number" :min="0" :max="100" @change="dataNilaiMahasiswaEAS[indexNilai][name] = Math.max(Math.min(Math.round(dataNilaiMahasiswaEAS[indexNilai][name]), 100), 0)" :style="{'width': '100px', 'text-align': 'center'}"/>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-btn class="mt-2" v-if="dataNilaiMahasiswaEAS" :color="currentTheme.colorPrimary" elevation="2" outlined depressed @click="submitEAS()">Submit Nilai EAS</v-btn>
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Edit Bobot</span>
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
                    v-model="editedItem.bobot"
                    label="Bobot"
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
              @click="close"
            >
              Cancel
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="save()"
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
import _ from "lodash"
import XLSX from "xlsx"
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/component/UI/Breadcumbs"

export default {
  name: "AbsensiDosenMain",
  components: { Breadcumbs },
  data () {
    return {
      /* Data Nilai
        dataNilaiMahasiswa: {
        idMataKuliah: 1,
        kategori: [
          { idKategori: 1, parent: null, nama_kategori: "ETS", bobot_nilai: 0 },
          { idKategori: 2, parent: null, nama_kategori: "EAS", bobot_nilai: 0 },
          { idKategori: 3, parent: 1, nama_kategori: "teori", bobot_nilai: 0 },
          { idKategori: 4, parent: 1, nama_kategori: "praktek", bobot_nilai: 0 },
          { idKategori: 5, parent: 3, nama_kategori: "Tugas 1", bobot_nilai: 0 },
          { idKategori: 6, parent: 3, nama_kategori: "Tugas 2", bobot_nilai: 0 },
          { idKategori: 7, parent: 4, nama_kategori: "Tugas 1", bobot_nilai: 0 }
        ],
        dataNilai: [
          {
            NIM: "181524000",
            dataNilai: [
              {
                idKategori: 3,
                nilai: 50
              },
              {
                idKategori: 4,
                nilai: 50
              }
            ]
          },
          {
            NIM: "181524001",
            dataNilai: [
              {
                idKategori: 3,
                nilai: 50
              },
              {
                idKategori: 4,
                nilai: 50
              }
            ]
          }
        ]
      }
      */
      headerETS: { idKategori: null, parent: null, nama_kategori: "ETS", bobot_nilai: 0 },
      headerEAS: { idKategori: null, parent: null, nama_kategori: "ETS", bobot_nilai: 0 },
      dialog: false,
      editedItem: {
        bobot: 0
      },
      defaultBobot: null,
      breadcrumbItems: [
        {
          text: "Absensi",
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
          // console.log(headers)

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
          // console.log(fieldNilai)

          // console.log(this.parse(worksheetETS, this.headerChildNilaiETS))
          this.dataNilaiMahasiswaETS = this.parse(worksheetETS, this.headerChildNilaiETS)

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

        for (var j = 2; j < header.length; j++) {
          data[header[j].key] = _.get(worksheet[
            XLSX.utils.encode_cell({ r: i, c: range.s.c + j })
          ], "v", null)
        }

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
      if (!header.readOnly) {
        // console.log("halo " + header.bobot)
        this.defaultBobot = header.bobot
        this.editedItem = header
        this.dialog = true
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
    submitETS () {
      var dataNilaiMahasiswa = {}

      // Input Mata Kuliah
      dataNilaiMahasiswa.idMataKuliah = parseInt(this.$route.params.id) // get id mata kuliah from API

      // Input Kategori
      var kategoriNilai = []
      var getLastIdKategori = 1 // get last idKategori
      getLastIdKategori++
      this.headerETS.idKategori = getLastIdKategori
      getLastIdKategori++ // increment last idKategori

      kategoriNilai.push(this.headerETS)
      var kategori = {}
      for (var i = 1; i < this.headerParentNilaiETS.length; i++) {
        kategori = {
          idKategori: getLastIdKategori,
          parent: this.headerETS.idKategori,
          nama_kategori: this.headerParentNilaiETS[i].label,
          bobot_nilai: parseInt(this.headerParentNilaiETS[i].bobot)
        }
        kategoriNilai.push(kategori)
        getLastIdKategori++
      }

      var listParent = kategoriNilai

      var kategoriNilaiChild = []
      var iter = 2
      for (var j = 1; j < listParent.length; j++) {
        for (var k = 0; k < this.headerParentNilaiETS[j].colspan; k++) {
          kategori = {
            idKategori: getLastIdKategori,
            parent: listParent[j].idKategori,
            nama_kategori: this.headerChildNilaiETS[k + iter].label,
            bobot_nilai: parseInt(this.headerChildNilaiETS[k + iter].bobot)
          }
          kategoriNilaiChild.push(kategori)
          getLastIdKategori++
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
            id_kategori: kategoriNilaiChild[i].idKategori,
            nilai: parseInt(this.dataNilaiMahasiswaETS[j]["Nilai" + (i + 1)]),
            nim: this.dataNilaiMahasiswaETS[j].NIM
          }
          dataNilai.push(nilai)
        }
      }
      dataNilaiMahasiswa.dataNilai = dataNilai
      console.log(dataNilaiMahasiswa)
    },
    submitEAS () {
      var dataNilaiMahasiswa = {}

      // Input Mata Kuliah
      dataNilaiMahasiswa.idMataKuliah = parseInt(this.$route.params.id) // get id mata kuliah from API

      // Input Kategori
      var kategoriNilai = []
      var getLastIdKategori = 1 // get last idKategori
      getLastIdKategori++
      this.headerEAS.idKategori = getLastIdKategori
      getLastIdKategori++ // increment last idKategori

      kategoriNilai.push(this.headerEAS)
      var kategori = {}
      for (var i = 1; i < this.headerParentNilaiEAS.length; i++) {
        kategori = {
          idKategori: getLastIdKategori,
          parent: this.headerEAS.idKategori,
          nama_kategori: this.headerParentNilaiEAS[i].label,
          bobot_nilai: parseInt(this.headerParentNilaiEAS[i].bobot)
        }
        kategoriNilai.push(kategori)
        getLastIdKategori++
      }

      var listParent = kategoriNilai

      var kategoriNilaiChild = []
      var iter = 2
      for (var j = 1; j < listParent.length; j++) {
        for (var k = 0; k < this.headerParentNilaiEAS[j].colspan; k++) {
          kategori = {
            idKategori: getLastIdKategori,
            parent: listParent[j].idKategori,
            nama_kategori: this.headerChildNilaiEAS[k + iter].label,
            bobot_nilai: parseInt(this.headerChildNilaiEAS[k + iter].bobot)
          }
          kategoriNilaiChild.push(kategori)
          getLastIdKategori++
        }
        // iter += this.headerParentNilaiEAS[j].colspan
      }
      kategoriNilai = kategoriNilai.concat(kategoriNilaiChild)

      dataNilaiMahasiswa.dataKategori = kategoriNilai

      // Input Nilai Mahasiswa
      var dataNilai = []
      var nilai = {}
      for (j = 0; j < this.dataNilaiMahasiswaEAS.length; j++) {
        for (i = 0; i < kategoriNilaiChild.length; i++) {
          nilai = {
            id_kategori: kategoriNilaiChild[i].idKategori,
            nilai: parseInt(this.dataNilaiMahasiswaEAS[j]["Nilai" + (i + 1)]),
            nim: this.dataNilaiMahasiswaEAS[j].NIM
          }
          dataNilai.push(nilai)
        }
      }
      dataNilaiMahasiswa.dataNilai = dataNilai
      console.log(dataNilaiMahasiswa)
    },
    resetTable () {
      this.dataNilaiMahasiswaETS = null
      this.dataNilaiMahasiswaEAS = null
      this.headerParentNilaiETS = null
      this.headerChildNilaiETS = null
      this.headerParentNilaiEAS = null
      this.headerChildNilaiEAS = null
      window.location.reload()
    }
  },
  mounted () {
  }
}
</script>
