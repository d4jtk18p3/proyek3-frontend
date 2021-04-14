<template>
  <div>
    <v-app-bar
      app
      :style="{background : white}"
      clipped-left
      fixed
      max-height="75"
      v-if="!$vuetify.breakpoint.mobile"
    >
      <v-img :src="require('../../../assets/polban.png')" max-width="45" contain class="mx-4"/>
      <v-toolbar-title :style="{ color: currentTheme.colorPrimary }">Politeknik Negeri Bandung</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        hide-details
        label="Cari disini"
        append-icon="mdi-magnify"
        class="shrink"
        style="width:300px"
        single-line
        outlined
        dense
        @click:append="notification_click"
      ></v-text-field>
      <v-btn class="ml-2" icon>
        <v-badge
          :content="usernotif"
          :value="usernotif"
          color="red"
          overlap
        >
          <v-icon :style="{color: currentTheme.colorPrimary}">mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>
      <v-btn depressed :style="{background : currentTheme}" right class="ml-1" height="50px">
        <div :style="{background: currentTheme.colorPrimary, 'border-radius': '100%', padding: '2px'}">
          <v-avatar size="27">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
          >
        </v-avatar>
        </div>
        <v-toolbar-title class="mx-4 d-inline-block text-truncate" style="max-width: 150px;">{{ user }}</v-toolbar-title>
        <v-icon :style="{color: currentTheme.colorPrimary}">mdi-menu-down</v-icon>
      </v-btn>
    </v-app-bar>
    <v-app-bar
      app
      :style="{background : white}"
      fixed
      v-else
      dense
    >
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-img :src="require('../../../assets/polban.png')" max-width="30" contain class="mr-2"/>
    <v-toolbar-title style="font-size: 14px">Politeknik Negeri Bandung</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-badge
        :content="usernotif"
        :value="usernotif"
        color="red"
        overlap
      >
        <v-icon :style="{color: currentTheme.colorPrimary}">mdi-bell-outline</v-icon>
      </v-badge>
    </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  name: "NavBar",
  components: {
  },
  data () {
    return {
      user: "Kokoro Yuuki",
      usernotif: 2,
      drawer: false,
      group: null
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  methods: {
    notification_click () {
    }
  }
}
</script>
