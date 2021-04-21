<template>
  <v-card
    class="rounded-card rounded-lg"
    elevation="10"
  >
    <v-row class="pa-4 ma-0" :style="{background: isDark ? currentTheme.colorSecondaryVariant: currentTheme.colorPrimary}">
      <v-col cols="12" align-self="center" class="pa-0 ma-0">
        <div
          class="text-h5"
          :style="{color : currentTheme.surface}"
        >Jadwal</div>
      </v-col>
    </v-row>
    <div :style="{background : currentTheme.surface}"
    :class="isMobile ? 'pa-0' : 'pa-6'">
      <v-row>
        <v-col>
          <div
            class="body-1 pl-5"
            :style="{color: currentTheme.onSurface}"
          >Hari ini</div>
        </v-col>
        <v-col cols="12">
          <v-timeline
            align-top
            dense
            v-if="!isDark"
          >
            <v-timeline-item
              v-for="(item, index) in jadwalDatas" :key="item.jamKuliah"
              :color="warnaBulletTimeline[index]"
              small
            >
              <v-row class="pt-1">
                <v-col>
                  <div
                    class="body-1 font-weight-bold"
                    :style="{color: currentTheme.onSurface}"
                  >{{item.mataKuliah}}</div>
                </v-col>
                <v-col>
                  <div
                    class="body-1"
                    :style="{color: currentTheme.onSurface}"
                  >{{item.jamKuliah}}</div>
                </v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
          <v-timeline
            dense
            v-if="isDark"
            dark
          >
            <v-timeline-item
              v-for="(item, index) in jadwalDatas" :key="item.jamKuliah"
              :color="warnaBulletTimeline[index]"
              small
            >
              <v-row class="pt-1">
                <v-col>
                  <div
                    class="body-1 font-weight-bold"
                    :style="{color: currentTheme.onSurface}"
                  >{{item.mataKuliah}}</div>
                </v-col>
                <v-col>
                  <div
                    class="body-1"
                    :style="{color: currentTheme.onSurface}"
                  >{{item.jamKuliah}}</div>
                </v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "JadwalItem",
  props: {
    jadwalDatas: {
      type: Array,
      required: false,
      default: () => {
        return [
          {
            mataKuliah: "Model Data",
            jamKuliah: "08:00 - 10:30 AM"
          },
          {
            mataKuliah: "Sistem Terdistribusi",
            jamKuliah: "11:00 - 12:30 AM"
          },
          {
            mataKuliah: "Pengantar Akuntansi",
            jamKuliah: "01:00 - 02:30 PM"
          },
          {
            mataKuliah: "Perancangan Antarmuka",
            jamKuliah: "03:00 - 5:30 PM"
          }
        ]
      }
    }
  },
  data () {
    return {
      warnaBulletTimeline: [
        "#FF5252", "#59DCDC", "#4CAF50", "#FB8C00"
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  }
}
</script>

<style scoped>
</style>
