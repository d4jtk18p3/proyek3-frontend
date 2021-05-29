<template>
  <v-row :style="{color: currentTheme.onBackground}">
    <v-col cols="12">
      <p class="text-h4 font-weight-bold">Profilling Mahasiswa</p>
    </v-col>
    <v-col cols="12">
      <Breadcumbs :breadcrumb-items="breadcrumbsItems"/>
    </v-col>
    <v-col xl="3" lg="4" md="4" sm="12"  cols="12" class="py-0 ma-0 pt-2" align-self="center">
      <v-select
        v-model="selectedItem"
        :dark="isDark"
        :items="listKelas"
        item-color="#C4C4C4"
        solo
        dense
      >
      </v-select>
    </v-col>
    <v-col xl="2" lg="3" md="3" sm="12" cols="12">
      <JumlahSiswaCard :data="(!selectedData.komposisiMurid) ?  undefined : selectedData.komposisiMurid"/>
    </v-col>
    <v-col xl="2" lg="3" md="3" sm="12" cols="12">
      <DosenWaliCard :nama-dosen="(!selectedData.dosenWali) ? undefined : selectedData.dosenWali "/>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col xl="3" lg="4" md="6" sm="12" cols="12" class="px-5" :key="mahasiswa.nim" v-for="(mahasiswa) in selectedData.listMahasiswa">
          <MahasiswaItem
            :data-mahasiswa="mahasiswa"
            @data-orang-tua-clicked="onDataOrangTuaClicked"
            @data-pribadi-clicked="onDataPribadiClicked"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
import { mapGetters } from "vuex"
import JumlahSiswaCard from "@/views/template/component/profilling/JumlahSiswaCard"
import DosenWaliCard from "@/views/template/component/profilling/DosenWaliCard"
import MahasiswaItem from "@/views/template/component/profilling/MahasiswaItem"

export default {
  name: "ProfillingMain",
  components: {
    MahasiswaItem,
    DosenWaliCard,
    JumlahSiswaCard,
    Breadcumbs
  },
  data () {
    return {
      selectedItem: -1,
      breadcrumbsItems: [
        {
          text: "Dashboard",
          disabled: false,
          href: ""
        },
        {
          text: "Profilling",
          disabled: false,
          href: ""
        },
        {
          text: "Link 2",
          disabled: true,
          href: ""
        }
      ],
      data: [
        {
          id: "D4-TIN-2021",
          prodi: "D4 Teknik Informatika",
          dosenWali: "Urip Teguh S",
          komposisiMurid: {
            total: 32,
            pria: 18,
            wanita: 14
          },
          listMahasiswa: [
            {
              nama: "Rayhan Azka Anandias",
              isUKTLunas: true,
              nim: "1815240032",
              profilePicURL: "https://firebasestorage.googleapis.com/v0/b/proyek3-95653.appspot.com/o/DSC_0020_2.jpg?alt=media&token=ec10fda4-20c1-410d-bce1-b870be48774c"
            },
            {
              nama: "Raihan Ibrahim",
              isUKTLunas: true,
              nim: "181524077",
              profilePicURL: "https://firebasestorage.googleapis.com/v0/b/proyek3-95653.appspot.com/o/IMG_5282_2.jpg?alt=media&token=9d71caa3-6d09-435b-8d0e-468468760a57"
            },
            {
              nama: "Better Raihan",
              isUKTLunas: true,
              nim: "181524078",
              profilePicURL: "https://firebasestorage.googleapis.com/v0/b/proyek3-95653.appspot.com/o/IMG_5282_2.jpg?alt=media&token=9d71caa3-6d09-435b-8d0e-468468760a57"
            }
          ]
        },
        {
          id: "D3-TIN-2021",
          prodi: "D3 Teknik Informatika",
          dosenWali: "Tony Simping",
          komposisiMurid: {
            total: 70,
            pria: 35,
            wanita: 35
          },
          listMahasiswa: [
            {
              nama: "Selip",
              isUKTLunas: false,
              nim: "1815240072",
              profilePicURL: "https://firebasestorage.googleapis.com/v0/b/proyek3-95653.appspot.com/o/DSC_0020_2.jpg?alt=media&token=ec10fda4-20c1-410d-bce1-b870be48774c"
            },
            {
              nama: "Selan",
              isUKTLunas: true,
              nim: "181524023",
              profilePicURL: ""
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    }),
    listKelas () {
      return this.data.map((data, index) => {
        return {
          text: data.prodi,
          value: index
        }
      })
    },
    selectedData () {
      if (this.selectedItem === -1) {
        return {}
      }
      return this.data[this.selectedItem]
    }
  },
  methods: {
    onDataOrangTuaClicked (index) {
      const selectedMahasiswa = this.selectedData.listMahasiswa[index]
      console.log(`Mencoba melihat data orangtua mahasiswa ${selectedMahasiswa.nama}`)
    },
    onDataPribadiClicked (index) {
      const selectedMahasiswa = this.selectedData.listMahasiswa[index]
      console.log(`Mencoba melihat data pribadi mahasiswa ${selectedMahasiswa.nama}`)
    }
  }
}
</script>

<style scoped>

</style>
