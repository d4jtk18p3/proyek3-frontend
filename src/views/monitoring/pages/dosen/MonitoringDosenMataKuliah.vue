<template>
  <v-row>
    <v-col
      :cols="isMobile? 12 : 4"
    >
      <MataKuliahItem :mata-kuliah="mataKuliah[0]" :kode-matkul="kodeMatkul[0]" :list-kelas="listKelas[0]"/>
    </v-col>
    <v-col
      :cols="isMobile? 12 : 4"
    >
      <MataKuliahItem :mata-kuliah="mataKuliah[1]" :kode-matkul="kodeMatkul[1]"  :list-kelas="listKelas[1]"/>
    </v-col>
    <v-col
      :cols="isMobile? 12 : 4"
    >
      <MataKuliahItem :mata-kuliah="mataKuliah[2]" :kode-matkul="kodeMatkul[2]"  :list-kelas="listKelas[2]"/>
    </v-col>
  </v-row>
</template>

<script>
import MataKuliahItem from "@/views/monitoring/component/MataKuliahItem"
export default {
  name: "MonitoringDosenMataKuliahItem",
  components: { MataKuliahItem },
  data () {
    return {
      mataKuliah: ["Model Data", "Sistem Terdistribusi", "Sistem Basis Data"],
      kodeMatkul: ["16TIN4024", "16TIN4025", "16TIN4026"],
      listKelas: [["Kelas 3A - D4", "Kelas 3B - D4", "Kelas 1A - D4"], ["Kelas 3A - D3", "Kelas 3B - D4", "Kelas 1A - D4"], ["Kelas 3B - D3", "Kelas 3C - D4", "Kelas 3B - D4"]]
    }
  },
  computed: {
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  }
}
</script>

<style scoped>

</style>
