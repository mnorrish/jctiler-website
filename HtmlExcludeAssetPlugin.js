'use strict';

class CssChunkPlugin {

  constructor(opts) {
    const options = opts || {};

    if (typeof options.exclude !== 'function') {
      return;
    }

    this.includeAsset = (asset) => {
      return !options.exclude(asset);
    };
  }

  apply(compiler) {
    if (typeof this.includeAsset !== 'function') {
      return;
    }

    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-alter-asset-tags', (data, callback) => {
        data.head = data.head.filter(this.includeAsset);
        data.body = data.body.filter(this.includeAsset);
        callback(null, data);
      });
    });
  }

}

module.exports = CssChunkPlugin;
