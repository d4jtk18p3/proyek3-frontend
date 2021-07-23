import baseHttp from "./http"
import { KETERANGAN_URL } from "./const"

const uploadKeterangan = async (data) => {
  try {
    const keteranganUrl = KETERANGAN_URL + "/upload/surat-izin"
    const result = await baseHttp.post(keteranganUrl, data)
    return result.data
  } catch (err) {
    console.error(err)
  }
}
const getKeterangan = async (kelas) => {
  try {
    const keteranganUrl = KETERANGAN_URL + `/mhs-kelas-izin?KodeKelas=${kelas}`
    const result = await baseHttp.get(keteranganUrl)
    return result.data
  } catch (err) {
    console.error(err)
  }
}
const updateKeterangan = async (idKet, isAccept) => {
  try {
    const keteranganUrl = KETERANGAN_URL + `/validasi-ketidakhadiran?idKeterangan=${idKet}&isAccepted=${isAccept}`
    const result = await baseHttp.put(keteranganUrl)
    return result.data
  } catch (err) {
    console.error(err)
  }
}
export default {
  uploadKeterangan,
  getKeterangan,
  updateKeterangan
}
