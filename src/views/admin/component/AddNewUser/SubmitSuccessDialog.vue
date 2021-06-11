<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        <div class="text-subtitle-2">Pendaftaran Akun Baru Sukses</div>
      </v-card-title>

      <v-card-text class="mt-5"> Akun baru telah didaftarkan! </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="onDismissDialog"> Ok </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "SubmitSuccessDialog",
  data () {
    return {
      dialog: true
    }
  },
  methods: {
    onDismissDialog () {
      this.$emit("dismiss-dialog")
    }
  }
}
</script>

<style scoped>
</style>
