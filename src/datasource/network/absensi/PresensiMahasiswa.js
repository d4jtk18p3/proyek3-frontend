import axios from "axios"
import { PRESENSI_MHS_URL } from "./const"

const presensiMahasiswa = async (idStudi, idJadwal, nim) => {
  try {
    const presensiUrl = PRESENSI_MHS_URL + `/presensi?idStudi=${idStudi}&idJadwal=${idJadwal}&nim=${nim}`
    const result = await axios.put(presensiUrl)
    return result.data
  } catch (err) {
    console.error(err)
  }
}
const getStatusKehadiran = async (nim, idJadwal, tanggal) => {
  try {
    const statusKehadiranUrl = PRESENSI_MHS_URL + `/nim-jadwal-tgl?nim=${nim}&idJadwal=${idJadwal}&tanggal=${tanggal}`
    const result = await axios.get(statusKehadiranUrl)
    return result.data
  } catch (err) {
    console.error(err)
  }
}
const getDashboard = async (nim) => {
  try {
    const dashboardUrl = PRESENSI_MHS_URL + `/dashboard?nim=${nim}`
    const result = await axios.get(dashboardUrl)
    return result.data
  } catch (err) {
    console.error(err)
  }
}

export default {
  presensiMahasiswa,
  getStatusKehadiran,
  getDashboard
}
