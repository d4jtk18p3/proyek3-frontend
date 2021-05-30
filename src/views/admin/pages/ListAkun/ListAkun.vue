<template>
    <v-data-table
        dark
        :headers="headers"
        :items="items"
        :loading="isLoading"
        loading-text=""
        :items-per-page="5"
        class="elevation-1"
        :style="{backgroundColor: currentTheme.colorPrimary}"
    >
    //<template v-slot:[`item.actions`]="{ item }">
        //<v-icon small class="mr-2" @click="editAkun(item.id)">mdi-pencil</v-icon>
    //</template>
    </v-data-table>
</template>

<script>
import { mapGetters } from "vuex"
import axios from "axios"
// import AkunService from "../../../../datasource/http-common"
export default {
  name: "ListAkun",
  data () {
    return {
      headers: [
        {
          text: "NIP/NIM",
          value: "nomorInduk",
          sortable: false,
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Jenis Nomor Induk",
          value: "jenisNomorInduk",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Nama",
          value: "nama",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "E-mail",
          value: "email",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Role/Jenis Akun",
          value: "role",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        }
      ],
      items: []
    }
  },
  methods: {
    async retrieveAkun () {
    /* await AkunService.getAll()
        .then((response) => {
          this.items = response.data
          console.log(response.data)
        })
        .catch((e) => {
          console.log(e)
        }) */
      try {
        const result = await axios.get("http://localhost:5001/user/")
        this.items = result.data.data
        console.log(result.data.data)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  mounted () {
    this.retrieveAkun()
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
