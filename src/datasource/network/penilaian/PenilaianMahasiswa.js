import baseHttp from "./http"
import errorHandler from "@/datasource/network/errorHandler"

const PENILAIAN_URL = "/penilaian"

const getNilaiAkhirMhs = async (nim) => {
  try {
    const penilaianURL = PENILAIAN_URL + `/get-all-nilai-akhir/mahasiswa/${nim}`
    const result = await baseHttp.get(penilaianURL)
    var dataMhs = result.data.data
    return dataMhs
  } catch (e) {
    return await errorHandler(e)
  }
}

export default {
  getNilaiAkhirMhs
}
