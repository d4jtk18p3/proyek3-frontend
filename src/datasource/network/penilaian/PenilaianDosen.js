import axios from "axios"
import { PENILAIAN_URL, PENILAIANDOSEN_URL } from "./const"
import errorHandler from "@/datasource/network/errorHandler"

const getNilaiAkhir = async (perkuliahan) => {
  try {
    const penilaianURL = PENILAIAN_URL + `/get-nilai-akhir/perkuliahan/${perkuliahan}`
    const result = await axios.get(penilaianURL)
    var nilaiAkhir = result.data.data
    for (var i = 0; i < nilaiAkhir.listNilaiAkhir.length; i++) {
      nilaiAkhir.listNilaiAkhir[i].nilai_akhir = (nilaiAkhir.listNilaiAkhir[i].nilai_ets + nilaiAkhir.listNilaiAkhir[i].nilai_eas) / 2
    }
    return nilaiAkhir
  } catch (e) {
    return await errorHandler(e)
  }
}

const getKelas = async (nip) => {
  try {
    const penilaianURL = PENILAIANDOSEN_URL + `/kelas/${nip}`
    const result = await axios.get(penilaianURL)
    var kelas = result.data.data
    return kelas
  } catch (e) {
    return await errorHandler(e)
  }
}

const getMatkul = async (nip, kodeKelas) => {
  try {
    const penilaianURL = PENILAIANDOSEN_URL + `/matkul/${nip}/${kodeKelas}`
    const result = await axios.get(penilaianURL)
    var matkul = result.data.data
    return matkul
  } catch (e) {
    return await errorHandler(e)
  }
}

// const postTugasBaru = async (namaTugas, idPerkuliahan) => {
//     try {
//       const monitoringURL = MONITORING_URL + `/dosen/tugas-baru`
//       const result = await axios.post(monitoringURL, { nama_tugas: namaTugas, id_perkuliahan: idPerkuliahan })
//       return result.data
//     } catch (e) {
//       return await errorHandler(e)
//     }
//   }

export default {
  getNilaiAkhir,
  getKelas,
  getMatkul
}
