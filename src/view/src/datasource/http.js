import axios from "axios"

const NETWORK_TIMEOUT = 10000
const AUTH_URL = "http://127.0.0.1:8080/"
const instance = axios.create({
  baseURL: AUTH_URL,
  withCredentials: true,
  timeout: NETWORK_TIMEOUT
})

export default instance
