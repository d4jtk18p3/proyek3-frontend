const LogbookModule = {
  namespaced: true,
  state: () => ({
    nip: null
  }),
  mutations: {
    SET_NIP (state, nip) {
      state.nip = nip
    }
  },
  getters: {
    getNip (state) {
      return state.nip
    }
  },
  actions: {
    setNip ({ commit }, nip) {
      commit("SET_NIP", nip)
    }
  }

}

export default LogbookModule
