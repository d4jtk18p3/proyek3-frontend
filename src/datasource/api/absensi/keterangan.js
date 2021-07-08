import axios from "axios"
import { KETERANGAN_URL } from "../const"

const uploadKeterangan = async (data) => {
  try {
    const keteranganUrl = KETERANGAN_URL + "/upload/surat-izin"
    const result = await axios.post(keteranganUrl, data)
    return result.data
  } catch (err) {
    console.error(err)
  }
}
const getKeterangan = async (kelas) => {
  try {
    const keteranganUrl = KETERANGAN_URL + `/mhs-kelas-izin?KodeKelas=${kelas}`
    const result = await axios.get(keteranganUrl)
    return result.data
  } catch (err) {
    console.error(err)
  }
}

export default {
  uploadKeterangan,
  getKeterangan
}
