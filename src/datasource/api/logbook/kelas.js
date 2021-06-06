import axios from "axios"
import { KELAS_URL } from "../const"

const getAllKelasByMatkul = async (nip, idMatkul) => {
  try {
    const urlGetKelasByMatkul = KELAS_URL + `/getKelas/${nip}?id_mata_kuliah=${idMatkul}`
    const kelas = await axios.get(urlGetKelasByMatkul, {}, {})
    return kelas.data.data
  } catch (err) {
    console.error(err)
  }
}

export default {
  getAllKelasByMatkul
}
