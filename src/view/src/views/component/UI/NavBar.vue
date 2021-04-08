<template>
<v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="white"
      scroll-target="#scrolling-techniques-7"
      clipped-left
    >
      <v-img :src="require('../../../assets/polban.png')" contain height="40" />
      <v-btn icon>
        <v-container link>
        <v-icon color="purple">mdi-account-circle-outline</v-icon>
        <v-icon color="purple">mdi-menu-down</v-icon>
        </v-container>
      </v-btn>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1500px;">
      </v-container>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  name: "NavBar",
  components: {
  }
}
</script>
