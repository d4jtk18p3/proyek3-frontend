import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import VCalendar from "v-calendar"
import VueApexCharts from "vue-apexcharts"
import "./registerServiceWorker"
import fcm from "./firebase"

Vue.config.productionTip = false
Vue.use(VueApexCharts)
Vue.use(VCalendar, {
  componentPrefix: "vc" // Use <vc-calendar /> instead of <v-calendar />
})

navigator.serviceWorker
  .register("firebase-messaging-sw.js")
  .then((registration) => {
    fcm.getToken({
      vapidKey: "BBlx-SYFu6oW0BdpFUhg4Km3BXdDGhRFETrpoxWR0IqgJv-T7_xHB2yqm7Lq0K1aGm6Y4wvOFWXruDYXfNYPqeM"
    }).then(r => {

    })
  })

Vue.prototype.$messaging = fcm
Vue.component("apexchart", VueApexCharts)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app")
