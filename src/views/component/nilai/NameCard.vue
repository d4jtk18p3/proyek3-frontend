<template>
  <v-card
    :style="{background: '#FB8C00', color: currentTheme.colorPrimary}"
    class="pa-3"
  >
    <div
      class="text-start text-h6 font-weight-bold"
    >{{nama}}</div>
    <div
      class="text-start text-subtitle-2 mt-2 font-weight-regular"
    >{{jurusan}}</div>
    <div
      class="text-start text-subtitle-2 mt-2 font-weight-regular"
    >{{nim}}</div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "NameCard",
  props: {
    nama: {
      type: String,
      required: false,
      default: "Nama Lengkap"
    },
    jurusan: {
      type: String,
      required: false,
      default: "D4 - Teknik Informatik"
    },
    nim: {
      type: String,
      required: false,
      default: "1815240000"
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  }
}
</script>

<style scoped>

</style>
