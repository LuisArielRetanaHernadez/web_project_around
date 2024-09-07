const path = require("path");

const HtmlWebapckPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: {
    main: "./pages/script.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
    clean: true,
  },
  stats: { children: true },
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, { loader: "css-loader" }]
      }
    ]
  },
  plugins: [
    new HtmlWebapckPlugin({
      template: "./index.html",
    }),
    new MiniCssExtractPlugin()
  ]
}