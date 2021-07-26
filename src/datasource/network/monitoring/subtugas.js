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

const putSubTugasSerahkan = async (id, lampiran) => {
  try {
    const monitoringURL = MONITORING_URL + `/updateSubtugasLampiran-mahasiswa/${id}`
    const result = await baseHttp.put(monitoringURL, {
      lampiran: lampiran
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

const putSubTugasMahasiswa = async (id, progress, skalaPemahaman, catatan) => {
  try {
    const monitoringURL = MONITORING_URL + `/updateSubtugas-mahasiswa/${id}`
    const result = await baseHttp.put(monitoringURL, {
      progress: progress,
      skala_pemahaman: skalaPemahaman,
      catatan: catatan
    })
    return result.data
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

const putSubTugasDurasi = async (id, durasi) => {
  try {
    const monitoringURL = MONITORING_URL + `/updateSubtugasDurasi-mahasiswa/${id}`
    const result = await baseHttp.put(monitoringURL, {
      durasi: durasi
    })
    return result.data
  } catch (e) {
    return await errorHandler(e)
  }
}

const getSubtugasById = async (idSubtugas) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/task/${idSubtugas}`
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
  getAllSubtugasByTugas,
  putSubTugasSerahkan,
  putSubTugasMahasiswa,
  putSubTugasDurasi,
  getSubtugasById
}
