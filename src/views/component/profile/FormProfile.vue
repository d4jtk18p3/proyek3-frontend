<template>
    <v-container >
      <v-row >
        <v-col :cols="isMobile ? `12` : `6`">
            Nama Depan
            <v-text-field
                v-model="namadepan"
                outlined
                class="mt-3 mb-0"
                :dark="isDark"
            ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col :cols="isMobile ? `12` : `6`">
            Nama Belakang
            <v-text-field
                v-model="namabelakang"
                outlined
                class="mt-3 mb-0"
                :dark="isDark"
            ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-0 mb-0">
        <v-col :cols="isMobile ? `12` : `6`">
            Username
            <v-text-field
                v-model="username"
                outlined
                class="mt-3 mb-0"
                :dark="isDark"
            ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-0 mb-0">
        <v-col :cols="isMobile ? `12` : `6`">
            Password
            <v-text-field
                v-model="email"
                outlined
                class="mt-3 mb-0"
                type="password"
                :dark="isDark"
            ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-0 mb-0">
        <v-col cols="12">
            E-Mail
            <v-text-field
                v-model="email"
                outlined
                class="mt-3 mb-0"
                :dark="isDark"
            ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-0 mb-0">
        <v-col cols="12">
            Alamat
            <v-textarea
                v-model="email"
                outlined
                class="mt-3 mb-0"
                :dark="isDark"
            ></v-textarea>
        </v-col>
      </v-row>
      <v-row class="mt-0 mb-0">
        <v-col cols="7">
          <v-combobox
            v-model="select"
            :items="items"
            solo
            :dark="isDark"
            :color="currentTheme.colorSecondary"
          ></v-combobox>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "FormProfile",
  data () {
    return {
      namadepan: "Karina",
      namabelakang: "Vilda",
      username: "kkkkk",
      email: "karina.vilda@yuhuu.com",
      alamat: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
      select: ["Teknik Informatika"],
      items: [
        "Teknik Informatika",
        "Programming",
        "Design",
        "Vue"
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

<style>
  .v-text-field--outlined >>> fieldset {
    border-color: white !important
  }
</style>
