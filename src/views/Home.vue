<template>
  <v-app :style="{background : '#F4F8F9'}" >
    <nav-bar/>
    <v-main>
      <v-container :class="isMobile? 'pa-5' : 'pa-12'">
        <v-row>
          <v-card class="pa-md-1 mx-lg-auto" outlined color="transparent" :style="{ color: currentTheme.onBackground }">
            <p class="text-h4 font-weight-bold">Selamat Datang, {{ identity.given_name }}</p>
            <!-- <p class="text-h4 font-weight-bold">Selamat Datang,</p> -->
          </v-card>
        </v-row>
        <v-row>
          <v-card
            max-height="192"
            max-width="192"
            @click="onClickedAbsensi()"
            class="pb-0 ma-md-2 mx-lg-auto rounded-lg"
            outlined color="transparent"
          >
            <v-img :src="require('../assets/sistem-absensi-card.png')" height="200"/>
          </v-card>
          <v-card
            max-height="192"
            max-width="192"
            @click="onClickedMonitoring()"
            class="pb-0 ma-md-2 mx-lg-auto rounded-lg"
            outlined color="transparent"
          >
            <v-img :src="require('../assets/sistem-monitoring-card.png')" height="200"/>
          </v-card>
          <v-card
            max-height="192"
            max-width="192"
            @click="onClickedPenilaian()"
            class="pb-0 ma-md-2 mx-lg-auto rounded-lg"
            outlined color="transparent"
          >
            <v-img :src="require('../assets/sistem-penilaian-card.png')" height="200"/>
          </v-card>
          <v-card
            max-height="192"
            max-width="192"
            @click="onClickedLogbook()"
            class="pb-0 ma-md-2 mx-lg-auto rounded-lg"
            outlined color="transparent"
          >
            <v-img :src="require('../assets/sistem-logbook-card.png')" height="200"/>
          </v-card>
          <v-card
            max-height="192"
            max-width="192"
            @click="logout()"
            class="pb-0 ma-md-2 mx-lg-auto rounded-lg"
            outlined color="transparent"
          >
            <v-img :src="require('../assets/logout-card.png')" height="200"/>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex"
import NavBar from "@/views/shared/navigation/NavBar"
export default {
  name: "Home",
  components: { NavBar },
  data () {
    return {
      toAbsensi: "/absensi",
      toPenilaian: "/penilaian",
      toMonitoring: "/monitoring",
      toLogbook: "/logbook"
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
    identity: function () {
      console.log(this.$store.getters.identity)
      return this.$store.getters.identity
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout", this.$router)
    },
    async onClickedAbsensi () {
      await this.$router.push({ path: this.toAbsensi })
    },
    async onClickedMonitoring () {
      await this.$router.push({ path: this.toMonitoring })
    },
    async onClickedPenilaian () {
      await this.$router.push({ path: this.toPenilaian })
    },
    async onClickedLogbook () {
      await this.$router.push({ path: this.toLogbook })
    }
  }
}
</script>

<style scoped>

</style>
