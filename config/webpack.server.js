const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './server/index.ts',
  externalsPresets: {
    node: true
  },
  externals: [nodeExternals()],
  output: {
    path: path.resolve('build'),
    filename: 'server.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader'
      }
    ]
  }
}
