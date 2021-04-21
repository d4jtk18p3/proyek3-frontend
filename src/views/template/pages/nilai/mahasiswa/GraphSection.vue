<template>
  <div>
    <GraphDekstop v-if="!isMobile" :nilai-list="nilaiList"  :ip-list="ipList"/>
    <GraphMobile v-else :nilai-list="nilaiList"  :ip-list="ipList"/>
  </div>
</template>

<script>
import GraphDekstop from "@/views/template/pages/nilai/mahasiswa/GraphDekstop"
import GraphMobile from "@/views/template/pages/nilai/mahasiswa/GraphMobile"
export default {
  name: "GraphSection",
  components: { GraphMobile, GraphDekstop },
  computed: {
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
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
