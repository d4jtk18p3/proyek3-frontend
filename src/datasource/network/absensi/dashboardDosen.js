import axios from "axios"
import { PRESENSI_DSN_URL } from "./const"

const persentaseMengajar = async (nip) => {
  try {
    const persentase = PRESENSI_DSN_URL + `/persentase-mengajar-dosen?nip=${nip}`
    const result = await axios.get(persentase, {}, { timeout: 10000 })
    return result.data
  } catch (err) {
    console.error(err)
  }
}

export default {
  persentaseMengajar
}
