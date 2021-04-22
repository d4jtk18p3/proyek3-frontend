<template>
  <div>
    <DataTable/>
  </div>
</template>

<script>
import csvToJSON from "convert-csv-to-json"

const fileDir = "E:/ContohDataUser.csv"
const DataTable = () => import("@/views/admin/component/addNewUserByCSV/DataTable")
export default {
  name: "AddNewUserByCSV",
  components: { DataTable },
  created () {
    const result = csvToJSON.getJsonFromCsv(fileDir)
    result.forEach((value) => {
      console.log(value)
    })
  }
}
</script>

<style scoped>

</style>
