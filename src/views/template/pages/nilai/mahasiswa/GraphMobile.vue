<template>
  <v-row>
    <v-col cols="12">
      <v-carousel
        hide-delimiter-background
        hide-delimiters
        height="wrap-content"
      >
        <v-carousel-item>
          <IPGraph :ip-list="ipList"/>
        </v-carousel-item>
        <v-carousel-item>
          <nilai-rata-rata-card :nilai-list="nilaiList"/>
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
</template>

<script>
import IPGraph from "@/views/template/component/nilai/IPGraph"
import NilaiRataRataCard from "@/views/template/component/nilai/NilaiRataRataCard"
export default {
  name: "GraphMobile",
  components: { NilaiRataRataCard, IPGraph },
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
