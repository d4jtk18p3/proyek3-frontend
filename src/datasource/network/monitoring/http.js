import axios from "axios"

const NETWORK_TIMEOUT = 10000
const AUTH_URL = process.env.VUE_APP_MONITORING_API_URL
const instance = axios.create({
  baseURL: AUTH_URL,
  timeout: NETWORK_TIMEOUT
})

export default instance
