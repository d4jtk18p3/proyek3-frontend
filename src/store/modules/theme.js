const CURRENT_THEME_KEY = "CURRENT_THEME_KEY_STORAGE"

const Light = {
  colorPrimary: "#272343",
  colorPrimaryVariant: "#272343",
  colorSecondary: "#59DCDC",
  colorSecondaryVariant: "#E3F6F5",
  colorOnPrimary: "#FFFFFF",
  colorOnSecondary: "#272343",
  background: "#FFFFFF",
  surface: "#FFFFFF",
  onBackground: "#272343",
  onSurface: "#272343",
  onError: "#FF5252"
}

const Dark = {
  colorPrimary: "#272343",
  colorPrimaryVariant: "#272343",
  colorSecondary: "#59DCDC",
  colorSecondaryVariant: "#E3F6F5",
  colorOnPrimary: "#FFFFFF",
  colorOnSecondary: "#272343",
  background: "#181A1D",
  surface: "#262626",
  onBackground: "#FFFFFF",
  onSurface: "#FFFFFF",
  onError: "#FF5252"
}

const ThemeModule = {
  namespaced: true,
  state: () => ({
    currentColor: Light,
    isDark: false
  }),
  mutations: {
    SET_IS_DARK (state, isDark) {
      state.isDark = isDark
      if (isDark) {
        state.currentColor = Dark
      } else {
        state.currentColor = Light
      }
    }
  },
  getters: {
    getCurrentColor (state) {
      return state.currentColor
    },
    getIsDark (state) {
      return state.isDark
    }
  },
  actions: {
    toogleDark ({ commit, state }, username) {
      const isNewThemeDark = !state.isDark
      localStorage.setItem(CURRENT_THEME_KEY + username, JSON.stringify(isNewThemeDark))
      commit("SET_IS_DARK", isNewThemeDark)
    },
    sychronizeCurrentTheme ({ commit }, username) {
      commit("SET_IS_DARK", JSON.parse(localStorage.getItem(CURRENT_THEME_KEY + username)) || false)
    }
  }

}

export default ThemeModule
