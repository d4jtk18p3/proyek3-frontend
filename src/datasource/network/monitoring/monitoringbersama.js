import baseHttp from "./http"
import errorHandler
  from "@/datasource/network/errorHandler"
const MONITORING_URL = "/monitoring"

const getidperkuliahan = async (nim, id) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/getPerkuliahanBynimByIdMatkul?nim=${nim}&id_mata_kuliah=${id}`
    const result = await baseHttp.get(monitoringURL)
    return result.data.data.perkuliahan[0].id
  } catch (e) {
    return await errorHandler(e)
  }
}

const getAllTugasMahasiswaByidtugas = async (idTugas) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/getAllTugasMahasiswaByid_tugas/${idTugas}`
    const result = await baseHttp.get(monitoringURL)
    var tugas = []
    var i = 0
    while (i < result.data.data.mahasiswa.length) {
      var data = await getSubTugasbyMahasiswa(idTugas, result.data.data.mahasiswa[i].nim)
      tugas.push({
        Mahasiswa: result.data.data.mahasiswa[i].nim,
        items: data
      })
      i++
    }
    return tugas
  } catch (e) {
    return await errorHandler(e)
  }
}

const getSubTugasbyMahasiswa = async (idTugas, nim) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/getSubtugasbyMahasiswa/${idTugas}/${nim}`
    const result = await baseHttp.get(monitoringURL)
    return result.data.data.uniqueSubtugas
  } catch (e) {
    return await errorHandler(e)
  }
}

export default {
  getAllTugasMahasiswaByidtugas,
  getSubTugasbyMahasiswa,
  getidperkuliahan
}
