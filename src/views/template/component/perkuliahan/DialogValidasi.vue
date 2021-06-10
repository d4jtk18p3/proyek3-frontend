<template>
  <v-dialog max-width="400px" max-height="500">
    <template v-slot:activator="{on}">
        <v-btn color="warning" v-on="on" dark>Edit</v-btn>
      </template>
      <v-card style="border-radius:10px">
           <v-form class="content" ref="form">
               <h2 align="center" style="padding-bottom:20px">Edit Kehadiran</h2>
               <v-row>
                   <v-col cols="4">
                   <h4>NIM</h4>
                   </v-col>
                   <v-col>
                   <p>{{mahasiswa.nim}}</p>
                   </v-col>
               </v-row>
               <v-row>
                   <v-col cols="4">
                   <h4>Nama</h4>
                   </v-col>
                    <v-col>
                   <p>{{mahasiswa.nama}}</p>
                   </v-col>
               </v-row>
               <v-row>
                   <v-col cols="4">
                   <h4>Kehadiran</h4>
                   </v-col>
                   <v-radio-group>
                    <v-col>
                      <v-radio
                      label ="Hadir">
                      </v-radio>
                    </v-col>
                    <v-col>
                        <v-radio
                        label ="Tidak Hadir">
                        </v-radio>
                    </v-col>
                   </v-radio-group>
               </v-row>
               <v-row justify="center">
                   <v-btn color="success">Selesai</v-btn>
               </v-row>
           </v-form>
      </v-card>
   </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      mahasiswa: {
        nim: 181524002,
        nama: "Alvira Putrina D",
        isHadir: false
      }
    }
  },
  props: ["dialogs"]
}
</script>

<style scoped>
.content {
display: flex;
padding : 2rem ;
height: 100%;
width: 100%;
flex-direction: column;
}
</style>
