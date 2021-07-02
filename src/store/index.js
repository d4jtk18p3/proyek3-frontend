import Vue from "vue"
import Vuex from "vuex"

import authentication from "@/store/modules/authentication"
import theme from "@/store/modules/theme"
import logbook from "@/store/modules/logbook"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authentication,
    theme,
    logbook
  }
})
