import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import VCalendar from "v-calendar"
import VueApexCharts from "vue-apexcharts"

Vue.config.productionTip = false
Vue.use(VueApexCharts)
Vue.use(VCalendar, {
  componentPrefix: "vc" // Use <vc-calendar /> instead of <v-calendar />
})

Vue.component("apexchart", VueApexCharts)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app")
