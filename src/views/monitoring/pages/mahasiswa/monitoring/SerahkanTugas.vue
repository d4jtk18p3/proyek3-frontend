<template>
 <v-dialog
        v-model="dialog"
        width="420"
      >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                :color="currentTheme.colorPrimary"
                dark
                v-bind="attrs"
                v-on="on"
                width="70"
                rounded="6"
                small
            >
                <span style="font-size: 12px" class="font-weight-bold">Selesai</span>
            </v-btn>
        </template>
        <v-card
          :style="{background: currentTheme.surface}"
          class="pa-3"
        >
          <v-row justify="center" class="my-5">
            <v-col cols="12">
              <div class="text-h4 font-weight-bold text-center" :style="{color: currentTheme.onSurface}">Serahkan Tugas</div>
              <div class="text-h7 font-weight-bold text-center font-italic" :style="{color: currentTheme.onSurface}">{{ subTask }}</div>
            </v-col>
            <v-col cols="12" sm="10" class="mt-3">
              <div class="text-h7 font-weight-bold" :style="{color: currentTheme.onSurface}">Lampiran</div>
              <div class="text-caption font-weight-medium font-italic" :style="{color: currentTheme.onSurface}">*Berupa link</div>
              <v-text-field
                v-model="lampiran"
                outlined
                class="mt-3 mb-0"
                :color="currentTheme.colorSecondary"
            ></v-text-field>
              <v-row justify="center">
                <v-col sm="5" class="mt-1">
                  <v-btn color="currentTheme.colorPrimary" elevation="2" width="100" outlined>
                    <span style="font-size: 12px" class="font-weight-bold">Batal</span>
                  </v-btn>
                </v-col>
                <v-col sm="5" class="mt-1">
                  <v-btn
                    :color="currentTheme.colorPrimary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    width="100"
                  >
                    <span style="font-size: 12px" class="font-weight-light">Simpan</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "subTask",
  props: {
    subTask: {
      type: String,
      required: false,
      default: "Another Type of Employee"
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    data () {
      return {
      }
    }
  }
}
</script>

<style scoped>

</style>
