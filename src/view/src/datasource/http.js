import axios from "axios"

const NETWORK_TIMEOUT = 10000

const instance = axios.create({
  baseURL: process.env.VUE_APP_SERVER_BASE_URL,
  withCredentials: true,
  timeout: NETWORK_TIMEOUT
})

export default instance
