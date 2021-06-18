import baseHttp from "./http"
import errorHandler
  from "@/datasource/network/errorHandler"
import entri from "./entri"

const LOGBOOKS_URL = "/logbook/logbook"

const getAllEntriLogbooksMhsByNIM = async (nim) => {
  try {
    const urlGetIdLogbooks = LOGBOOKS_URL + `/${nim}`
    const idLogbooks = await baseHttp.get(urlGetIdLogbooks, {}, {})
    console.log(idLogbooks.data.logbook[0].entri)
    return await entri.getAllEntryLogbookMhsByid(idLogbooks.data.logbook[0].entri)
  } catch (err) {
    return await errorHandler(err)
  }
}

const getLogbooksMhsByNIM = async (nim) => {
  try {
    const urlGetIdLogbooks = LOGBOOKS_URL + `/${nim}`
    const idLogbooks = await baseHttp.get(urlGetIdLogbooks, {}, {})
    return idLogbooks.data.logbook[0]
  } catch (err) {
    return await errorHandler(err)
  }
}

const getIdLogbooksMhsByNIM = async (nim) => {
  try {
    const urlGetIdLogbooks = LOGBOOKS_URL + `/${nim}`
    const idLogbooks = await baseHttp.get(urlGetIdLogbooks, {}, {})
    console.log(idLogbooks.data.logbook[0]._id)
    return idLogbooks.data.logbook[0]._id
  } catch (err) {
    return await errorHandler(err)
  }
}

const addLogbooksMhs = async (dataMhs) => {
  try {
    const urlAddLogbooks = LOGBOOKS_URL + `/create`
    const result = await baseHttp.post(urlAddLogbooks, {
      nama: dataMhs.nama,
      nim: dataMhs.nim,
      kode_kelas: dataMhs.kode_kelas,
      kelas_proyek: dataMhs.kelas_proyek
    }, {})
    console.log(result.data)
    return result.data
  } catch (err) {
    return await errorHandler(err)
  }
}

export default {
  getAllEntriLogbooksMhsByNIM,
  getLogbooksMhsByNIM,
  getIdLogbooksMhsByNIM,
  addLogbooksMhs
}
