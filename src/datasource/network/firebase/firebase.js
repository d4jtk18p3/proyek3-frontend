import firebase from "firebase/app"
import "firebase/messaging"
// import baseHttp from "./http"
// import * as cons from "./const"
// import errorHandler from "@/datasource/network/errorHandler"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUNbtdVSfD2u415DuVS-GfVJgrUvI6r2o",
  authDomain: "proyek3-95653.firebaseapp.com",
  projectId: "proyek3-95653",
  storageBucket: "proyek3-95653.appspot.com",
  messagingSenderId: "36527050254",
  appId: "1:36527050254:web:1310000ff7da21ff3f765f",
  measurementId: "G-W00X0L1895"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// async function getToken () {
//   const messaging = firebase.messaging()
//   // [START messaging_get_token]
//   // Get registration token. Initially this makes a network call, once retrieved
//   // subsequent calls to getToken will return from cache.
//   try {
//     const currentToken = await messaging.getToken({
//       vapidKey:
//         "BMh6uwr13K0J7XDLRbtFjC9Dwg_YVTv_QDzo-LiZPEglYUuSyg268yOle1XNLGTgc04df9YPqMkH6swoMRCtGJo"
//     })
//     return currentToken
//   } catch (error) {
//     return await errorHandler(error)
//   }
//   // [END messaging_get_token]
// }

// async function loginNotif (idUser, email) {
//   try {
//     const currentToken = await getToken()

//     await baseHttp.post(
//       cons.USER_URL + "/",
//       {
//         idUser,
//         email
//       },
//       { timeout: cons.NETWORK_TIMEOUT }
//     )

//     // simpan token ke tabel, User_Device
//     const saveToUserDevice = await baseHttp.post(
//       cons.USER_DEVICE_URL + "/create",
//       {
//         user_id: idUser,
//         token: currentToken
//       },
//       { timeout: cons.NETWORK_TIMEOUT }
//     )

//     return saveToUserDevice.data
//   } catch (error) {
//     return await errorHandler(error)
//   }
// }

// function receiveMessage () {
//   const messaging = firebase.messaging()
//   // [START messaging_receive_message]
//   // Handle incoming messages. Called when:
//   // - a message is received while the app has focus
//   // - the user clicks on an app notification created by a service worker
//   //   `messaging.onBackgroundMessage` handler.
//   messaging.onMessage(payload => {
//     console.log("Message received. ", payload)
//     // ...
//   })
//   // [END messaging_receive_message]
// }

// function requestPermission () {
//   // [START messaging_request_permission]
//   Notification.requestPermission().then(permission => {
//     if (permission === "granted") {
//       console.log("Notification permission granted.")
//       // TODO(developer): Retrieve a registration token for use with FCM.
//       // ...
//     } else {
//       console.log("Unable to get permission to notify.")
//     }
//   })
//   // [END messaging_request_permission]
// }

// function deleteToken () {
//   const messaging = firebase.messaging()

//   // [START messaging_delete_token]
//   messaging
//     .deleteToken()
//     .then(() => {
//       console.log("Token deleted.")
//       // ...
//     })
//     .catch(err => {
//       console.log("Unable to delete token. ", err)
//     })
//   // [END messaging_delete_token]
// }
