import axios from "axios"
import { PRESENSI_DSN_URL } from "../const"

const presensiDosen = async (nip, idStudi, idJadwal) => {
  try {
    const presensiUrl = PRESENSI_DSN_URL + `/presensi-dosen?nip=${nip}&idStudi=${idStudi}&idJadwal=${idJadwal}`
    const result = await axios.put(presensiUrl)
    return result.data
  } catch (err) {
    console.error(err)
  }
}

export default {
  presensiDosen
}
