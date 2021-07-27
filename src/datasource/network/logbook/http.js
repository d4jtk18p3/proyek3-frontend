import axios from "axios"

const NETWORK_TIMEOUT = 10000
const AUTH_URL = process.env.VUE_APP_LOGBOOK_API_URL
const instance = axios.create({
  baseURL: AUTH_URL,
  timeout: NETWORK_TIMEOUT
})

export default instance
