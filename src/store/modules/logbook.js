const LogbookModule = {
  namespaced: true,
  state: () => ({
    picker: null
  }),
  mutations: {
    SET_DATE_PICKER_VALUE (state, picker) {
      state.picker = picker
    }
  },
  getters: {
    getDatePickerValue (state) {
      return state.picker
    }
  },
  actions: {
    setDatePickerValue ({ commit }, picker) {
      commit("SET_DATE_PICKER_VALUE", picker)
    }
  }
}

export default LogbookModule
