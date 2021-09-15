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

    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },

}