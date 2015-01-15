function ProviderFactory() {}

ProviderFactory.prototype.build = function (provider, options) {
  var Provider = require('./' + provider + '-provider');
  return new Provider(options);
};

module.exports = new ProviderFactory();