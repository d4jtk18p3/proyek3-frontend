import baseHttp from "./http"
import errorHandler
  from "@/datasource/network/errorHandler"

const PERKULIAHAN_URL = "/perkuliahan"

const getAllPerkuliahanyangDiampuDosen = async (nip) => {
  try {
    const urlGetPerkuliahan = PERKULIAHAN_URL + `/searchPerkuliahanDiampu/${nip}`
    const perkuliahan = await baseHttp.get(urlGetPerkuliahan, {}, {})
    return perkuliahan.data.data
  } catch (err) {
    return await errorHandler(err)
  }
}

export default {
  getAllPerkuliahanyangDiampuDosen
}
