import { PENILAIAN_API_URL } from "../../../config"

const BASE_URL = PENILAIAN_API_URL

const PENILAIAN_URL = new URL("/penilaian", BASE_URL).href
const PENILAIANDOSEN_URL = new URL("/dosen", BASE_URL).href

export {
  BASE_URL,
  PENILAIAN_URL,
  PENILAIANDOSEN_URL
}
