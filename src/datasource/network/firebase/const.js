import { NOTIFICATION_API_URL } from "../../../config"

const NETWORK_TIMEOUT = 10000
const BASE_URL = NOTIFICATION_API_URL
const GRUP_URL = new URL(`${NOTIFICATION_API_URL}/grup`).href
const USER_DEVICE_URL = new URL(`${NOTIFICATION_API_URL}/user-device`).href
const EMAIL_NOTIF_URL = new URL(`${NOTIFICATION_API_URL}/email-notif`).href
const USER_URL = new URL(`${NOTIFICATION_API_URL}/user`).href

export {
  NETWORK_TIMEOUT,
  BASE_URL,
  GRUP_URL,
  USER_DEVICE_URL,
  EMAIL_NOTIF_URL,
  USER_URL
}
