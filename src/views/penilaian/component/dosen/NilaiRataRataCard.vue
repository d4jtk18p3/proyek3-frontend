<template>
  <v-card
    :style="{background: currentTheme.surface}"
    class="pa-3"
  >
    <v-row>
      <v-col cols="12">
        <div class="text-h6 font-weight-bold ml-3" :style="{color: currentTheme.onSurface}">Rata-Rata Perolehan Nilai Mahasiswa</div>
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
  name: "NilaiRataRataCard",
  props: {
    nilaiList: {
      type: Array,
      required: false,
      default: () => {
        return [6, 7, 4, 7, 5]
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
          name: "Jumlah",
          data: this.nilaiList
        }],
        chartOptions: {
          colors: [this.currentTheme.colorSecondary, "#FB8C00", "#4CAF50", this.currentTheme.colorSecondaryVariant, "#2196F3"],
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
              show: true,
              style: {
                colors: this.currentTheme.onSurface
              }
            },
            categories: ["> 79", "60-79", "40-59", "30-39", "< 30"]
          },
          title: {
            text: "Range Nilai",
            style: {
              color: this.currentTheme.onSurface,
              fontSize: "15px"
            },
            align: "center",
            offsetY: 330
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
