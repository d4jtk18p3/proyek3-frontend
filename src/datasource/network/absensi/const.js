import { ABSENSI_API_URL } from "../../../config"

const JADWAL_URL = new URL("/api/jadwal-perkuliahan", ABSENSI_API_URL).href
const JADWAL_DOSEN_URL = new URL("/api/jadwal-perkuliahan", ABSENSI_API_URL).href
const KETERANGAN_URL = new URL("/api/keterangan", ABSENSI_API_URL).href
const PRESENSI_MHS_URL = new URL("/api/daftar-hadir-mahasiswa", ABSENSI_API_URL).href
const PRESENSI_DSN_URL = new URL("/api/daftar-hadir-dosen", ABSENSI_API_URL).href

export {
  JADWAL_URL,
  JADWAL_DOSEN_URL,
  KETERANGAN_URL,
  PRESENSI_MHS_URL,
  PRESENSI_DSN_URL
}
