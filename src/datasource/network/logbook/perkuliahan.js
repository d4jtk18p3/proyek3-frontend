import axios from "axios"
import { PERKULIAHAN_URL } from "./const"

const getAllPerkuliahanyangDiampuDosen = async (nip) => {
  try {
    const urlGetPerkuliahan = PERKULIAHAN_URL + `/searchPerkuliahanDiampu/${nip}`
    const perkuliahan = await axios.get(urlGetPerkuliahan, {}, {})
    return perkuliahan.data.data
  } catch (err) {
    console.error(err)
  }
}

export default {
  getAllPerkuliahanyangDiampuDosen
}
