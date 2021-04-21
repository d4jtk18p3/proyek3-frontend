<template>
  <v-row>
    <v-col
      :cols="isMobile? 12 : 6"
    >
      <MataKuliahItem/>
    </v-col>
    <v-col
      :cols="isMobile? 12 : 6"
    >
      <MataKuliahItem/>
    </v-col>
  </v-row>
</template>

<script>
import MataKuliahItem from "@/views/template/component/absensi/MataKuliahItem"
export default {
  name: "AbsensiDosenMataKuliahItem",
  components: { MataKuliahItem },
  computed: {
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  }
}
</script>

<style scoped>

</style>
