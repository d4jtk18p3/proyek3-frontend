import Vue from "vue"
import Vuex from "vuex"
import theme from "@/store/modules/theme"
import datePickerModule from "@/store/modules/datepicker"
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    theme,
    datePickerModule
  }
})
