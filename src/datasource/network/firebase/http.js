import axios from "axios"
import * as cons from "./const"

const instance = axios.create({
  baseURL: cons.BASE_URL,
  timeout: cons.NETWORK_TIMEOUT
})

export default instance
