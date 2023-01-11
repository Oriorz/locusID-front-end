const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  plugins: [
    new NodePolyfillPlugin()
],
  resolve: {
    fallback: {
      http: require.resolve("stream-http")
      //"http": require.resolve("stream-http"), //npm i stream-http
      /* "url": require.resolve("url/"), //npm i url
      "fs": require.resolve("fs/"), 
      "https": require.resolve("https-browserify"), //npm i https-browserify
      "crypto": require.resolve("crypto-browserify"), //npm i crypto-browserify
      "stream": require.resolve("stream-browserify"), //npm i stream-browserify
      "path": require.resolve("path-browserify"), //npm i path-browserify */
    }
  }
}