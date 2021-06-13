import baseHttp from "./http"
import errorHandler
  from "@/datasource/network/errorHandler"

const MAHASISWA_URL = "/mahasiswa"

const getAllMahasiswaByKelas = async (kodekelas) => {
  try {
    const urlGetMhsByKelas = MAHASISWA_URL + `/searchByKelas/${kodekelas}`
    const listMhs = await baseHttp.get(urlGetMhsByKelas, {}, {})
    return listMhs.data.data
  } catch (err) {
    return await errorHandler(err)
  }
}

export default {
  getAllMahasiswaByKelas
}
