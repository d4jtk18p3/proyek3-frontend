import baseHttp from "./http"
import errorHandler
  from "@/datasource/network/errorHandler"

const MONITORING_URL = "/monitoring"

const getMatkulKelas = async (nip, kodeKelas) => {
  try {
    const monitoringURL = MONITORING_URL + `/dosen/matkul/${nip}/${kodeKelas}`
    const result = await baseHttp.get(monitoringURL)
    // var matkul = []
    // var i = 0
    // while (i < result.data.data.listMatkul.length) {
    //   matkul[i] = result.data.data.listMatkul[i].nama_mata_kuliah
    //   i++
    // }
    console.log(result.data.data)
    return result.data.data
  } catch (e) {
    return await errorHandler(e)
  }
}

export default {
  getMatkulKelas
}
