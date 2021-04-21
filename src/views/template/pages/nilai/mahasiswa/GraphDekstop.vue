<template>
  <v-row>
    <v-col xs="12" sm="12" md="12" lg="6" xl="6"  class="mt-5">
      <IPGraph :ip-list="ipList"/>
    </v-col>
    <v-col xs="12" sm="12" md="12" lg="6" xl="6" class="mt-5">
      <nilai-rata-rata-card :nilai-list="nilaiList"/>
    </v-col>
  </v-row>
</template>

<script>
import NilaiRataRataCard from "@/views/template/component/nilai/NilaiRataRataCard"
import IPGraph from "@/views/template/component/nilai/IPGraph"
export default {
  name: "GraphDekstop",
  components: {
    IPGraph,
    NilaiRataRataCard
  },
  props: {
    ipList: {
      type: Array,
      default: () => {
        return [3.2, 2.0, 2.95, 0.51, 2.52, 3.5, 1.0]
      }
    },
    nilaiList: {
      type: Array,
      required: false,
      default: () => {
        return [6, 7, 4, 7, 5]
      }
    }
  }
}
</script>

<style scoped>

</style>
