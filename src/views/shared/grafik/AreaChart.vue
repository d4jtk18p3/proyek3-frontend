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
        <apexchart type="area" :height="this.height" :width="this.width"  :options="data.chartOptions" :series="data.series"/>
      </v-col>
    </v-row>

  </v-card>

</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "AreaChart",
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
          chart: {
            type: "area",
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
            },
            min: this.minimumValue,
            max: this.maximumValue
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
              text: this.bottomTitle.text,
              style: {
                color: this.currentTheme.onSurface,
                fontSize: this.bottomTitle.textSize
              }
            },
            categories: this.xAxisValue
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
