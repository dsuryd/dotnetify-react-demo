const webpack = require("webpack");
module.exports = {
  entry: './renderer.js',
  output: {
    filename: './renderer-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        query: { presets: ["es2015", "react"] }
      }
    ]
  }
}
