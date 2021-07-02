import * as Keycloak from "keycloak-js"

const keycloak = Keycloak({
  url: "http://akun.localhost:5000/keycloak-proxy/auth",
  realm: "development",
  clientId: "public"
})

const authentication = {
  state: () => ({
    identity: null
  }),

  mutations: {
    SET_IDENTITY (state, identity) {
      state.identity = identity
    }
  },

  getters: {
    identity: state => {
      return state.identity
    }
  },

  actions: {
    async authenticate ({ commit }, forceLogin = false) {
      const auth = await keycloak.init({ onLoad: "login-required" })

      commit("SET_IDENTITY", keycloak.tokenParsed)

      if (!auth) {
        window.location.reload()
      } else {
        setInterval(async () => {
          try {
            await keycloak.updateToken(70)
          } catch (err) {
            console.error(err)
          } finally {
            commit("SET_IDENTITY", keycloak.tokenParsed)
          }
        }, 6000)
      }
    },

    logout ({ state }) {
      keycloak.logout()
    }
  }
}

export default authentication
