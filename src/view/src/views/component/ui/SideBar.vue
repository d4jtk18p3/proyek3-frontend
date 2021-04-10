<template>
  <div>
    <v-navigation-drawer expand-on-hover clipped app permanent :color="currentTheme.colorPrimary">
      <v-list dark>
        <v-list-item v-for="(item, i) in items" :key="i" link>
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-switch v-model="localIsDark" class="profile-item px-1" inset :color="currentTheme.toggleColor">
          <template v-slot:label>
            <span>Change Theme</span>
          </template>
        </v-switch>
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

  /* #sidebar {
    background: "currentTheme.colorPrimary";
  } */

  .v-list-item {
    margin-bottom: 10px;
  }

  .v-list-item:hover {
    background-color: #4e4b63;
  }
</style>
<script>
import { mapGetters, mapActions } from "vuex"

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
  created () {
    this.localIsDark = this.isDark
  },
  data: () => ({
    selectedItem: 1,
    localIsDark: false
  }),
  methods: {
    ...mapActions({
      toogleTheme: "theme/toogleDark"
    })
  },
  computed: {
    ...mapGetters({
      isDark: "theme/getIsDark",
      currentTheme: "theme/getCurrentColor"
    })
  },
  watch: {
    localIsDark (value) {
      if (value === this.isDark) return
      this.toogleTheme()
    }
  }
}
</script>
