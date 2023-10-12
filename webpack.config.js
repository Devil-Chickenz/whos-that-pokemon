const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname + '/client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { targets: 'defaults' }],
            ],
          },
        },
      },
      {
        test: /\.(png|mp3)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css?/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          //   { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // template: path.resolve(__dirname + '/public/index.html'),
    }),
  ],
  devServer: {
    port: '8080',
    open: true,
    hot: true,
    // liveReload: true,
    static: {
      // directory: path.resolve(__dirname, './build'),
      // publicPath: 'http://localhost:8080/'
      directory: path.resolve(__dirname, 'build'),
      publicPath: 'build',
    },
    proxy: {
      '/': 'http://localhost:3000/',
      // '/api/**': ''
      // {
      //     target: 'http://localhost:3000/',
      //     secure: false,
      // }
    },
  },
};
