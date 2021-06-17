import baseHttp from "./http"
import errorHandler
  from "@/datasource/network/errorHandler"

const MONITORING_URL = "/monitoring"

const getSubtugasByTugas = async (idTugas) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/subtugasByTugas/${idTugas}`
    const result = await baseHttp.get(monitoringURL)
    console.log(result.data.data.uniqueSubtugas)
    return result.data.data.uniqueSubtugas
  } catch (e) {
    return await errorHandler(e)
  }
}

const postSubtugasBaru = async (namaSubtugas, tenggat, idTugas, idStudi) => {
  try {
    const monitoringURL = MONITORING_URL + `/dosen/new-task`
    const result = await baseHttp.post(monitoringURL, {
      nama_subtugas: namaSubtugas,
      tenggat: tenggat,
      id_tugas: idTugas,
      id_studi: idStudi
    })
    return result.data
  } catch (e) {
    return await errorHandler(e)
  }
}

export default {
  getSubtugasByTugas,
  postSubtugasBaru
}
