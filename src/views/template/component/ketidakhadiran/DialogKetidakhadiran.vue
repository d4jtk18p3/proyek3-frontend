<template>
  <v-dialog v-model="dialogs.dialog" max-width="650">
     <v-card max-height="1000" max-width="650" style="border-radius:15px">
        <div>
         <v-icon class="icon" @click="dialogs.dialog = false">
         mdi-close
         </v-icon>
            <h1 align="center" >Validasi Ketidakhadiran</h1>
             <v-form class="content" ref="form">
                 <v-row>
                    <v-col cols="3">
                    <p class="font-weight-bold">NIM</p>
                    </v-col>
                    <v-col cols="6">
                    <p>: {{dataMhs.nim}}</p>
                    </v-col>
                 </v-row>
                 <v-row>
                    <v-col cols="3">
                    <p class="font-weight-bold">Nama</p>
                    </v-col>
                    <v-col cols="6">
                    <p>: {{dataMhs.nama}}</p>
                    </v-col>
                 </v-row>
                 <v-row>
                    <v-col cols="3">
                    <p class="font-weight-bold">Kelas</p>
                    </v-col>
                    <v-col cols="6">
                    <p>: {{dataMhs.kelas}}</p>
                    </v-col>
                 </v-row>
                 <v-row>
                    <v-col cols="3">
                    <p class="font-weight-bold">Keterangan</p>
                    </v-col>
                    <v-col cols="6">
                    <p>: {{dataMhs.keterangan}}</p>
                    </v-col>
                 </v-row>
            <div class="photo" max-width="85vw">
             <img :src="url" alt="" width="100%" @click.stop="selectedImage = null">
            </div>
            <v-row>
              <v-col align="center">
                <v-btn
                class="btn"
                color="success">TERIMA IZIN</v-btn>
                <v-btn
                class="btn"
                color="error">TOLAK IZIN</v-btn>
              </v-col>
            </v-row>
            </v-form>
        </div>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ["dialogs", "dataMhs"],
  data () {
    return {
      selectedImage: null,
      url: "http://via.placeholder.com/400x300?text=image%201"
    }
  },
  methods: {
    zoom (url) {
      console.log("Zoom", url)
      this.selectedImage = url
    }
  }
}
</script>

<style scoped>
.photo {
  margin: 1rem;
}
.btn {
  margin: 1rem;
}
h1 {
    text-align:center;
    padding-top: 2rem;
}
.body {
    padding : 20px;
}
.data {
    padding-left : 30px;
    padding-right: 30px;
}
.icon{
    padding: 10px;
}
p{
    margin: 0px;
}
.content {
display: flex;
padding : 3rem 5rem 5rem 5rem;
height: 100%;
width: 100%;
flex-direction: column;
}
</style>
