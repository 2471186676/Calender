const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/main.js',
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },

    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },

}