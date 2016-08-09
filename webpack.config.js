const path = require('path');

module.exports = {

  context: path.join(__dirname, './src'),

  output: {
    filename: '[name].[ext]',
    path: './dist',
  },

};
