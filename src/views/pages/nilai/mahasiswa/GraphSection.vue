<template>
  <div>
    <GraphDekstop v-if="!isMobile" />
    <GraphMobile v-else/>
  </div>
</template>

<script>
import GraphDekstop from "@/views/pages/nilai/mahasiswa/GraphDekstop"
import GraphMobile from "@/views/pages/nilai/mahasiswa/GraphMobile"
export default {
  name: "GraphSection",
  components: { GraphMobile, GraphDekstop },
  computed: {
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  }
}
</script>

<style scoped>

</style>
