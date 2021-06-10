<template>
  <v-row>
    <v-col cols="12">
      <TextSize/>
    </v-col>
    <v-col cols="12">
      <FontWeight/>
    </v-col>
    <v-col cols="12">
      <TextAlignment/>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import TextSize from "@/views/componentTemplate/component/typography/TextSize"
import FontWeight from "@/views/componentTemplate/component/typography/FontWeight"
import TextAlignment from "@/views/componentTemplate/component/typography/TextAlignment"

export default {
  name: "TyphographyTemplate",
  components: { TextAlignment, FontWeight, TextSize },
  computed: {
    ...mapGetters({
      isDark: "theme/getIsDark",
      currentTheme: "theme/getCurrentColor"
    })
  }
}
</script>

<style scoped>
.content-overflow{
  overflow-y: scroll;
}
</style>
