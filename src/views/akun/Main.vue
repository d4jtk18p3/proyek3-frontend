<template>
  <v-app :style="{background : '#272343'}">
    <v-main>
      <v-container :class="isMobile? 'pa-5' : 'pa-12'" class="fill-height">
        <router-view/>
      </v-container>
      <v-overlay :value="isLoading">
      <v-progress-circular
       indeterminate size="32"
       :color="currentTheme.colorSecondary">
      </v-progress-circular>
      </v-overlay>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  data: () => ({
    isLoading: true
  }),

  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),

    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  },

  methods: {
    logout: function () {
      this.$store.dispatch("logout")
    },

    async waitAuthenticated () {
      return new Promise((resolve) => {
        const unwatch = this.$store.watch(state => {
          return this.$store.getters.identity
        }, value => {
          if (!value) {
            return
          }

          if (!value.isActive) {
            this.$router.replace({ path: "/reset-password" })
          }

          unwatch()
          resolve()
        }, {
          immediate: true
        })
      })
    }
  },

  created () {
    const tasks = []

    if (this.$route.meta.requiresAuth) {
      tasks.push(this.waitAuthenticated())
    }

    Promise.all(tasks).then(result => {
      this.isLoading = false
    })
  }
}
</script>
