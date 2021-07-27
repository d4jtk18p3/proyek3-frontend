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
                    <p>: {{kelas}}</p>
                    </v-col>
                 </v-row>
                 <v-row>
                    <v-col cols="3">
                    <p class="font-weight-bold">Keterangan</p>
                    </v-col>
                    <v-col cols="6">
                    <p>: {{dataMhs.keterangans[0].status}}</p>
                    </v-col>
                 </v-row>
            <div class="photo" max-width="85vw">
             <!-- <v-img :src="require(`../../../../../.././proyek3/service-absensi/public/uploads/surat-izin-1625816935769.jpg`)"></v-img> -->
            </div>
            <v-row>
              <v-col align="center">
                <v-btn
                class="btn"
                color="success" @click="updateKeterangan(1)">TERIMA IZIN</v-btn>
                <v-btn
                class="btn"
                color="error" @click="updateKeterangan(0)">TOLAK IZIN</v-btn>
              </v-col>
            </v-row>
            </v-form>
        </div>
      </v-card>
    </v-dialog>
</template>

<script>
import Keterangan from "@/datasource/network/absensi/keterangan"

export default {
  props: ["dialogs", "dataMhs", "kelas"],
  data () {
    return {
      selectedImage: null,
      //  url: "C://Users/Alvira P. D/Documents/GitHub/proyek3/service-absensi/public/uploads/surat-izin-1625816935769.jpg"
      // url: "../../../../../.././proyek3/service-absensi/public/uploads/surat-izin-1625816935769.jpg"
      url: "surat-izin-1625816935769.jpg",
      url2: this.dataMhs.keterangans[0].url
    }
  },
  methods: {
    zoom (url) {
      this.selectedImage = url
    },
    updateKeterangan (status) {
      Keterangan.updateKeterangan(this.dataMhs.keterangans[0].id_keterangan, status)
        .then(response => {
          this.onClickButton()
          this.dialogs.dialog = false
        })
        .catch(e => {
          console.log(e)
        })
    },
    splitUrl () {
      this.url = this.dataMhs.keterangans[0].url
      // var url = this.url.split("\\")
      // this.url = url[url.length - 1]
      // console.log(this.url)
    },
    onClickButton (event) {
      this.$emit("clicked", "someValue")
    }
  },
  mounted () {
    this.url = this.dataMhs.keterangans[0].url
    // console.log(this.url2)
    // this.splitUrl()
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
