const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestWebpackPlugin = require("webpack-manifest-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  name: "client",
  mode: "development",
  devtool: "eval-source-map",
  entry: {
    app: "./src/client.tsx",
  },
  output: {
    path: path.resolve(__dirname, "../../dist"),
    filename: "[name].js",
    pathinfo: false,
  },
  devServer: {
    // progress: true,
    contentBase: "dist",
    hot: true,
    port: 8080,
    disableHostCheck: true,
    public: "localhost:8080",
  },
  module: {
    rules: [
      {
        test: /\.m?(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          "cache-loader",
          {
            loader: "babel-loader",
            options: {
              configFile: path.resolve("babel.config.js"),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules(?![\/\\](@ppb[\/\\](the-wall)))/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](?!@ppb)/,
        },
      },
    },
    removeAvailableModules: false,
    removeEmptyChunks: false,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new ManifestWebpackPlugin({
      writeToFileEmit: true,
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: "./tsconfig.json",
      checkSyntacticErrors: true,
    }),
  ],
});
