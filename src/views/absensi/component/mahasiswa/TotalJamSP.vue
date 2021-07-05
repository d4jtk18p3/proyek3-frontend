<template>
  <v-flex>
    <v-card width="280" class="mt-12 pa-3">
      <p class="text-h5 text-center font-weight-bold">Total Jam SP</p>
      <v-card-text class=" text-center ma-0 pa-0"> {{ keterangan }} </v-card-text>
      <v-card-actions class="justify-center">
        <v-progress-circular
        class="mt-2"
          :rotate="-90"
          :size="150"
          :width="15"
          :value="persentase"
            color="#FF5252">
          {{ sisaMenujuSP }} Jam Tersisa
        </v-progress-circular>
      </v-card-actions>
      <v-row>
        <v-col cols="1">
          <v-progress-circular
            class="ma-5"
            :size="20"
            :value= 100
            color="#FF5252">
          </v-progress-circular>
        </v-col>
        <v-col cols="6">
          <v-card-text class="mt-1 ml-3 text-left">Tidak Masuk</v-card-text>
        </v-col>
        <v-col>
          <v-card-text class="mt-1 mr-2 text-right">{{ jmlTidakHadir }} Jam</v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  created () {
    this.cekStatusSP()
  },
  name: "TotalJamSP",
  props: {
    jmlTidakHadir: {
      type: Number,
      required: false
    },
    sisaMenujuSP: {
      type: Number,
      required: false
    },
    status: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      sp: 10,
      persentase: 0,
      keterangan: ""
    }
  },
  methods: {
    cekStatusSP () {
      if (this.status === "Tidak ada SP") {
        this.keterangan = "*Total absen hingga SP 1 ( SP 1 = 10 Jam )"
        this.sp = 10
        this.persentase = Math.round((this.jmlTidakHadir / this.sp) * 100)
      } else if (this.status === "SP 1") {
        this.keterangan = "*Total absen hingga SP 2 ( SP 2 = 20 Jam )"
        this.sp = 20
        this.persentase = Math.round((this.jmlTidakHadir / this.sp) * 100)
      } else if (this.status === "SP 2") {
        this.keterangan = "*Total absen hingga SP 3 ( SP 3 = 30 Jam )"
        this.sp = 30
        this.persentase = Math.round((this.jmlTidakHadir / this.sp) * 100)
      } else if (this.status === "SP 3") {
        this.keterangan = "*Total absen hingga Pemberhentian dari Polban"
        this.sp = 38
        this.persentase = Math.round((this.jmlTidakHadir / this.sp) * 100)
      }
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  }
}

</script>
