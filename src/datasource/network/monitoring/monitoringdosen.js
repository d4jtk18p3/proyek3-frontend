import axios from "axios"
import { MONITORING_URL } from "./const"
import errorHandler
  from "@/datasource/network/errorHandler"

const getListKelas = async (nip) => {
  try {
    const monitoringURL = MONITORING_URL + `/dosen/kelas/${nip}`
    const result = await axios.get(monitoringURL)
    var kelas = []
    var i = 0
    while (i < result.data.data.listKelas.length) {
      kelas[i] = result.data.data.listKelas[i].kode_kelas + "-" + result.data.data.listKelas[i].kode_program_studi
      i++
    }
    console.log(kelas)
    return kelas
  } catch (e) {
    return await errorHandler(e)
  }
}

const getMatkulKelas = async (nip, kodeKelas) => {
  try {
    const monitoringURL = MONITORING_URL + `/dosen/matkul/${nip}/${kodeKelas}`
    const result = await axios.get(monitoringURL)
    var matkul = []
    var i = 0
    while (i < result.data.data.listMatkul.length) {
      matkul[i] = result.data.data.listMatkul[i].nama_mata_kuliah
      i++
    }
    console.log(matkul)
    return matkul
  } catch (e) {
    return await errorHandler(e)
  }
}

const getTugasMatkul = async (idMatkul, idPerkuliahan) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/tugasByMatkul/${idMatkul}/${idPerkuliahan}`
    const result = await axios.get(monitoringURL)
    var tugas = []
    var i = 0
    while (i < result.data.data.listTugas.length) {
      tugas[i] = result.data.data.listTugas[i]
      i++
    }
    console.log(result.data.data.listTugas[i])
    return tugas
  } catch (e) {
    return await errorHandler(e)
  }
}

const postTugasBaru = async (namaTugas, idPerkuliahan) => {
  try {
    const monitoringURL = MONITORING_URL + `/dosen/tugas-baru`
    const result = await axios.post(monitoringURL, { nama_tugas: namaTugas, id_perkuliahan: idPerkuliahan })
    return result.data
  } catch (e) {
    return await errorHandler(e)
  }
}

export default {
  getListKelas,
  getMatkulKelas,
  getTugasMatkul,
  postTugasBaru
}
