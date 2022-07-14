const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  devtool: "none",
  entry: {
    app: ["@babel/polyfill", path.join(__dirname, "../src/index.js")],
    vendor: ["react", "react-router-dom", "redux", "react-dom", "react-redux"],
  },
  mode: "production",
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].[hash].js",
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader?cacheDirectory=true"],
        include: path.join(__dirname, "../src"),
      },
      {
        test: /\.(sa|sc|c)ss$/,
        include: path.join(__dirname, "../node_modules"),
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: path.join(__dirname, "../node_modules"),
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[local]--[hash:base64:5]",
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // less than 8kb will transfer to based64, decrease http request
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "../src"),
    },
    extensions: [".js", ".jsx", "json"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new OptimizeCssAssetsPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
