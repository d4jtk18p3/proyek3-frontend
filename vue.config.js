const path = require("path")
module.exports = {
  devServer: {
    port: 5002
  },
  transpileDependencies: [
    "vuetify"
  ],
  configureWebpack: {
    resolve: {
      alias: {
        "@" : path.resolve(__dirname, "src/")
      }
    }
  }
}
