<template>
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
        <apexchart type="bar" height="300" width="100%" :options="data.chartOptions" :series="data.series"/>
      </v-col>
    </v-row>

  </v-card>

</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "GraphPemahamanDurasi",
  props: {
    namaSub: {
      type: String,
      required: false
    },
    namaMhs: {
      type: String,
      required: false
    },
    titleGraf: {
      type: String,
      required: false
    },
    valList: {
      type: Array,
      required: false,
      default: () => {
        return [6, 7, 4, 7, 5]
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
          name: this.namaSub,
          data: this.valList
        }],
        chartOptions: {
          colors: [this.currentTheme.colorSecondary, "#FB8C00", "#4CAF50", "#FF5252", "#2196F3", this.currentTheme.colorSecondaryVariant],
          chart: {
            height: 300,
            type: "bar",
            background: this.currentTheme.surface
          },
          plotOptions: {
            bar: {
              columnWidth: "50%",
              distributed: true,
              borderRadius: 10,
              dataLabels: {
                position: "bottom",
                maxItems: 100,
                hideOverflowingLabels: true,
                orientation: "horizontal"
              }
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth"
          },
          yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            labels: {
              show: true,
              style: {
                colors: this.currentTheme.onSurface
              }
            }
          },
          xaxis: {
            type: "category",
            position: "bottom",
            axisBorder: {
              show: false
            },
            tooltip: {
              enabled: true
            },
            labels: {
              show: false,
              style: {
                colors: this.currentTheme.onSurface
              }
            },
            categories: this.subTugas
          },
          title: {
            text: this.titleGraf,
            style: {
              color: this.currentTheme.onSurface,
              fontSize: "15px"
            },
            align: "center"
          },
          fill: {
            opacity: 1
          },
          legend: {
            position: "bottom",
            offsetX: 0,
            offsetY: 0,
            horizontalAlign: "left",
            labels: {
              colors: this.currentTheme.onSurface
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
