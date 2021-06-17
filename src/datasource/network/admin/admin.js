import axios from "axios"
import errorHandler
  from "@/datasource/network/errorHandler"

const NETWORK_TIMEOUT = 10000
const BASE_URL = "http://localhost:5001"
export default async (noInduk, jenisNoInduk, nama, email, role) => {
  try {
    const result = await axios.post(BASE_URL + "/user/create", {
      noInduk: noInduk,
      jenisNoInduk: jenisNoInduk.toLowerCase(),
      nama: nama,
      email: email,
      role: role.toLowerCase()
    },
    {
      timeout: NETWORK_TIMEOUT
    })
    return result.data
  } catch (e) {
    return await errorHandler(e)
  }
}
