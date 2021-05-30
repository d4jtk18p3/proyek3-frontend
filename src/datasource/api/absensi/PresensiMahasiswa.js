import axios from "axios"
import { PRESENSI_MHS_URL } from "../const"

const presensiMahasiswa = async (idStudi, idJadwal) => {
  try {
    const presensiUrl = PRESENSI_MHS_URL + `/mhs-kehadiran?idStudi=${idStudi}&idJadwal=${idJadwal}`
    const result = await axios.post(presensiUrl)
    return result.data
  } catch (err) {
    console.error(err)
  }
}

export default {
  presensiMahasiswa
}
