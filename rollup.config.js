const pkg = require("./package.json");

export default {
  entry   : "lib/index.js",
  external: Object.keys(pkg.dependencies || {}),
  targets : [
    {
      format   : "cjs",
      dest     : pkg.main,
      sourceMap: true
    },
    {
      format   : "es",
      dest     : pkg.module,
      sourceMap: true
    }
  ]
};
