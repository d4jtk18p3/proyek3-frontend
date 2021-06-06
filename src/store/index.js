import Vue from "vue"
import Vuex from "vuex"
import theme from "@/store/modules/theme"
import logbook from "@/store/modules/logbook"
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    theme,
    logbook
  }
})
