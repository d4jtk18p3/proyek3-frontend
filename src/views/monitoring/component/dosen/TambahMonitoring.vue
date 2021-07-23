<template>
  <div class="tambah">
    <v-card
      class="rounded-lg mr-3 mb-3"
      color="#C4C4C4"
      @click="addMorePintasan"
    >
      <v-row :class="isMobile ? 'pa-3':'pa-5'" justify="center" align="center">
        <v-col cols="2" class="pa-0 mt-0" >
          <div
            class="text-h2 text-center text--secondary font-weight-light"
            :style="{color : currentTheme.colorOnSecondary}"
          >+</div>
        </v-col>
        <v-col cols="10" class="pa-0 mt-0">
          <div
            class="text-h6 text-center font-weight-light"
            :style="{color : currentTheme.colorOnSecondary}"
          >Tambah Monitoring</div>
        </v-col>
      </v-row>
    </v-card>
    <DialogFormTambahMonitoring :visible="showDialogForm" @close="showDialogForm=false" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import DialogFormTambahMonitoring from "@/views/monitoring/component/dosen/DialogFormTambahMonitoring"
export default {
  name: "TambahMonitoring",
  components: { DialogFormTambahMonitoring },
  data () {
    return {
      showDialogForm: false
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  },
  methods: {
    addMorePintasan () {
      this.showDialogForm = true
    }
  }
}
</script>

<style scoped>
</style>
