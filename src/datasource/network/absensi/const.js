import { ABSENSI_API_URL } from "../../../config"

const JADWAL_URL = new URL(`${ABSENSI_API_URL}/api/jadwal-perkuliahan`).href
const JADWAL_DOSEN_URL = new URL(`${ABSENSI_API_URL}/api/jadwal-perkuliahan`).href
const KETERANGAN_URL = new URL(`${ABSENSI_API_URL}/api/keterangan`).href
const PRESENSI_MHS_URL = new URL(`${ABSENSI_API_URL}/api/daftar-hadir-mahasiswa`).href
const PRESENSI_DSN_URL = new URL(`${ABSENSI_API_URL}/api/daftar-hadir-dosen`).href

export {
  JADWAL_URL,
  JADWAL_DOSEN_URL,
  KETERANGAN_URL,
  PRESENSI_MHS_URL,
  PRESENSI_DSN_URL
}
