<template>
  <v-row>
    <v-col>
      <v-card
        :style="{background: currentTheme.surface}"
        class="pa-3"
      >
      <v-row>
        <v-col cols="12">
        <div class="text-h6 font-weight-bold ml-3" :style="{color: currentTheme.onSurface}"> Grafik {{namaSub}}</div>
        </v-col>
        <v-col cols="12">
        <apexchart type="area" height="300" width="100%"  :options="data.chartOptions" :series="data.series" :rataRata-mahasiswa="valList"/>
        </v-col>
      </v-row>
    </v-card>
    </v-col>
    <!-- <v-col xs="3" sm="3" md="3" lg="2" xl="2" class="mt-5">
      <CardRataRata RataRata="30%"/>
    </v-col>
    <v-col xs="3" sm="3" md="3" lg="3.5" xl="2" class="mt-5">
      <CardAllMahasiswa RataRata= "45%"/>
    </v-col> -->
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
// import CardRataRata from "@/views/monitoring/component/dosen/CardRataRata"
// import CardAllMahasiswa from "@/views/monitoring/component/dosen/CardAllMahasiswa"
export default {
  name: "GraphDosen",
  components: {
    // CardRataRata,
    // CardAllMahasiswa
  },
  props: {
    namaSub: {
      type: String,
      required: false,
      default: () => {
        return "Progress Pengerjaan"
      }
    },
    valList: {
      type: Array,
      required: false,
      default: () => {
        return [3.2, 2.0, 2.95, 0.51, 2.52, 3.5, 4.0]
      }
    },
    subTugas: {
      type: Array,
      required: false,
      default: () => {
        return ["a", "b", "c", "d", "e", "f", "g"]
      }
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    data () {
      return {
        series: [{
          name: "Nilai",
          data: this.valList
        }],
        chartOptions: {
          chart: {
            height: 300,
            type: "line",
            background: this.currentTheme.surface
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth"
          },
          yaxis: {
            labels: {
              style: {
                colors: this.currentTheme.onSurface
              }
            }
            // min: 0,
            // max: 4
          },
          xaxis: {
            type: "category",
            labels: {
              show: true,
              style: {
                colors: this.currentTheme.onSurface
              }
            },
            title: {
              text: "Subugas",
              style: {
                color: this.currentTheme.onSurface,
                fontSize: "15px"
              }
            },
            categories: this.subTugas
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
