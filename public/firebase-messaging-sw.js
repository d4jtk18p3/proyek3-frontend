// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js")
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js")

const firebaseConfig = {
  apiKey: "AIzaSyDNq4rwyBx-ulPwubkWLWC1_KkW7rSWxS4",
  authDomain: "proyek-3-f13ec.firebaseapp.com",
  projectId: "proyek-3-f13ec",
  storageBucket: "proyek-3-f13ec.appspot.com",
  messagingSenderId: "763015414233",
  appId: "1:763015414233:web:b52f07f05b52237eabd9c8",
  measurementId: "G-6LX5FJF523"
}
// eslint-disable-next-line no-undef,no-unused-vars
const app = firebase.initializeApp(firebaseConfig)


app.messaging().onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  )
  // Customize notification here
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png"
  }
  self.registration.showNotification(notificationTitle, notificationOptions)
})
