<template>
  <v-data-table
    dark
    :headers="headers"
    :items="items"
    :loading="isLoading"
    loading-text=""
    :items-per-page="5"
    class="elevation-1"
    :style="{ backgroundColor: currentTheme.colorPrimary }"
    :search="search"
  >
    <template v-slot:top>
      <v-card>
        <v-combobox
          v-model="select"
          :items="combofilter"
          label="Filter"
        ></v-combobox>
      </v-card>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      >
      </v-text-field>
    </template>
    <template v-slot:[`item.attributes.isActive[0]`]="{ item }">
      {{ item.attributes.isActive[0] ? "Aktif" : "Non-Aktif" }}
    </template>
    <template v-slot:[`item.attributes.role[0]`]="{ item }">
      <div v-if="item.attributes.role[0] === 'dosen'">Dosen</div>
      <div v-if="item.attributes.role[0] === 'mahasiswa'">Mahasiswa</div>
      <div v-if="item.attributes.role[0] === 'admin'">Admin</div>
      <div v-if="item.attributes.role[0] === 'tata_usaha'">Tata Usaha</div>
      <div v-if="item.attributes.role[0] === 'superadmin'">Super Admin</div>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editAkun(item.attributes.noInduk[0])"
        >mdi-pencil</v-icon
      >
      <v-icon small @click="deleteAkun(item.attributes.noInduk[0])"
        >mdi-delete</v-icon
      >
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex"
import AkunService from "../../../../services/AkunServices"
export default {
  name: "ListAkun",
  data () {
    return {
      search: "",
      select: [],
      combofilter: ["mahasiswa", "dosen", "tata_usaha", "admin"],
      headers: [
        {
          text: "NIP/NIM",
          value: "attributes.noInduk[0]",
          sortable: false,
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "E-mail",
          value: "email",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Nama",
          value: "firstName",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Role",
          value: "attributes.role[0]",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Status",
          value: "attributes.isActive[0]",
          class: "white--text text-lg-subtitle-1 font-weight-bold"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false
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
        const result = await AkunService.getAll()
        this.items = result.data.data
        console.log(result.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    refreshList () {
      this.retrieveAkun()
    },
    editAkun (id) {
      this.$router.push({
        name: "EditAkun",
        params: { id: id }
      })
    },
    async deleteAkun (id) {
      try {
        const result = await AkunService.delete(id)
        this.refreshList()
        console.log(result)
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
  watch: {
    select: async function (role) {
      const result = await AkunService.getbyRole(role)
      console.log(result.data.data)
      this.items = result.data.data
    }
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
    background-color: #ffffff !important;
  }
}
</style>
