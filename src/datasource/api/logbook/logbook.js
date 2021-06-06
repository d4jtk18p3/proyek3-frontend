import axios from "axios"
import { LOGBOOKS_URL } from "../const"
import entri from "../logbook/entri"

const getAllEntriLogbooksMhsByNIM = async (nim) => {
  try {
    const urlGetIdLogbooks = LOGBOOKS_URL + `/${nim}`
    const idLogbooks = await axios.get(urlGetIdLogbooks, {}, {})
    return await entri.getAllEntryLogbookMhsByid(idLogbooks.data.logbook[0].entri)
  } catch (err) {
    console.error(err)
  }
}

const getLogbooksMhsByNIM = async (nim) => {
  try {
    const urlGetIdLogbooks = LOGBOOKS_URL + `/${nim}`
    const idLogbooks = await axios.get(urlGetIdLogbooks, {}, {})
    return idLogbooks.data.logbook[0]
  } catch (err) {
    console.error(err)
  }
}

export default {
  getAllEntriLogbooksMhsByNIM,
  getLogbooksMhsByNIM
}
