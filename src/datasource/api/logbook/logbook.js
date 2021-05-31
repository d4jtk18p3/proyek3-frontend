import axios from "axios"
import { LOGBOOKS_URL } from "../const"
import entri from "../logbook/entri"

const getLogbooksMhsByNIM = async (nim) => {
  try {
    const urlGetIdLogbooks = LOGBOOKS_URL + `/${nim}`
    const idLogbooks = await axios.get(urlGetIdLogbooks, {}, {})
    console.log(idLogbooks.data.logbook[0].entri)
    return await entri.getAllEntryLogbookMhsByid(idLogbooks.data.logbook[0].entri)
  } catch (err) {
    console.error(err)
  }
}

const getIdLogbooksMhsByNIM = async (nim) => {
  try {
    const urlGetIdLogbooks = LOGBOOKS_URL + `/${nim}`
    const idLogbooks = await axios.get(urlGetIdLogbooks, {}, {})
    console.log(idLogbooks.data.logbook[0]._id)
    return idLogbooks.data.logbook[0]._id
  } catch (err) {
    console.error(err)
  }
}

const addLogbooksMhs = async (dataMhs) => {
  try {
    const urlAddLogbooks = LOGBOOKS_URL + `/create`
    const result = await axios.post(urlAddLogbooks, {
      nama: dataMhs.nama,
      nim: dataMhs.nim,
      kode_kelas: dataMhs.kode_kelas,
      kelas_proyek: dataMhs.kelas_proyek
    }, {})
    console.log(result.data)
    return result.data
  } catch (err) {
    console.error(err)
  }
}

export default {
  getLogbooksMhsByNIM,
  getIdLogbooksMhsByNIM,
  addLogbooksMhs
}
