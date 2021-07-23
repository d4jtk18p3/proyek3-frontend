<template>
  <v-dialog max-width="600px">
        <template v-slot:activator="{on}">
        <v-btn color="success" v-on="on" dark>+ Upload BAP</v-btn>
      </template>
   </v-dialog>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
