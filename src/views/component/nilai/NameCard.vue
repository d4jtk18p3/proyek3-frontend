<template>
  <v-card
    :style="{background: '#FB8C00', color: currentTheme.colorPrimary}"
    class="pa-3"
  >
    <div
      class="text-h6 font-weight-bold"
      :class="textClass"
    >{{nama}}</div>
    <div
      class="text-subtitle-2 mt-2 font-weight-regular"
      :class="textClass"
    >{{jurusan}}</div>
    <div
      class="text-subtitle-2 mt-2 font-weight-regular"
      :class="textClass"
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
    },
    textClass: {
      type: String,
      required: false,
      default: "text-start"
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
