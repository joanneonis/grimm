module.exports = {
  entry: './main.js',
  output: {
    filename: './bundle.js'
  },
  watch: true,
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
    {
      test: /\.css$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" }
      ]
    },{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: { 
        loader: 'babel-loader',
      } 
    },
    {
      test: /\.(ttf|eot|svg|jpg|gif|png|woff|woff2)$/,
      loader: 'file-loader' 
    }]
  },
};