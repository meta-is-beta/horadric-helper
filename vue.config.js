const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "./src/"),
      },
      extensions: [".js", ".ts", ".vue", ".json"],
    },
  },
  chainWebpack: (config) => {
    // Remove comments
    config.optimization.minimizer("terser").tap((args) => {
      args[0].terserOptions.output = {
        ...args[0].terserOptions.output,
        comments: false,
      };
      return args;
    });
    // TypeScript loader
    config.module.rule("ts");
    config.module.rule("ts").use("ts-loader");
    config.module.rule("ts").use("babel-loader");
    config.module.rule("ts").use("cache-loader");
    config.plugin("fork-ts-checker");
    // Assets to basae64 conversion
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
