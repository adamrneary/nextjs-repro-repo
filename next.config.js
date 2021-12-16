const withTM = require('next-transpile-modules')([
  'monaco-editor',
]);

module.exports = withTM({
  productionBrowserSourceMaps: true,
  webpack: (config) => {
    // Monaco does some insanity that requires a special loader to compile.
    // It's predominently an `ssr: false` scenario, but this plugin covers the rest.
    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: ["javascript", "typescript", "sql"],
        filename: "static/[name].worker.js",
      })
    );

    return config;
  },
});
