'use strict';

class CssChunkPlugin {

  constructor(opts) {
    const options = opts || {};

    this.excludeAsset = options.exclude;
  }

  apply(compiler) {
    if (typeof this.excludeAsset !== 'function') {
      return;
    }

    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-alter-asset-tags', (data, callback) => {
        data.head = data.head.filter((asset) => {
          return !this.excludeAsset(asset)
        });
        data.body = data.body.filter((asset) => {
          return !this.excludeAsset(asset)
        });
        callback(null, data);
      });
    });
  }

}

module.exports = CssChunkPlugin;
