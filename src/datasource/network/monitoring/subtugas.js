import baseHttp from "./http"
import errorHandler
  from "@/datasource/network/errorHandler"

const MONITORING_URL = "/monitoring"

const getSubtugasByTugas = async (idTugas) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/subtugasByTugas/${idTugas}`
    const result = await baseHttp.get(monitoringURL)
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

const putSubtugas = async (idSubtugas, namaSubtugas, tenggat) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/updateSubtugas/${idSubtugas}`
    const result = await baseHttp.put(monitoringURL, {
      nama_subtugas: namaSubtugas,
      tenggat: tenggat
    })
    return result.data
  } catch (e) {
    return await errorHandler(e)
  }
}

const getSubtugasByMahasiswa = async (idTugas, idMhs) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/getSubtugasByMahasiswa/${idTugas}/${idMhs}`
    const result = await baseHttp.get(monitoringURL)
    return result.data.data.uniqueSubtugas
  } catch (e) {
    return await errorHandler(e)
  }
}

const getAllSubtugasByTugas = async (idTugas) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/getAllSubtugasbyTugas/${idTugas}`
    const result = await baseHttp.get(monitoringURL)
    return result.data.data.subtugas
  } catch (e) {
    return await errorHandler(e)
  }
}

export default {
  getSubtugasByTugas,
  postSubtugasBaru,
  putSubtugas,
  getSubtugasByMahasiswa,
  getAllSubtugasByTugas
}
