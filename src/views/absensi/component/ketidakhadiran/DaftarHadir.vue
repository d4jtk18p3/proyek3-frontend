<template>
<v-container>
  <v-row
   v-for="(mhs, index) in ketidakhadiran.mhs_izin"
   :key="index"
   >
   <v-col
   v-if="mhs.keterangans[0].isAccepted==-1">
    <v-card
      max-height="1000"
      max-width="350"
      @click="openDialog(mhs)">
    <div class="body">
    <v-row>
       <v-col cols="4">
        <p class="font-weight-bold">NIM</p>
       </v-col>
       <v-col>
        <p >{{mhs.nim}}</p>
       </v-col>
     </v-row>
    <v-row>
       <v-col cols="4">
        <p class="font-weight-bold">Nama</p>
       </v-col>
       <v-col>
        <p >{{mhs.nama}}</p>
       </v-col>
     </v-row>
    </div>
    </v-card>
   </v-col>
  </v-row>
  <Dialog :dialogs="dialogs" :dataMhs="dataMhs" :kelas="ketidakhadiran.kode_kelas"></Dialog>
</v-container>
</template>

<script>
import Dialog from "./DialogKetidakhadiran.vue"
export default ({
  components: { Dialog },
  data () {
    return {
      dialogs: {
        dialog: false
      },
      dataMhs: [],
      mahasiswa: [],
      kelas: ""
    }
  },
  props: {
    ketidakhadiran: {
      type: Array,
      default () {
        return {}
      }
    }
  },
  methods: {
    openDialog (mhs) {
      this.dataMhs = mhs
      this.dialogs.dialog = true
    }
  }
})
</script>
<style scoped>
p {
    margin: 0px;
}
.body {
    padding : 20px;
}
</style>
