import baseHttp from "./http"
import errorHandler
  from "@/datasource/network/errorHandler"

const MATAKULIAH_URL = "/mata-kuliah"

const getAllMataKuliahProyekyangDiampuDosen = async (nip) => {
  try {
    const urlGetMatkulProyek = MATAKULIAH_URL + `/searchMatkul/${nip}`
    const mataKuliahProyek = await baseHttp.get(urlGetMatkulProyek, {}, {})
    return mataKuliahProyek.data.data
  } catch (err) {
    return await errorHandler(err)
  }
}

const getLastProyek = async (nim) => {
  try {
    const urlGetLastProyek = MATAKULIAH_URL + `/searchLastProyek/${nim}`
    const mataKuliahProyek = await baseHttp.get(urlGetLastProyek, {}, {})
    return mataKuliahProyek.data.data
  } catch (err) {
    return await errorHandler(err)
  }
}

export default {
  getAllMataKuliahProyekyangDiampuDosen,
  getLastProyek
}
