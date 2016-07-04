// webpack.config.js
var webpack = require("webpack");

// definePlugin 接收字串，因此你也可以直接寫入字串而不使用 JSON.stringify()
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

module.exports = {
  entry: {
    app: "./src/public/script/app.js",
    vendor: [
             "angular", 
             "angular-route",
             'angular-sanitize',
             'angular-animate'
            ],
  },

  output: {
  	path: './dist/script/',
    filename: 'bundle.js'       
  },

  module: {
    loaders: [
      { 
        test: /\.js$/, 
        loader: 'babel', 
        exclude:/(node_modules)/, 
        query: {presets: ['es2015']}
      }
      // { 
      //   test: /\.scss$/, 
      //   loaders:[
      //             "style", 
      //             "css", 
      //             "autoprefixer?browsers=last 3 versions",
      //             "sass?outputStyle=expanded"
      //           ]
      // },
      // { 
      //   test: /\.(png|jpg)$/, 
      //   loader: 'url-loader?limit=8192'
      // } 
      // to confirm why use base64 URL. 當圖片大小小於 8k 時使用 base64 URL, 其餘使用直接連接到圖片的 URL
    ]
  },

  resolve: {
    extensions: ['', '.js', '.json', '.css'] 
  },

  devtool: 'source-map',

  plugins: [ //
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */
        "vendor",
        /* filename= */
        "vendor.bundle.js"),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev')
        //     }
        // }),
        new webpack.optimize.UglifyJsPlugin({minimize: true, compress: true}),
        new webpack.optimize.DedupePlugin()
    ]
};