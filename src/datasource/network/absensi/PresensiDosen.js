import baseHttp from "./http"
import { PRESENSI_DSN_URL } from "./const"

const presensiDosen = async (nip, idStudi, idJadwal) => {
  try {
    const presensiUrl = PRESENSI_DSN_URL + `/presensi-dosen?nip=${nip}&idStudi=${idStudi}&idJadwal=${idJadwal}`
    const result = await baseHttp.put(presensiUrl)
    return result.data
  } catch (err) {
    console.error(err)
  }
}

const getStatusKehadiran = async (nip, idJadwal, tanggal) => {
  try {
    const statusKehadiranUrl = PRESENSI_DSN_URL + `/nip-jadwal-tgl?nip=${nip}&idJadwal=${idJadwal}&tanggal=${tanggal}`
    const result = await baseHttp.get(statusKehadiranUrl)
    return result.data
  } catch (err) {
    console.error(err)
  }
}

export default {
  presensiDosen,
  getStatusKehadiran
}
