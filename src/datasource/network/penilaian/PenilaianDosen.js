import baseHttp from "./http"
import errorHandler from "@/datasource/network/errorHandler"

const PENILAIAN_URL = "/penilaian"
const PENILAIANDOSEN_URL = "/dosen"

const getNilaiAkhir = async (perkuliahan) => {
  try {
    const penilaianURL = PENILAIAN_URL + `/get-nilai-akhir/perkuliahan/${perkuliahan}`
    const result = await baseHttp.get(penilaianURL)
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
    const result = await baseHttp.get(penilaianURL)
    var kelas = result.data.data
    return kelas
  } catch (e) {
    return await errorHandler(e)
  }
}

const getMatkul = async (nip, kodeKelas) => {
  try {
    const penilaianURL = PENILAIANDOSEN_URL + `/matkul/${nip}/${kodeKelas}`
    const result = await baseHttp.get(penilaianURL)
    var matkul = result.data.data
    return matkul
  } catch (e) {
    return await errorHandler(e)
  }
}

const importNilai = async (dataNilaiMhs, idPerkuliahan) => {
  try {
    const penilaianURL = PENILAIAN_URL + `/import-nilai/perkuliahan/${idPerkuliahan}`
    const result = await baseHttp.post(penilaianURL, dataNilaiMhs)
    return result.data
  } catch (e) {
    return await errorHandler(e)
  }
}

const updateNilaiAkhir = async (listNilaiFinal, idPerkuliahan) => {
  try {
    const penilaianURL = PENILAIAN_URL + `/update-nilai-akhir/perkuliahan/${idPerkuliahan}`
    const result = await baseHttp.put(penilaianURL, { dataNilaiAkhir: listNilaiFinal })
    return result.data
  } catch (e) {
    return await errorHandler(e)
  }
}

export default {
  getNilaiAkhir,
  getKelas,
  getMatkul,
  importNilai,
  updateNilaiAkhir
}
