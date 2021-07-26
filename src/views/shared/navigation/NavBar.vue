<template>
  <div>
    <v-app-bar
      app
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
      <v-btn class="ml-2" icon @click="notification_click()">
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
              :src=user.image
            >
          </v-avatar>
        </div>
        <v-toolbar-title class="mx-4 d-inline-block text-truncate" style="max-width: 150px;">{{ user.nama }}</v-toolbar-title>
        <v-icon :style="{color: currentTheme.colorPrimary}">mdi-menu-down</v-icon>
      </v-btn>
    </v-app-bar>
    <v-app-bar
      app
      :style="{background : currentTheme}"
      fixed
      v-else
      dense
    >
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-img :src="require('../../../assets/polban.png')" max-width="30" contain class="mr-2"/>
    <v-toolbar-title style="font-size: 14px">Politeknik Negeri Bandung</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="notification_click()">
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
      width="100%"
      style="margin-top: 48px"
      v-if="$vuetify.breakpoint.mobile"
    >
          <v-text-field
            hide-details
            label="Cari disini"
            append-icon="mdi-magnify"
            class="mx-5 mt-5"
            single-line
            outlined
            dense
            @click:append="search()"
          ></v-text-field>
          <v-list
          >
            <v-list-item class="profile mx-3" two-line>
              <v-list-item-avatar  @click="profil_click()">
                <v-avatar>
                  <img
                    :src=user.image
                  >
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content @click="profil_click()">
                <v-list-item-title>{{ user.nama }}</v-list-item-title>
                <v-list-item-subtitle>{{ user.nim }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-content dense class="pl-3">
                <v-switch
                  v-model="darkmode"
                  :label="`Dark mode`"
                ></v-switch>
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="mx-3 profile font-weight-bold">
              <v-list-item-title>Beranda</v-list-item-title>
            </v-list-item>

            <v-list-item class="mx-3 profile font-weight-bold">
              <v-list-item-title>Absensi</v-list-item-title>
            </v-list-item>

            <v-list-item class="mx-3 profile font-weight-bold">
              <v-list-item-title>Profil</v-list-item-title>
            </v-list-item>

            <v-list-item class="mx-3 profile font-weight-bold">
              <v-list-item-title>Nilai</v-list-item-title>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item class="profile d-flex justify-center mt-2">
              <v-btn @click="logout()" height="30px" class="error">Log Out</v-btn>
            </v-list-item>
          </v-list>
    </v-navigation-drawer>
  </div>
</template>
<style scoped>
  .profile:hover {
    background: none;
  }
  .profile:active {
    background: none;
  }
</style>
<script>
import { mapGetters, mapActions } from "vuex"
export default {
  name: "NavBar",
  components: {
  },
  data () {
    return {
      user: {
        nama: "Kokoro Yuuki",
        nim: "1815240005",
        image: "https://media.discordapp.net/attachments/767745029166202935/819180197961793536/d59480-51-254735-3.png"
      },
      usernotif: 2,
      drawer: false,
      group: null,
      darkmode: false
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    })
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout")
    },
    notification_click () {
      console.log("Notif clicked")
    },
    profil_click () {
      console.log("Profil clicked")
    },
    search () {
      console.log("Search clicked")
    },
    ...mapActions({
      toogleTheme: "theme/toogleDark"
    })
  },
  watch: {
    darkmode (value) {
      if (value === this.isDark) return
      this.toogleTheme("doni")
    }
  }
}
</script>
