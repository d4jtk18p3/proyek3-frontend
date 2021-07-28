<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Logbook Mahasiswa</p>
    </v-col>
    <v-col cols="12">
        <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col cols="3">
        <p
          class="text-left font-weight-bold text-h5"
          :style="{color: currentTheme.onBackground}"
        >Dashboard</p>
        <v-row>
          <v-col :cols="isMobile ? 12 : 12">
            <DashboardCardItem />
          </v-col>
          <v-col :cols="isMobile ? 12 : 10">
            <p
              class="text-left font-weight-bold text-h5"
              :style="{color: currentTheme.onBackground}"
            >Kelas</p>
          </v-col>
          <v-col :cols="isMobile ? 12 : 12" v-for="(item, index) in this.mappingKelasdanMatkul" :key="index">
            <v-card
              class="rounded-lg elevation-5"
              @click="onKelasClicked(item.kelas)"
            >
              <v-row class="pa-4 ma-0" style="background: #FB8C00">
                <v-col cols="12" align-self="center" class="pa-0 ma-0">
                  <div
                    class="text-subtitle-1 text-center font-weight-bold"
                    :style="{color : currentTheme.onBackground}"
                  >{{ item.kelas + ' - ' + item.matkul.prodi }} </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
    </v-col>
    <v-col cols="0">
      <v-divider
        vertical
      ></v-divider>
    </v-col>
    <v-col cols="8">
      <p
        class="text-left font-weight-bold text-h5"
        :style="{color: currentTheme.onBackground}"
      >Mata Kuliah</p>
      <v-row>
        <v-col :cols="isMobile ? 12 : 5" v-for="(item, index) in this.listmatkul" :key="index">
          <MataKuliahItem :kode="item.matkul.kode" :mataKuliah="item.matkul.namaMataKuliah" :prodi="item.matkul.prodi" :semester="item.matkul.semester" :kelasString="item.kelas"/>
        </v-col>
      </v-row>
    </v-col>

  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import MataKuliahItem from "@/views/logbook/component/dosen/MataKuliahItem"
import DashboardCardItem from "../../component/dosen/DashboardCardItem"
import BackEndMatakuliah from "../../../../datasource/network/logbook/matakuliah"
import BackEndPerkuliahan from "../../../../datasource/network/logbook/perkuliahan"
import BackEndKelas from "../../../../datasource/network/logbook/kelas"

export default {
  name: "LogbookMahasiswa",
  components: { Breadcumbs, MataKuliahItem, DashboardCardItem },
  props: {
    dosen: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Logbook",
          disabled: false,
          href: ""
        },
        {
          text: "Logbook Mahasiswa",
          disabled: true,
          href: ""
        }
      ],
      mappingKelasdanMatkul: [],
      listmatkul: [],
      kelasChoosen: null
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      getNip: "logbook/getNip"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
    identity: function () {
      return this.$store.getters.identity
    }
  },
  watch: {
    identity: {
      immediate: true,
      handler: function (value) {
        console.log(value)
      }
    }
  },
  methods: {
    ...mapActions({
      setNip: "logbook/setNip"
    }),
    kodeKelasToStringKelas (kodekelas) {
      var date = new Date()
      var year = date.getFullYear()

      var kelasAngkaString = year.toString().substr(2, 4) // 2021 -> 21
      var kelasAngkaStringInput = kodekelas.toString().substr(0, 2) // 1803 -> 18

      var kelasAngka = parseInt(kelasAngkaString) - parseInt(kelasAngkaStringInput) // 21 - 18 = 3
      kelasAngkaString = kelasAngka.toString()

      var kelasHurufString = kodekelas.toString().substr(2, 4) // 1803 -> 03

      if (kelasHurufString === "01" || kelasHurufString === "03") {
        return kelasAngkaString + "A"
      } else {
        return kelasAngkaString + "B"
      }
    },
    kodeProdiToStringProdi (kodeprodi) {
      if (kodeprodi === "24") {
        return "D4 Teknik Informatika"
      } else if (kodeprodi === "11") {
        return "D3 Teknik Informatika"
      }
    },
    onKelasClicked (kelas) {
      this.listmatkul = []
      var i = 0
      for (i = 0; i < this.mappingKelasdanMatkul.length; i++) {
        if (kelas === this.mappingKelasdanMatkul[i].kelas) {
          this.listmatkul.push({
            kelas: kelas,
            matkul: this.mappingKelasdanMatkul[i].matkul
          })
        }
      }
    }
  },
  async mounted () {
    console.log(this.identity.preferred_username)
    this.setNip({
      nip: this.identity.preferred_username
    })
    var matakuliah = await BackEndMatakuliah.getAllMataKuliahProyekyangDiampuDosen(this.identity.preferred_username)
    var perkuliahan = await BackEndPerkuliahan.getAllPerkuliahanyangDiampuDosen(this.identity.preferred_username)
    var i = 0
    while (i < perkuliahan.length) {
      var mataKuliahItem = matakuliah.filter(function (item) {
        return item.id === perkuliahan[i].id_mata_kuliah
      })
      var kelas = await BackEndKelas.getAllKelasByMatkul(this.identity.preferred_username, mataKuliahItem[0].id)
      var j = 0
      var kelasString = []
      while (j < kelas.length) {
        kelasString[j] = this.kodeKelasToStringKelas(kelas[j].kode_kelas)
        this.mappingKelasdanMatkul.push({
          kelas: kelasString[j],
          matkul: {
            kode: mataKuliahItem[0].id,
            namaMataKuliah: mataKuliahItem[0].nama_mata_kuliah.substr(0, 8),
            prodi: this.kodeProdiToStringProdi(mataKuliahItem[0].kode_program_studi),
            semester: mataKuliahItem[0].semester
          }
        })
        j++
      }
      i++
    }
  }
}
</script>
