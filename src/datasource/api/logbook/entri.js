import axios from "axios"
import { LOGBOOKENTRI_URL } from "../const"

const getAllEntryLogbookMhsByid = async (idLogbooks) => {
  try {
    var logbooks = []
    var i = 0
    const ids = idLogbooks
    while (i < idLogbooks.length) {
      var urlGetLogbook = LOGBOOKENTRI_URL + `/${ids[i]}`
      var logbook = await axios.get(urlGetLogbook, {}, {})
      console.log(logbook.data.entri[0])
      var rawDate = new Date(logbook.data.entri[0].tanggal)
      var date = rawDate.getDate() + "-" + (rawDate.getMonth() + 1) + "-" + rawDate.getFullYear()
      logbooks[i] = {
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
    console.error(err)
  }
}

const addEntryLogbookMhs = async (idLogbook, dataLogbook) => {
  try {
    var urlAddLogbook = LOGBOOKENTRI_URL + `create/${idLogbook}`
    var result = await axios.post(urlAddLogbook, {
      tanggal: dataLogbook.tanggal,
      kegiatan: dataLogbook.kegiatan,
      hasil: dataLogbook.hasil,
      kesan: dataLogbook.kesan
    }, {})

    return result.data
  } catch (err) {
    console.error(err)
  }
}

const editEntryLogbookMhs = async (idEntriLogbook, newDataLogbook) => {
  try {
    var urlEditLogbook = LOGBOOKENTRI_URL + `update/${idEntriLogbook}`
    var result = await axios.put(urlEditLogbook, {
      tanggal: newDataLogbook.tanggal,
      kegiatan: newDataLogbook.kegiatan,
      hasil: newDataLogbook.hasil,
      kesan: newDataLogbook.kesan
    }, {})

    return result.data
  } catch (err) {
    console.error(err)
  }
}

const deleteEntryLogbookMhs = async (idEntriLogbook) => {
  try {
    var urlDeleteLogbook = LOGBOOKENTRI_URL + `delete/${idEntriLogbook}`
    var result = await axios.delete(urlDeleteLogbook, {})

    return result.data
  } catch (err) {
    console.error(err)
  }
}

export default {
  getAllEntryLogbookMhsByid,
  addEntryLogbookMhs,
  editEntryLogbookMhs,
  deleteEntryLogbookMhs
}
