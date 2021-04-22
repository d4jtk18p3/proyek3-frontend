<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="items"
    >
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  /*
  Ini adalah pre define data table yang mungkin dibutuhkan. Sudah menyesuaikan design UI/UX
  Bila anda memerlukan  sesuatu yang lebih kompleks, disarankan langsung menggunakan <v-data-table> dari vuetify
  */
  name: "DataTable",
  props: {
    headers: {
      type: Array,
      default: () => {
        return [
          { text: "NIP/NIM", value: "nomorInduk" },
          { text: "Jenis Nomor Induk", value: "type" },
          { text: "Nama", value: "nama" },
          { text: "Email", value: "email" },
          { text: "Role/ Jenis Akun", value: "role" }
        ]
      }
    },
    /*
      Item merupakan array dari objek,
      setiap objek meruapak key value pair.
      key objek akan menentukan posisi pada tabel.
     */
    items: {
      type: Array,
      default: () => {
        return [
          {
            nomorInduk: "181524016",
            type: "NIM",
            nama: "Doni Sumanto",
            email: "naufalfadhil12344@gmail.com",
            role: "Mahasiswa"
          },
          {
            nomorInduk: "181524017",
            type: "NIM",
            nama: "Doni Sumanti",
            email: "naufalfadhil12344@gmail.com",
            role: "Dosen"
          }
        ]
      }
    }
  },
  computed: {
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    }
  }
}
</script>
<style>
  /*tbody tr:nth-of-type(even) {*/
  /*  background-color: rgba(236, 237, 237);*/
  /*}*/

  /*tbody tr:nth-of-type(odd) {*/
  /*  background-color: rgb(250 ,250, 250);*/
  /*}*/

  /*.v-data-table-header {*/
  /*  background-color: #272343;*/
  /*  color: white;*/
  /*}*/

  /*.v-data-footer {*/
  /*  background-color: #272343;*/
  /*  color: white;*/
  /*}*/

  /*.v-data-footer .{*/

  /*}*/
</style>
