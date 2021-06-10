import axios from "axios"
import { MATAKULIAH_URL } from "../const"

const getAllMataKuliahProyekyangDiampuDosen = async (nip) => {
  try {
    const urlGetMatkulProyek = MATAKULIAH_URL + `/searchMatkul/${nip}`
    const mataKuliahProyek = await axios.get(urlGetMatkulProyek, {}, {})
    return mataKuliahProyek.data.data
  } catch (err) {
    console.error(err)
  }
}

export default {
  getAllMataKuliahProyekyangDiampuDosen
}
