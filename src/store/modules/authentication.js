import * as Keycloak from "keycloak-js"

const keycloak = Keycloak({
  url: process.env.VUE_APP_KEYCLOAK_BASE_URL,
  realm: process.env.VUE_APP_KEYCLOAK_REALM,
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID
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

    async logout ({ state }, router) {
      await router.push("/home")
      keycloak.logout()
    }
  }
}

export default authentication
