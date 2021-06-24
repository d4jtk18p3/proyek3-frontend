import axios from "axios"
import { PERKULIAHAN_DOSEN } from "../const"

const getKehadiranMhs = async (kelas, idJadwal, tanggal) => {
  try {
    const statusKehadiranUrl = PERKULIAHAN_DOSEN + `/kelas-jadwal?kodeKelas=${kelas}&idJadwal=${idJadwal}&tanggal=${tanggal}`
    const result = await axios.get(statusKehadiranUrl)
    return result.data
  } catch (err) {
    console.error(err)
  }
}
const updateKehadiranMhs = async (idStudi, idJadwal, tanggal, isHadir) => {
  try {
    const statusKehadiranUrl = PERKULIAHAN_DOSEN + `/update-kehadiran?idStudi=${idStudi}&idJadwal=${idJadwal}&tanggal=${tanggal}&isHadir=${isHadir}`
    const result = await axios.put(statusKehadiranUrl)
    return result.data
  } catch (err) {
    console.error(err)
  }
}
export default {
  getKehadiranMhs,
  updateKehadiranMhs
}
