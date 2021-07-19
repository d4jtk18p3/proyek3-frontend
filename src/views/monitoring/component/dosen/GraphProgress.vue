<template>
  <v-row>
    <v-col>
      <v-card
        :style="{background: currentTheme.surface}"
        class="pa-3"
      >
      <v-row>
        <v-col cols="12">
        <div class="text-h6 font-weight-bold ml-3" :style="{color: currentTheme.onSurface}">Grafik {{namaSub}}</div>
        <div class="text-subtitle-1 font-weight-medium ml-3" :style="{color: currentTheme.onSurface}">{{namaMhs}}</div>
        </v-col>
        <v-col cols="12">
        <apexchart type="radialBar" height="600" width="100%"  :options="data.chartOptions" :series="data.series" :rataRata-mahasiswa="valList"/>
        </v-col>
      </v-row>
    </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "GraphProgress",
  props: {
    namaSub: {
      type: String,
      required: false,
      default: () => {
        return "Progress Pengerjaan"
      }
    },
    namaMhs: {
      type: String,
      required: false
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
    },
    average: {
      type: String,
      required: false,
      default: () => {
        return "0"
      }
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    data () {
      return {
        series: this.valList,
        chartOptions: {
          chart: {
            type: "radialBar"
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: "22px"
                },
                value: {
                  fontSize: "16px"
                },
                total: {
                  show: true,
                  label: "Rata-rata",
                  formatter: function (w) {
                    var average = w.globals.seriesTotals.reduce((a, b) => (a + b)) / w.globals.seriesTotals.length
                    return average.toFixed(2) + "%"
                  }
                }
              }
            }
          },
          labels: this.subTugas
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
