<template>
  <v-card
    :style="{background: currentTheme.surface}"
    class="pa-3"
  >
    <v-row>
      <v-col cols="12">
        <div class="d-flex">
          <div class="text-h6 font-weight-bold ml-3 flex-grow-0" :style="{color: currentTheme.onSurface}">{{ this.chartTitle }}</div>
          <div class="flex-grow-1 d-flex justify-end align-center"><slot  name="top-right"></slot></div>
        </div>
      </v-col>
      <v-col cols="12">
        <apexchart type="bar"  :height="height" :width="width"  :options="data.chartOptions" :series="data.series"/>
      </v-col>
    </v-row>

  </v-card>

</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "BarChart",
  props: {
    valueList: {
      type: Array
    },
    xAxisValue: {
      type: Array
    },
    height: {
      type: Number
    },
    width: {
      type: Number
    },
    minimumValue: {
      type: Number
    },
    maximumValue: {
      type: Number
    },
    chartTitle: {
      type: String
    },
    detailName: {
      type: String,
      default: ""
    },
    bottomTitle: {
      type: Object,
      default: () => {
        return {
          text: "",
          textSize: "15px"
        }
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
          name: this.detailName,
          data: this.valueList
        }],
        chartOptions: {
          colors: [this.currentTheme.colorSecondary, "#FB8C00", "#4CAF50", this.currentTheme.colorSecondaryVariant, "#2196F3"],
          chart: {
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
                hideOverflowingLabels: true,
                orientation: "Horizontal"
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
            },
            min: this.minimumValue,
            max: this.maximumValue
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
              show: true,
              style: {
                colors: this.currentTheme.onSurface
              }
            },
            categories: this.xAxisValue
          },
          fill: {
            opacity: 1
          },
          legend: {
            position: "right",
            offsetX: 0,
            offsetY: 50,
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
