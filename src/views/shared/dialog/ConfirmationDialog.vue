<template>
  <v-dialog
    v-model="dialog"
    :width="width"
  >
    <v-card :style="{background:currentTheme.surface}" class="py-2">
      <v-card-title class="headline lighten-2">
        <div class="text-h6" :style="{color:currentTheme.onSurface}">
          {{title}}
        </div>
      </v-card-title>

      <v-card-text class="mt-5" :style="{color: currentTheme.onSurface + '80'}">
        {{message}}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="onDismissDialog(false)"
        >
          {{negativeButtonText}}
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="onDismissDialog(true)"
        >
          {{positiveButtonText}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex"

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
    positiveButtonText: {
      type: String,
      default: "Ok"
    },
    negativeButtonText: {
      type: String,
      default: "Cancel"
    },
    width: {
      type: Number,
      default: 290
    }
  },
  data () {
    return {
      dialog: true
    }
  },
  methods: {
    /*
      @Params : choice value is true for positive button and false for negative button
     */
    onDismissDialog (choice) {
      this.$emit("dismiss-dialog", choice)
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
