import axios from "axios"
import { PENILAIAN_URL } from "./const"
import errorHandler from "@/datasource/network/errorHandler"

const getNilaiAkhirMhs = async (nim) => {
  try {
    const penilaianURL = PENILAIAN_URL + `/get-all-nilai-akhir/mahasiswa/${nim}`
    const result = await axios.get(penilaianURL)
    var dataMhs = result.data.data
    return dataMhs
  } catch (e) {
    return await errorHandler(e)
  }
}

export default {
  getNilaiAkhirMhs
}
