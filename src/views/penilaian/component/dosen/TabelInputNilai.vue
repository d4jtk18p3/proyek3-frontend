<template>
  <v-row>
  <v-col cols="10">
    <p class="text-h4 font-weight-bold">ETS</p>
  </v-col>
  <v-col cols="2">
    <v-btn v-if="headerParent" :color="currentTheme.colorPrimary" :style="{width: '100%'}" elevation="2" outlined depressed @click="tambahKategori('ETS')">Tambah Kategori</v-btn>
  </v-col>
  <v-col cols="12">
    <v-simple-table>
      <thead>
        <tr>
          <th :style="{background: currentTheme.onBackground, color: currentTheme.background, 'text-align': 'center', 'border': '1px solid' + currentTheme.background}" v-for="(header, index) in headerParent" :key="header.key" :colspan="header.colspan" @click="changeBobot(header)">
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
          <td v-for="(value,name,index) in item" :key="index" :style="{'min-width': '150px'}">
            <template v-if="headerChildNilaiETS[index].readOnly" >
              {{ dataNilaiMahasiswaETS[indexNilai][name] }}
            </template>
            <input v-else v-model="dataNilaiMahasiswaETS[indexNilai][name]" placeholder="Enter nilai" @change="dataNilaiMahasiswaETS[indexNilai][name] = Math.max(Math.min(dataNilaiMahasiswaETS[indexNilai][name], 100), 0)" :style="{'width': '100px', 'text-align': 'center'}"/>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-btn class="mt-2 mr-2" v-if="dataNilaiMahasiswaETS" :color="currentTheme.colorPrimary" elevation="2" outlined depressed @click="submitETS(nilaiakhir=false)">Simpan Nilai ETS</v-btn>
    <v-btn class="mt-2" v-if="dataNilaiMahasiswaETS" :color="currentTheme.colorPrimary" elevation="2" outlined depressed @click="submitETS(nilaiakhir=true)">Submit Nilai ETS</v-btn>
  </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "MataKuliahItem",
  props: {
    headerParent: {
      type: Object,
      required: true,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  methods: {
    tambahKategori () {
    },
    changeBobot () {
    },
    saveNilai () {
    },
    submitNilaiAkhir () {
    }
  }
}
</script>
