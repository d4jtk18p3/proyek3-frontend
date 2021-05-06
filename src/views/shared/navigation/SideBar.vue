<template>
  <v-navigation-drawer clipped app permanent id="sidebar"  @transitionend="collapseSubItems">
    <v-list>
      <div
        v-for="(item, i) in navItem"
        :key="i"
      >

        <v-list-item
          v-if="!item.to && !item.subLinks"
          :key="i"
          dark
          class="pb-0 mb-n2"
          :class="i === 0 ? 'mt-3' : 'mt-6'"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.text" class="font-weight-bold text-h6"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="!item.subLinks && item.to"
          :key="i"
          link
          :to="item.to"
          dark
        >
          <v-list-item-icon v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          v-if="item.subLinks"
          :key="item.text"
          link
          dark
          eager
          v-model="isActive"
        >
          <template v-slot:activator>
            <v-list-item
              :key="i"
              dark
              color="primary"
              class="pa-0 pt-2"
            >
              <v-list-item-icon v-if="item.icon">
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
            text: "Components"
          },
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
    isActive: false
  }),
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    navItem () {
      return this.items.map((item) => {
        if (item.subLinks) {
          return { ...item, ...{ isActive: this.isActive } }
        }
        return item
      })
    }
  },
  methods: {
    collapseSubItems () {
      this.isActive = false
    }
  }
}
</script>
