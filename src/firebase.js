
import firebase from "firebase/app"
import "firebase/messaging"

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

export default app.messaging()
