<template>
  <div>
    <v-navigation-drawer expand-on-hover clipped app permanent id="sidebar">
      <v-list dark>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          link
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<style>
#last-item {
  position: absolute;
  bottom: 0;
  width: 100%;
}
#sidebar {
  background: #272343;
}
.v-list-item{
  margin-bottom: 10px;
}
.v-list-item:hover{
  background-color: #4E4B63;
}
</style>
<script>
export default {
  data: () => ({
    selectedItem: 1,
    items: [
      { text: "[Menu 1]", icon: "mdi-file-document-outline" },
      { text: "[Menu 2]", icon: "mdi-bookmark-multiple-outline" },
      { text: "[Menu 3]", icon: "mdi-school-outline" },
      { text: "[Menu 4]", icon: "mdi-email-outline" },
      { text: "[Menu 5]", icon: "mdi-account-box-outline" },
      { text: "[Menu 6]", icon: "mdi-white-balance-incandescent" }
    ]
  })
}
</script>
