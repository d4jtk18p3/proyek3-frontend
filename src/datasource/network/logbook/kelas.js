import baseHttp from "./http"
import errorHandler
  from "@/datasource/network/errorHandler"

const KELAS_URL = "/kelas"

const getAllKelasByMatkul = async (nip, idMatkul) => {
  try {
    const urlGetKelasByMatkul = KELAS_URL + `/getKelas/${nip}?id_mata_kuliah=${idMatkul}`
    const kelas = await baseHttp.get(urlGetKelasByMatkul, {}, {})
    return kelas.data.data
  } catch (err) {
    return await errorHandler(err)
  }
}

export default {
  getAllKelasByMatkul
}
