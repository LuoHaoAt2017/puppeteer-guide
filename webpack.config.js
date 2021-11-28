const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function resolve(params) {
  return path.resolve(__dirname, params);
}

module.exports = {
  mode: 'development',
  entry: resolve("src/index.ts"),
  output: {
    filename: "[name].bundle.js",
    path: resolve("dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    alias: {
      "@": resolve("src"),
    },
    extensions: [".js", '.ts'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '测试框架',
      template: resolve('./public/index.html'),
      favicon: resolve('./public/favicon.ico'),
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    port: 9000,
  },
};