<template>
  <div v-if="currentAkun" class="edit-form py-3">
    <p class="headline">Edit Akun</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentAkun.attributes.noInduk[0]"
        label="NIK"
        disabled
      ></v-text-field>

      <v-text-field
        v-model="currentAkun.email"
        :rules="[(v) => !!v || 'Email is required']"
        label="Email"
        required
      ></v-text-field>
      <v-switch
       v-model="currentAkun.enabled"
       label="Status"
      ></v-switch>
      <v-divider class="my-5"></v-divider>

      <v-btn color="success" small @click="updateAkun">
        Update
      </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Mohon untuk memilih akun yang valid</p>
  </div>
</template>

<script>
import AkunService from "../../../../services/AkunServices"

export default {
  name: "akun",
  data () {
    return {
      currentAkun: null,
      message: ""
    }
  },
  methods: {
    async getAkun (id) {
      try {
        console.log(id)
        const result = await AkunService.get(id)
        this.currentAkun = result.data.data[0]
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    },
    async updateAkun () {
      try {
        const result = await AkunService.update(this.currentAkun.username, this.currentAkun.email, this.currentAkun.enabled)
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.message = ""
    this.getAkun(this.$route.params.id)
  }
}
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
