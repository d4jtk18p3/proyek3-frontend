import axios from "axios"
import errorHandler
  from "@/datasource/network/errorHandler"
import { AKUN_API_URL } from "../../../config"

const NETWORK_TIMEOUT = 10000
export const createOneAccount = async (noInduk, jenisNoInduk, nama, email, role) => {
  try {
    const result = await axios.post(new URL("/user/create", AKUN_API_URL).href, {
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
