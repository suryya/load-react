'use strict';

/**
 * Dist configuration. Used to build the
 * final output when running npm run dist.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');
const packages = require('../../package.json');
const path = require('path');
var FileSystem = require("fs");
var node_modules = FileSystem.readdirSync('node_modules').filter(function(x) { return x !== '.bin' });

function isExternal(module) {
  var context = module.context;
  var resource = module.resource

  if (typeof resource !== 'string') {
    return false;
  }

  return resource.indexOf('node_modules') !== -1;
}


class WebpackDistConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      cache: false,
      devtool: 'source-map',

      entry: {
        app: [ './client.js' ],
        vendor: Object.keys(packages.dependencies)
      },

      output: {
        path: path.resolve('./dist/assets'),
        filename: "app.js",
        publicPath: './assets/'
      },

      // entry: {
      //   app: './client.js',
      //   vendor: Object.keys(packages.dependencies)
      // },
      // output: {
      //   path: path.resolve('./dist/assets'),
      //   filename: "app.js"
      // },
      plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
        }),

        // new webpack.optimize.CommonsChunkPlugin({
        //   name: "vendor",
        //   // minChunks: function (module) {
        //   //   // this assumes your vendor imports exist in the node_modules directory
        //   //   //console.log('minChunks:',module.context);
        //   //   if(module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
        //   //     return false;
        //   //   }

        //   //   return module.context && module.context.includes("node_modules");
        //   // },

        //   filename: "vendor.js",
        //   // (Give the chunk a different name)
        //   children: true,
        //   minChunks: Infinity,
        //   //async: true,
        //   // (with more entries, this ensures that no other module
        //   //  goes into the vendor chunk)
        // }),



        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'vendor',
        //   filename: "vendor.js",
        //   minChunks: function(module) {
        //     return isExternal(module);
        //   }
        // }),

        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      ]
    };

    // Deactivate hot-reloading if we run dist build on the dev server
    this.config.devServer.hot = false;
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'dist';
  }
}

module.exports = WebpackDistConfig;
