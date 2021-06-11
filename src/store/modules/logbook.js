const LogbookModule = {
  namespaced: true,
  state: () => ({
    nip: null,
    picker: null
  }),
  mutations: {
    SET_NIP (state, nip) {
      state.nip = nip
    },
    SET_DATE_PICKER_VALUE (state, picker) {
      state.picker = picker
    }
  },
  getters: {
    getNip (state) {
      return state.nip
    },
    getDatePickerValue (state) {
      return state.picker
    }
  },
  actions: {
    setNip ({ commit }, nip) {
      commit("SET_NIP", nip)
    },
    setDatePickerValue ({ commit }, picker) {
      commit("SET_DATE_PICKER_VALUE", picker)
    }
  }
}

export default LogbookModule
