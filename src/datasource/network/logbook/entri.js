import baseHttp from "./http"
import errorHandler
  from "@/datasource/network/errorHandler"

const LOGBOOKENTRI_URL = "logbook/entri"

const getAllEntryLogbookMhsByid = async (idLogbooks) => {
  try {
    var logbooks = []
    var i = 0
    const ids = idLogbooks
    while (i < idLogbooks.length) {
      var urlGetLogbook = LOGBOOKENTRI_URL + `/${ids[i]}`
      var logbook = await baseHttp.get(urlGetLogbook, {}, {})
      var rawDate = new Date(logbook.data.entri[0].tanggal)
      var date = rawDate.getDate() + "-" + (rawDate.getMonth() + 1) + "-" + rawDate.getFullYear()
      logbooks[i] = {
        id: logbook.data.entri[0]._id,
        nomor: i + 1,
        tanggal: date,
        kegiatan: logbook.data.entri[0].kegiatan,
        hasil: logbook.data.entri[0].hasil,
        kesan: logbook.data.entri[0].kesan
      }
      i++
    }
    return logbooks
  } catch (err) {
    return await errorHandler(err)
  }
}

const getOneEntryLogbookMhsByid = async (idEntriLogbook) => {
  try {
    var urlGetLogbook = LOGBOOKENTRI_URL + `/${idEntriLogbook}`
    var logbook = await baseHttp.get(urlGetLogbook, {}, {})
    var rawDate = new Date(logbook.data.entri[0].tanggal)
    var date = rawDate.getDate() + "-" + (rawDate.getMonth() + 1) + "-" + rawDate.getFullYear()
    var logbooks = {
      id: logbook.data.entri[0]._id,
      tanggal: date,
      kegiatan: logbook.data.entri[0].kegiatan,
      hasil: logbook.data.entri[0].hasil,
      kesan: logbook.data.entri[0].kesan
    }
    return logbooks
  } catch (err) {
    return await errorHandler(err)
  }
}

const addEntryLogbookMhs = async (nim, dataLogbook) => {
  try {
    var urlAddLogbook = LOGBOOKENTRI_URL + `/create/${nim}`
    var result = await baseHttp.post(urlAddLogbook, {
      tanggal: dataLogbook.tanggal,
      kegiatan: dataLogbook.kegiatan,
      hasil: dataLogbook.hasil,
      kesan: dataLogbook.kesan
    }, {})
    return result
  } catch (err) {
    return err.response.data
  }
}

const editEntryLogbookMhs = async (idLogbooks, idEntriLogbook, newDataLogbook) => {
  try {
    var urlEditLogbook = LOGBOOKENTRI_URL + `/update/${idLogbooks}?id=${idEntriLogbook}`
    var result = await baseHttp.put(urlEditLogbook, {
      tanggal: newDataLogbook.tanggal,
      kegiatan: newDataLogbook.kegiatan,
      hasil: newDataLogbook.hasil,
      kesan: newDataLogbook.kesan
    }, {})

    return result
  } catch (err) {
    return err.response.data
  }
}

const deleteEntryLogbookMhs = async (idLogbooks, idEntriLogbook) => {
  try {
    var urlDeleteLogbook = LOGBOOKENTRI_URL + `/delete/${idLogbooks}?id=${idEntriLogbook}`
    var result = await baseHttp.delete(urlDeleteLogbook)

    return result
  } catch (err) {
    return await errorHandler(err)
  }
}

export default {
  getAllEntryLogbookMhsByid,
  getOneEntryLogbookMhsByid,
  addEntryLogbookMhs,
  editEntryLogbookMhs,
  deleteEntryLogbookMhs
}
