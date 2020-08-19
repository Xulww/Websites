const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const WebpackLivereloadPlugin = require("webpack-livereload-plugin");

const isProd = process.env.NODE_ENV === "production";

const config = {
  entry: {
    app: "./assets/index",
  },
  output: {
    path: path.resolve(__dirname, "./static/build/"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 2,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
    new FriendlyErrorsPlugin(),
  ],
  stats: {
    entrypoints: false,
    children: false,
  },
};

if (!isProd)
  config.plugins.push(
    new WebpackLivereloadPlugin({
      port: 35729,
      appendScriptTag: true,
    })
  );

module.exports = config;
