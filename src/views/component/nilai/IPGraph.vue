<template>
  <v-card
    :style="{background: currentTheme.surface}"
    class="pa-3"
  >
    <v-row>
      <v-col cols="12">
        <div class="text-h6 font-weight-bold ml-3" :style="{color: currentTheme.onSurface}">Graf IP</div>
      </v-col>
      <v-col cols="12">
        <apexchart type="area" height="300"  :options="data.chartOptions" :series="data.series"/>
      </v-col>
    </v-row>

  </v-card>

</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "IPGraph",
  props: {
    ipList: {
      type: Array,
      required: false,
      default: () => {
        return [3.2, 2.0, 2.95, 0.51, 2.52, 3.5, 4.0]
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
          name: "IP",
          data: this.ipList
        }],
        chartOptions: {
          chart: {
            height: 300,
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
            min: 0,
            max: 4
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
              text: "Semester",
              style: {
                color: this.currentTheme.onSurface,
                fontSize: "15px"
              }
            },
            categories: ["1", "2", "3", "4", "5", "7", "8"]
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
