import baseHttp from "./http"
import { PRESENSI_MHS_URL } from "./const"

const getKehadiranMhs = async (kelas, idJadwal, tanggal) => {
  try {
    const statusKehadiranUrl = PRESENSI_MHS_URL + `/kelas-jadwal?kodeKelas=${kelas}&idJadwal=${idJadwal}&tanggal=${tanggal}`
    const result = await baseHttp.get(statusKehadiranUrl)
    return result.data
  } catch (err) {
    console.error(err)
  }
}
const updateKehadiranMhs = async (idStudi, idJadwal, tanggal, isHadir) => {
  try {
    const statusKehadiranUrl = PRESENSI_MHS_URL + `/update-kehadiran?idStudi=${idStudi}&idJadwal=${idJadwal}&tanggal=${tanggal}&isHadir=${isHadir}`
    const result = await baseHttp.put(statusKehadiranUrl)
    return result.data
  } catch (err) {
    console.error(err)
  }
}
export default {
  getKehadiranMhs,
  updateKehadiranMhs
}
