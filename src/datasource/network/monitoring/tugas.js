import baseHttp from "./http"
import errorHandler
  from "@/datasource/network/errorHandler"

const MONITORING_URL = "/monitoring"

const getTugasMatkul = async (idMatkul, idPerkuliahan) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/tugasByMatkul/${idMatkul}/${idPerkuliahan}`
    const result = await baseHttp.get(monitoringURL)
    return result.data.data
  } catch (e) {
    return await errorHandler(e)
  }
}

const getTugasMatkulMahasiswa = async (idMatkul, idPerkuliahan) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/tugasByMatkul/${idMatkul}/${idPerkuliahan}`
    const result = await baseHttp.get(monitoringURL)
    return result.data.data
  } catch (e) {
    return await errorHandler(e)
  }
}

const postTugasBaru = async (namaTugas, statusProgress, statusDurasi,
  statusSkala, statusCatatan, statusLampiran, idPerkuliahan, NIP) => {
  try {
    const monitoringURL = MONITORING_URL + `/dosen/tugas-baru`
    const result = await baseHttp.post(monitoringURL, {
      nama_tugas: namaTugas,
      status_progress: statusProgress,
      status_durasi: statusDurasi,
      status_skala: statusSkala,
      status_catatan: statusCatatan,
      status_lampiran: statusLampiran,
      id_perkuliahan: idPerkuliahan,
      nip: NIP
    })
    return result.data
  } catch (e) {
    return await errorHandler(e)
  }
}

const getMahasiswaByTugas = async (idTugas) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/mahasiswaByTugas/${idTugas}`
    const result = await baseHttp.get(monitoringURL)
    return result.data.data
  } catch (e) {
    return await errorHandler(e)
  }
}

const getKriteriaByTugas = async (idTugas) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/getKriteria/${idTugas}`
    const result = await baseHttp.get(monitoringURL)
    console.log(result.data.data)
    return result.data.data
  } catch (e) {
    return await errorHandler(e)
  }
}

export default {
  getTugasMatkul,
  postTugasBaru,
  getMahasiswaByTugas,
  getKriteriaByTugas,
  getTugasMatkulMahasiswa
}
