<template>
<v-container>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr :style="{background: currentTheme.colorPrimary}">
        <th class="text-left" v-if="!isMobile">
          <div :style="tableTitleStyle" class="text-subtitle-2">No</div>
        </th>
        <th class="text-left" v-if="!isMobile">
          <div :style="tableTitleStyle" class="text-subtitle-2">NIM</div>
        </th>
        <th class="text-left">
          <div :style="tableTitleStyle" class="text-subtitle-2">Nama</div>
        </th>
        <th class="text-left">
          <div :style="tableTitleStyle" class="text-subtitle-2">Status</div>
        </th>
        <th class="text-left">
          <div :style="tableTitleStyle" class="text-subtitle-2">Keterlambatan</div>
        </th>
        <th class="text-left">
          <div :style="tableTitleStyle" class="text-subtitle-2">Edit</div>
        </th>
      </tr>
      </thead>
      <tbody :style="{background: currentTheme.surface}">
      <tr
        v-for="(item, index) in mahasiswa"
        :key="item.id_studi"
        >
        <td class="text-capitalize text-caption font-weight-light test" v-if="!isMobile" :style="{color: currentTheme.onSurface}">{{ index + 1 }}</td>
        <td class="text-capitalize text-caption font-weight-light" v-if="!isMobile" :style="{color: currentTheme.onSurface}">{{ item.nim }}</td>
        <td class="text-capitalize text-caption font-weight-light" :style="{color: currentTheme.onSurface}">{{ item.nama }}</td>
        <td class="text-capitalize text-caption font-weight-light" :style="{color: currentTheme.onSurface}">{{ item.status }}</td>
        <td class="text-capitalize text-caption font-weight-light" :style="{color: currentTheme.onSurface}">{{ item.keterlambatan }} menit</td>
        <td>
          <v-radio-group
          column
          v-model="item.isHadir"
          :disabled="item.status === 'Izin yang diajukan sedang diperiksa waldos' || item.status === 'sakit' ||  item.status === 'izin' ||  item.status === 'Tidak Hadir'"
          @change="updateMahasiswa(item)"
          >
            <v-row>
            <v-col cols="6">
              <v-radio
                label ="Hadir"
                :value="true"
                :color="currentTheme.onSurface" >
              </v-radio>
              </v-col>
              <v-col cols="6">
              <v-radio
              label ="Tidak Hadir"
              :value="false"
              :color="currentTheme.onSurface">
              </v-radio>
            </v-col>
            </v-row>
          </v-radio-group>
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-container>
</template>

<script>
import { mapGetters } from "vuex"
// import DialogValidasi from "@/views/template/component/perkuliahan/DialogValidasi"
import kehadiran from "../../../../datasource/network/absensi/perkuliahan"

export default {
  name: "NilaiTable",
  props: {
    perkuliahan: {
      type: Array,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      dialog: [false],
      currentDate: new Date().toISOString().substr(0, 10),
      data: [],
      mahasiswa: [],
      radios: true
    }
  },
  methods: {
    getKehadiran () {
      kehadiran.getKehadiranMhs(this.perkuliahan.kelas.kode_kelas, this.perkuliahan.id_jadwal, this.currentDate)
        .then(response => {
          this.data = response.data
          this.mahasiswa = this.data.mahasiswa
        })
        .catch(e => {
          console.log(e)
        })
    },
    updateMahasiswa (mhs) {
      kehadiran.updateKehadiranMhs(mhs.id_studi, this.perkuliahan.id_jadwal, this.currentDate, mhs.isHadir)
        .then(response => {
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
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
  },
  mounted () {
    this.getKehadiran()
  }
}
</script>

<style scoped>
</style>
