<template>
  <v-dialog
    v-model="dialog"
    width="290"
  >
    <v-card>
      <v-card-title class="headline lighten-2">
        <div class="text-h6">
          {{title}}
        </div>
      </v-card-title>

      <v-card-text class="mt-5">
        {{message}}
       </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="onDismissDialog"
        >
          {{confirmationButtonText}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "SuccessDialog",
  props: {
    title: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    },
    confirmationButtonText: {
      type: String,
      default: "Ok"
    }
  },
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
