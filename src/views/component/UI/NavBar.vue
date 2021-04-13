<template>
    <v-app-bar
      app
      color="white"
      clipped-left
      fixed
    >
      <v-img :src="require('../../../assets/polban.png')" contain height="40" absolute class="ml-4"/>
      <v-btn :elevation="0" width="10" class="white" absolute right>
        <v-container>
        <v-icon color="white" style="background: purple; background-size: 50%; border-radius: 100%;">mdi-account-circle</v-icon>
        <v-icon color="purple">mdi-menu-down</v-icon>
        </v-container>
      </v-btn>
    </v-app-bar>
</template>
<style>
</style>
<script>
export default {
  name: "NavBar",
  components: {
  }
}
</script>
