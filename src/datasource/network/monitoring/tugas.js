import baseHttp from "./http"
import errorHandler
  from "@/datasource/network/errorHandler"

const MONITORING_URL = "/monitoring"

const getTugasMatkul = async (idMatkul, idPerkuliahan) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/tugasByMatkul/${idMatkul}/${idPerkuliahan}`
    const result = await baseHttp.get(monitoringURL)
    // var tugas = []
    // var i = 0
    // while (i < result.data.data.listTugas.length) {
    //   tugas[i] = result.data.data.listTugas[i]
    //   i++
    // }
    console.log(result.data.data.listTugas)
    return result.data.data.listTugas
  } catch (e) {
    return await errorHandler(e)
  }
}

export default {
  getTugasMatkul
}
