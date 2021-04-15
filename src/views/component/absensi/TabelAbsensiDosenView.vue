<template v-slot:default>
    <v-simple-table>
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
          <div :style="tableTitleStyle" class="text-subtitle-2">S</div>
        </th>
        <th class="text-left">
          <div :style="tableTitleStyle" class="text-subtitle-2">I</div>
        </th>
        <th class="text-left">
          <div :style="tableTitleStyle" class="text-subtitle-2">A</div>
        </th>
      </tr>
      </thead>
      <tbody :style="{background: currentTheme.surface}">
      <tr
        v-for="mahasiswa in absensiList"
        :key="mahasiswa.id"
        :style="{pointerEvents: 'none' }"
      >
        <td class="text-capitalize text-caption font-weight-light test" v-if="!isMobile" :style="{color: currentTheme.onSurface}">{{ mahasiswa.id }}</td>
        <td class="text-capitalize text-caption font-weight-light test" v-if="!isMobile" :style="{color: currentTheme.onSurface}">{{ mahasiswa.nim }}</td>
        <td class="text-capitalize text-caption font-weight-light" :style="{color: currentTheme.onSurface}">{{ mahasiswa.nama }}</td>
        <td class="text-capitalize text-caption font-weight-light" :style="{color: currentTheme.onSurface}">{{ mahasiswa.sakit}}</td>
        <td class="text-capitalize text-caption font-weight-light" :style="{color: currentTheme.onSurface}">{{ mahasiswa.izin }}</td>
        <td class="text-capitalize text-caption font-weight-light" :style="{color: currentTheme.onSurface}">{{ mahasiswa.alpha }}</td>
      </tr>
      </tbody>
  </v-simple-table>
</template>
<script>
import { mapGetters } from "vuex"

export default {
  name: "TabelAbsensiDosenView",
  props: {
    absensiList: {
      type: Array,
      required: false,
      default: () => {
        return [
          {
            id: "1",
            nim: "181524001",
            nama: "Al Debaran",
            sakit: "1",
            izin: "2",
            alpha: "0"
          },
          {
            id: "2",
            nim: "181524002",
            nama: "Dwidandi Richardson",
            sakit: "2",
            izin: "0",
            alpha: "0"
          },
          {
            id: "3",
            nim: "181524003",
            nama: "Dwidinda Sutopo",
            sakit: "1",
            izin: "2",
            alpha: "0"
          },
          {
            id: "4",
            nim: "181524004",
            nama: "Chairil Aldi",
            sakit: "0",
            izin: "0",
            alpha: "0"
          },
          {
            id: "5",
            nim: "181524005",
            nama: "Chechep Duragon",
            sakit: "1",
            izin: "4",
            alpha: "10"
          },
          {
            id: "6",
            nim: "181524006",
            nama: "Ryujin no debat",
            sakit: "0",
            izin: "0",
            alpha: "0"
          }
        ]
      }
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
  }
}
</script>

<style scoped>
</style>
