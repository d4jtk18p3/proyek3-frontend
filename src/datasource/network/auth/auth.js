import baseHttp from "./http"
import errorHandler
  from "@/datasource/network/errorHandler"
export const requestResetPasswordEmail = async (email) => {
  try {
    const result = await baseHttp.post("user/forget-password", {
      email: email
    })
    return result.data
  } catch (e) {
    return await errorHandler(e)
  }
}

export const resetPassword = async (token, newPassword, newHint) => {
  try {
    const result = await baseHttp.post("user/reset-password", {
      token: token,
      newPassword: newPassword,
      hint: newHint
    })
    return result.data
  } catch (e) {
    return await errorHandler(e)
  }
}
