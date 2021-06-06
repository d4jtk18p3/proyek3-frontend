import axios from "axios"
import { MAHASISWA_URL } from "../const"

const getAllMahasiswaByKelas = async (kodekelas) => {
  try {
    const urlGetMhsByKelas = MAHASISWA_URL + `/searchByKelas/${kodekelas}`
    const listMhs = await axios.get(urlGetMhsByKelas, {}, {})
    return listMhs.data.data
  } catch (err) {
    console.error(err)
  }
}

export default {
  getAllMahasiswaByKelas
}
