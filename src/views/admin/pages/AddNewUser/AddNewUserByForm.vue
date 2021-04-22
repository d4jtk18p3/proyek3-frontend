<template>
  <v-container>
    <v-row :style="{color: currentTheme.onBackground}">
      <v-col cols="12">
        <p class="text-h4 font-weight-bold">Pendaftaran Akun Mahasiswa via Formulir</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="10"
        sm="8"
        md="6"
        lg="4"
      >
        <p class="font-weight-bold colorPrimary">Role/Jenis Akun</p>
        <v-select
          v-model="role"
          :items="roles"
          solo
          placeholder="Silakan pilih role"
          dense
          chips
          multiple
          :color="currentTheme.colorSecondary"
        ></v-select>
        <p class="font-weight-bold colorPrimary">Jenis Nomor Induk</p>
        <v-select
          v-model="induk"
          :items="induks"
          solo
          placeholder="Silakan pilih jenis nomor induk"
          dense
          :color="currentTheme.colorSecondary"
        ></v-select>
        <v-text-field
          label="NIP/NIM"
          :color="currentTheme.colorPrimary"
        >
        </v-text-field>
        <v-text-field
          label="Nama"
          :color="currentTheme.colorPrimary"
        >
        </v-text-field>
        <v-text-field
          label="E-mail"
          :color="currentTheme.colorPrimary"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="10"
        sm="8"
        md="6"
        lg="4"
        class="text-right"
      >
        <v-btn
          :color="currentTheme.colorSecondary"
          dark
          v-on="on"
          width="100"
        >Submit
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "AddNewUserByForm",
  data () {
    return {
      role: [],
      roles: [
        "Dosen",
        "Mahasiswa",
        "Admin",
        "Tata Usaha"
      ],
      induk: "",
      induks: [
        "NIM",
        "NIP"
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  }
}
</script>

<style scoped>
  .v-text-field >>> label{
    font-size: 1em;
    font-weight: bold;
  }
  .colorPrimary{
    color: #272343;
  }
</style>
