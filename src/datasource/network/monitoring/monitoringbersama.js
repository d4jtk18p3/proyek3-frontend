import baseHttp from "./http"
import errorHandler
  from "@/datasource/network/errorHandler"

const MONITORING_URL = "/monitoring"

const getAllTugasMahasiswaByidtugas = async (idTugas) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/getAllTugasMahasiswaByid_tugas/${idTugas}`
    const result = await baseHttp.get(monitoringURL)
    var tugas = []
    var i = 0
    while (i < result.data.data.mahasiswa.length) {
      // console.log(result.data.data.mahasiswa[i].nim)
      var data = await getSubTugasbyMahasiswa(idTugas, result.data.data.mahasiswa[i].nim)
      tugas.push({
        Mahasiswa: result.data.data.mahasiswa[i].nim,
        items: data
      })
      i++
    }
    // console.log(tugas)
    return tugas
  } catch (e) {
    return await errorHandler(e)
  }
}

const getSubTugasbyMahasiswa = async (idTugas, nim) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/getSubtugasbyMahasiswa/${idTugas}/${nim}`
    const result = await baseHttp.get(monitoringURL)
    // console.log(result.data.data.uniqueSubtugas)
    return result.data.data.uniqueSubtugas
  } catch (e) {
    return await errorHandler(e)
  }
}

export default {
  getAllTugasMahasiswaByidtugas,
  getSubTugasbyMahasiswa
}
