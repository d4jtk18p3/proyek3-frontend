import baseHttp from "./http"
import errorHandler
  from "@/datasource/network/errorHandler"

const MONITORING_URL = "/monitoring"

const getListKelas = async (nip) => {
  try {
    const monitoringURL = MONITORING_URL + `/dosen/kelas/${nip}`
    const result = await baseHttp.get(monitoringURL)
    // var kelas = []
    // var i = 0
    // while (i < result.data.data.listKelas.length) {
    //   kelas[i] = result.data.data.listKelas[i].kode_kelas + "-" + result.data.data.listKelas[i].kode_program_studi
    //   i++
    // }
    console.log(result.data.data.uniqueClass)
    return result.data.data.uniqueClass
  } catch (e) {
    return await errorHandler(e)
  }
}

export default {
  getListKelas
}
