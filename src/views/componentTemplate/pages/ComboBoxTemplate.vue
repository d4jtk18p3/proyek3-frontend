<template>
  <v-card
    :style="{background: currentTheme.surface }"
  >
    <v-row
      class="pa-5"
    >
      <v-col cols="12" class="text-h6" :style="{color: currentTheme.onSurface }">
        ComboBox
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="4">
        <v-combobox solo  v-model="selected" :items="choices" label="add one tag" :dark="isDark"></v-combobox>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="4"  offset-xl="2" >
        <v-combobox solo  multiple v-model="selectedMultipleChoice" :items="choicesMultiple" label="select tags" :dark="isDark">
          <template v-slot:selection="data">
            <v-chip
              :key="JSON.stringify(data.item)"
              v-bind="data.attrs"
              :input-value="data.selected"
              :disabled="data.disabled"
              :dark="isDark"
              :color="currentTheme.colorSecondary"
            >
              <div :style="{color: currentTheme.colorPrimary}">
                {{ data.item }}
              </div>
              <v-avatar
                right
                size="5"
                :color="currentTheme.colorPrimary"
              >
                <v-icon
                  @click="onUnselect(data.index)"
                  x-small
                  color="white"
                >mdi-close</v-icon>
              </v-avatar>
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "ComboBoxTemplate",
  computed: {
    ...mapGetters({
      isDark: "theme/getIsDark",
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  },
  data () {
    return {
      selected: null,
      choices: ["Default-1", "Default-2", "Default-3"],
      selectedMultipleChoice: [],
      choicesMultiple: ["Default-1", "Default-2", "Default-3"]
    }
  },
  methods: {
    onUnselect (index) {
      this.selectedMultipleChoice.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
