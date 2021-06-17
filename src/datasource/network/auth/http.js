import axios from "axios"

const NETWORK_TIMEOUT = 10000
const AUTH_URL = "http://localhost:5001/"
const instance = axios.create({
  baseURL: AUTH_URL,
  timeout: NETWORK_TIMEOUT
})

export default instance
