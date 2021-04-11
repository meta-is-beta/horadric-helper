const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "./src/"),
      },
      extensions: [".js", ".vue", ".json"],
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => {
        options.limit = 1000000;
        return options;
      });
    config.module
      .rule("fonts")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => {
        options.limit = 1000000;
        return options;
      });
  },
};
