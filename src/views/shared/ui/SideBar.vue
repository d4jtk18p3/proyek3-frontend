<template>
  <v-navigation-drawer v-if="!$vuetify.breakpoint.mobile" expand-on-hover clipped app permanent id="sidebar">
    <v-list>
      <div
        v-for="(item, i) in items"
        :key="i"
      >
        <v-list-item
          v-if="!item.subLinks"
          :key="i"
          link
          :to="item.to"
          dark
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          v-else
          :key="item.text"
          link
          dark
        >
          <template v-slot:activator>
            <v-list-item
              :key="i"
              dark
              color="primary"
              class="pa-0"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <template v-slot:appendIcon>
            <v-icon dark>$expand</v-icon>
          </template>

          <v-list-item
            v-for="sublink in item.subLinks"
            :to="sublink.to"
            :key="sublink.text"
            dark
            class="pl-12"
          >
            <v-list-item-content>
              <v-list-item-title v-text="sublink.text" />
            </v-list-item-content>
          </v-list-item>

        </v-list-group>

      </div>
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
  name: "sideBar",
  props: {
    items: {
      type: Array,
      required: false,
      default: () => {
        return [
          {
            to: "/dashboard",
            icon: "mdi-view-dashboard",
            text: "Dashboard"
          },
          {
            icon: "mdi-tennis",
            text: "Players",
            subLinks: [
              {
                text: "Players list",
                to: "/players"
              },
              {
                text: "Import WTA Players",
                to: "/players/import"
              }
            ]
          },
          {
            to: "/tournaments",
            icon: "mdi-trophy",
            text: "Tournaments"
          }
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
