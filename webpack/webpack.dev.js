const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: {
    app: [path.join(__dirname, "../src/index.js")],
    vendor: ["react", "react-router-dom", "redux", "react-dom", "react-redux"],
  },
  mode: "development",
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].[hash].js",
    chunkFilename: "[name].[chunkhash].js",
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "../src"),
    },
    extensions: [".js", ".jsx", "json"],
  },
  devServer: {
    // contentBase: path.join(__dirname, '../dist'),
    publicPath: "/",
    compress: true,
    hot: true,
    inline: true,
    progress: true,
    // quiet: true,
    historyApiFallback: {
      index: "/",
    },
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        // pathRewrite: { "^/fin-model-api": "" },
        changeOrigin: true,
      },
    },
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
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: path.join(__dirname, "../node_modules"),
        use: [
          "style-loader",
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
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "../public/index.html"),
    }),
  ],
};
