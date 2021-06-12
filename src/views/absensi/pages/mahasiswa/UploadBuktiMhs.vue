<template lang="">
    <v-card max-height="1000" max-width="650" style="border-radius:15px">
        <div>
            <h1 align="center" >Ajukan Izin</h1>
             <form class="content">
                 <v-row>
                    <v-col cols="12">
                      <img width="25px" height="25px" src="@/assets/1.png"/>
                      <p>Ajukan Izin untuk mata kuliah</p>
                      <div class="inside">
                        <v-checkbox small color="indigo" class="ma-0 pa-0" label="Sistem Terdistribusi (T)"></v-checkbox>
                        <v-checkbox small color="indigo" class="ma-0 pa-0" label="Sistem Terdistribusi (T)"></v-checkbox>
                        <v-checkbox small color="indigo" class="ma-0 pa-0" label="Sistem Terdistribusi (T)"></v-checkbox>
                        <v-checkbox small color="indigo" class="ma-0 pa-0" label="Sistem Terdistribusi (T)"></v-checkbox>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <img width="25px" height="25px" src="@/assets/2.png"/>
                        <p>Ajukan surat keterangan izin</p>
                        <div class="inside">
                        <v-file-input
                          show-size
                          label="File input"
                          height="20px"
                          prepend-icon="mdi-camera"
                        ></v-file-input>
                        </div>
                    </v-col>
                    <v-col cols="12">
                      <img width="25px" height="25px" src="@/assets/3.png"/>
                        <p>Konfirmasi diri</p>
                        <div class="inside">
                        <v-text-field
                            label="Password"
                            v-model="password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            width="100px"
                        ></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <v-checkbox v-model="checkbox" div class="inside">
                        <template v-slot:label>
                          <div >
                            Dengan ini saya menyetujui segala
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <a
                                  target="_blank"
                                  href="/template/mahasiswa/upload"
                                  @click.stop
                                  v-on="on"
                                >
                                  kebijakan
                                </a>
                              </template>
                              Opens in new window
                            </v-tooltip>
                          </div>
                        </template>
                        </v-checkbox>
                    </v-col>
                    <div div class="inside">
                      <v-btn align="center">
                            Kirim Permohonan
                        </v-btn>
                    </div>
                 </v-row>
             </form>
        </div>
    </v-card>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  data () {
    return {
      computed: {
        ...mapGetters({
          currentTheme: "theme/getCurrentColor",
          isDark: "theme/getIsDark"
        })
      }
    }
  }
}
</script>
<style scoped>
.content {
display: flex;
padding : 3rem 5rem 5rem 5rem;
height: 100%;
width: 100%;
flex-direction: column;
}
h1 {
    text-align:center;
    padding-top: 2rem;
}
.v-text-field{
      width: 500px;
}
img {
  float : left;
}
p {
  font-size: 18px;
  margin-left : 40px;
}
.inside{
  padding-left : 40px;
}
.submit{
  align : center;
}
</style>
