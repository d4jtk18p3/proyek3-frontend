import axios from "axios"
import { MONITORING_URL } from "../const"

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
  } catch (err) {
    console.error(err)
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
  } catch (err) {
    console.error(err)
  }
}

const getTugasMatkul = async (id) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/tugasByMatkul/${id}`
    const result = await axios.get(monitoringURL)
    var tugas = []
    var i = 0
    while (i < result.data.data.listTugas[0].length) {
      tugas[i] = result.data.data.listTugas[0][i].nama_tugas
      i++
    }
    console.log(result.data.data.listTugas[0][0].nama_tugas)
    return tugas
  } catch (err) {
    console.error(err)
  }
}

export default {
  getListKelas,
  getMatkulKelas,
  getTugasMatkul
}
