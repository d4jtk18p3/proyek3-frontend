<template>
    <v-navigation-drawer
      absolute
      bottom
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideBar",
  components: {
  }
}
</script>
