import baseHttp from "./http"
import errorHandler
  from "@/datasource/network/errorHandler"

const MONITORING_URL = "/monitoring"

const getAllTugas = async (nim) => {
  try {
    const monitoringURL = MONITORING_URL + `/common/getAllTugasMahasiswa/${nim}`
    const result = await baseHttp.get(monitoringURL)
    return result.data.data.tugas
  } catch (e) {
    return await errorHandler(e)
  }
}

export default {
  getAllTugas
}
