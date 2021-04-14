<template>
  <v-row>
    <v-col xs="12" sm="12" md="12" lg="6" xl="6"  class="mt-5">
      <IPGraph :ip-list="[3.2, 2.0, 2.95, 0.51, 2.52, 3.5, 1.0]"/>
    </v-col>
    <v-col xs="12" sm="12" md="12" lg="6" xl="6" class="mt-5">
      <nilai-rata-rata-card/>
    </v-col>
  </v-row>
</template>

<script>
import NilaiRataRataCard from "@/views/component/nilai/NilaiRataRataCard"
import IPGraph from "@/views/component/nilai/IPGraph"
export default {
  name: "GraphDekstop",
  components: { IPGraph, NilaiRataRataCard }
}
</script>

<style scoped>

</style>
