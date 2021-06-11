<template>
  <v-data-table
    dark
    :headers="headers"
    :items="items"
    :loading="isLoading"
    loading-text=""
    :items-per-page="5"
    class="elevation-1"
    :style="{backgroundColor: currentTheme.onBackground}"
  >
    <template v-slot:no-data>
      <p
        :style="{color: currentTheme.colorPrimary}"
        class="text-lg-subtitle-1 font-weight-bold"
      >No Data Available
      </p>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "KelasItem",
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  props: {
    headers: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    items: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
  tbody {
    tr:hover {
      background-color: #b9b9b9 !important;
    }
    tr {
      color: black;
      background-color: #FFFFFF !important;
    }
  }
</style>
