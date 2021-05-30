<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-card
      :loading="isLoading && !isMobile"
      height="100%"
      :elevation="isMobile ? 0 : 2"
    >
    <form class="mt-10">
    </form>
    </v-card>
   </v-dialog>
</template>

<script>
export default {
  props: {
    onDialogClosed: Function
  }
}
</script>
