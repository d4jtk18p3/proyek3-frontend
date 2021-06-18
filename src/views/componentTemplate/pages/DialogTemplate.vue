<template>
  <v-card
    :style="{background: currentTheme.surface }"
  >
    <v-row
      class="pa-5"
    >
      <v-col  cols="12" class="text-h6" :style="{color: currentTheme.onSurface }">
        Dialog List
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-btn :color="isDark ? '#0E538A' : '#2196F3'" style="color:white;" small @click="showConfirmationDialog">
          Confirmation Dialog
        </v-btn>
      </v-col>
      <v-col cols="6" xs="6" sm="3" md="3" lg="3" xl="3">
        <v-btn :color="isDark?'#9C2C2C' : '#FF5252'" style="color:white;" small @click="toggleInformationDialog">
          Information Dialog
        </v-btn>
      </v-col>
      <ConfirmationDialog @dismiss-dialog="confirmationDialogResopnse" v-if="confirmationDialog" title="Judul Dialog Konfirmasi"  message="Tulis pesanmu untuk mengkonfirmasi aksi user disini. Tulisan tombol, dan width juga dapat diubah melalui props" positive-button-text="Aggree" negative-button-text="Cancel" />
      <InformationDialog @dismiss-dialog="toggleInformationDialog" v-if="informationDialog" title="Judul Dialog Informasi"  message="Tulis pesanmu disini sebagai infromasi yang akan ditampilkan. Tulisan tombol,dan width juga dapat diubah melalui props" confirmation-button-text="ok"/>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"
import InformationDialog from "@/views/shared/dialog/InformationDialog"
import ConfirmationDialog from "@/views/shared/dialog/ConfirmationDialog"
export default {
  name: "DialogTemplate",
  components: { InformationDialog, ConfirmationDialog },
  computed: {
    ...mapGetters({
      isDark: "theme/getIsDark",
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  },
  data () {
    return {
      confirmationDialog: false,
      informationDialog: false
    }
  },
  methods: {
    toggleInformationDialog () {
      this.informationDialog = !this.informationDialog
    },
    showConfirmationDialog () {
      this.confirmationDialog = true
    },
    confirmationDialogResopnse (isPositive) {
      if (isPositive) {
        alert("Pilihan Positif")
      } else {
        alert("Pilihan negative")
      }
      this.confirmationDialog = false
    }
  }
}
</script>

<style scoped>

</style>
