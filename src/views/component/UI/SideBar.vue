<template>
  <v-navigation-drawer v-if="!$vuetify.breakpoint.mobile" expand-on-hover clipped app permanent id="sidebar">
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        link
        dark
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
  color: #4E4B63;
}
.v-list-item:hover{
  background-color: #4E4B63;
}
</style>
<script>
import { mapGetters } from "vuex"
export default {
  props: {
    items: {
      type: Array,
      required: false,
      default: () => {
        return [
          { text: "[Menu 1]", icon: "mdi-file-document-outline", to: "/menu1route" },
          { text: "[Menu 2]", icon: "mdi-bookmark-multiple-outline", to: "/menu2route" },
          { text: "[Menu 3]", icon: "mdi-school-outline", to: "/menu3route" },
          { text: "[Menu 4]", icon: "mdi-email-outline", to: "/menu4route" },
          { text: "[Menu 5]", icon: "mdi-account-box-outline", to: "/menu5route" },
          { text: "[Menu 6]", icon: "mdi-white-balance-incandescent", to: "/menu6route" }
        ]
      }
    }
  },
  data: () => ({
    selectedItem: 1
  }),
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  }
}
</script>
