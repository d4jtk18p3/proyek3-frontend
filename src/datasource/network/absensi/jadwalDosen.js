import baseHttp from "./http"
import { JADWAL_DOSEN_URL } from "./const"

const getJadwalDosen = async (hari, nip) => {
  try {
    const jadwalDsn = JADWAL_DOSEN_URL + `/dosen?hari=${hari}&nip=${nip}`
    const result = await baseHttp.get(jadwalDsn, {}, { timeout: 10000 })
    return result.data
  } catch (err) {
    console.error(err)
  }
}

export default {
  getJadwalDosen
}
