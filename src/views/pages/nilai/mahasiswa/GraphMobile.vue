<template>
  <v-row>
    <v-col cols="12">
      <v-carousel
        hide-delimiter-background
        hide-delimiters
        height="wrap-content"
      >
        <v-carousel-item>
          <IPGraph/>
        </v-carousel-item>
        <v-carousel-item>
          <nilai-rata-rata-card/>
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
</template>

<script>
import IPGraph from "@/views/component/nilai/IPGraph"
import NilaiRataRataCard from "@/views/component/nilai/NilaiRataRataCard"
export default {
  name: "GraphMobile",
  components: { NilaiRataRataCard, IPGraph }
}
</script>

<style scoped>

</style>
