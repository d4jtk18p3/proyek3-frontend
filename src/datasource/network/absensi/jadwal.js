import baseHttp from "./http"
import { JADWAL_URL } from "./const"

const getJadwalMahasiswa = async (hari, nim) => {
  try {
    const jadwalMhs = JADWAL_URL + `/mahasiswa?hari=${hari}&nim=${nim}`
    const result = await baseHttp.get(jadwalMhs, {}, {})
    return result.data
  } catch (err) {
    console.error(err)
  }
}

export default {
  getJadwalMahasiswa
}
