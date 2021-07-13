import baseHttp from "./http"
import errorHandler
  from "@/datasource/network/errorHandler"

const MONITORING_URL = "/monitoring"

const getSubTugasMatkul = async (id) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/subtugasByTugas/${id}`
    const result = await baseHttp.get(monitoringURL)
    var subtugas = []
    var i = 0
    while (i < result.data.data.uniqueSubtugas.length) {
      subtugas[i] = result.data.data.uniqueSubtugas[i]
      i++
    }
    console.log(result.data.data.uniqueSubtugas)
    return result.data.data.uniqueSubtugas
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

const putSubTugasSerahkan = async (id, lampiran) => {
  try {
    const monitoringURL = MONITORING_URL + `/updateSubtugasLampiran-mahasiswa/${id}`
    const result = await baseHttp.put(monitoringURL, {
      Lampiran: lampiran
    })
    return result.data
  } catch (e) {
    return await errorHandler(e)
  }
}

const putSubTugas = async (id, progress, skalaPemahaman, catatan) => {
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

export default {
  getSubTugasMatkul,
  postTugasBaru,
  putSubTugasSerahkan,
  putSubTugas,
  putSubTugasDurasi
}
