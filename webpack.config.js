const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Encuentra todos los archivos .js en public/js/
const jsEntries = glob.sync('./public/js/*.js').reduce((entries, filePath) => {
  filePath = filePath.replace(/\\/g, '/');
  const name = path.basename(filePath, '.js');
  // 🔧 fuerza a Webpack a tratarlo como ruta local
  entries[name] = `./${filePath}`;
  return entries;
}, {});

module.exports = {
  entry: jsEntries, // múltiples entradas
  output: {
    filename: '[name].bundle.js', // genera login.bundle.js, firebaseClient.bundle.js, etc.
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'production', // o 'development' si estás debuggeando
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    // Solo generamos login.html como ejemplo, puedes agregar más si lo necesitas
    new HtmlWebpackPlugin({
      template: './public/login.html',
      filename: 'login.html',
      chunks: ['login'], // solo inyecta login.bundle.js
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/css', to: 'css' },
        { from: 'private/home.html', to: 'private/home.html' },
        // También puedes copiar imágenes, fuentes, etc. si es necesario
      ],
    }),
  ],
  devServer: {
    static: './dist',
    open: true,
  },
};
