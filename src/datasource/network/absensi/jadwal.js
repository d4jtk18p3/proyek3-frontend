import axios from "axios"
import { JADWAL_URL } from "./const"

const getJadwalMahasiswa = async (hari, nim) => {
  try {
    const jadwalMhs = JADWAL_URL + `/mahasiswa?hari=${hari}&nim=${nim}`
    const result = await axios.get(jadwalMhs, {}, { timeout: 10000 })
    return result.data
  } catch (err) {
    console.error(err)
  }
}

export default {
  getJadwalMahasiswa
}
