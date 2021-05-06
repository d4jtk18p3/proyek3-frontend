<template>
  <v-row>
    <v-col cols="6">
      <AreaChart
        chart-title="Area Chart"
        :value-list="[3.2, 2.0, 2.95, 0.51, 2.52, 3.5, 4.0, 5.0]"
        :x-axis-value="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]"
        :bottom-title="{text:'Data Percontohan' }"
        detail-name="Contoh"
        height="300"
        width="100%"
      />
    </v-col>
    <v-col cols="6">
      <LineChart
        chart-title="Line Chart"
        :value-list="fillteredValueList"
        :x-axis-value="xAxisList"
        :bottom-title="{text:'Data Percontohan' }"
        detail-name="Contoh"
        height="300"
        width="100%"
      >
        <template v-slot:top-right>
          <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="4">
            <v-combobox solo  v-model="selected" :items="lineList" label="add one tag" :dark="isDark"></v-combobox>
          </v-col>
        </template>
      </LineChart>
    </v-col>
    <v-col cols="6">
      <BarChart
        chart-title="Bar Chart"
        :value-list="[2.52, 3.5, 4.0, 5.0, 3.2]"
        :x-axis-value="[1, 2, 3, 4, 5]"
        detail-name="Contoh"
        minimum-value="0"
        maximum-value="10"
        height="300"
        width="100%"
        orientation="vertical"
      />
    </v-col>
  </v-row>
</template>

<script>
import AreaChart from "@/views/shared/grafik/AreaChart"
import LineChart from "@/views/shared/grafik/LineChart"
import BarChart from "@/views/shared/grafik/BarChart"
export default {
  name: "GrafikTemplate",
  components: { BarChart, LineChart, AreaChart },
  created () {
    this.filterList.set("Y Diatas 2", (value) => { return value > 2 })
    this.filterList.set("Y Dibawah 4.5", (value) => { return value < 4.5 })
  },
  data () {
    return {
      selected: null,
      isDark: "theme/getIsDark",
      filterList: new Map(),
      valueList: [2.52, 3.5, 4.0, 5.0, 3.2, 2.0, 2.95, 0.51],
      xAxisList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  computed: {
    lineList () {
      const newList = []
      this.filterList.forEach((value, key) => {
        newList.push(key)
      })
      return newList
    },
    fillteredValueList () {
      if (this.selected !== undefined && this.filterList.get(this.selected)) {
        const newList = []
        const filteringFunction = this.filterList.get(this.selected)
        this.valueList.forEach((value) => {
          if (filteringFunction(value)) {
            newList.push(value)
          }
        })
        return newList
      }
      return this.valueList
    }
  }
}
</script>

<style scoped>

</style>
