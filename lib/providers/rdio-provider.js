// MODULE DEPENDENCIES
var OAuth = require('oauth').OAuth,
  oa = new OAuth("http://api.rdio.com/oauth/request_token", "http://api.rdio.com/oauth/access_token", "csajse9vd4s4ab99n4x3x338", "gQf38xpsQw", "1.0", null, "HMAC-SHA1"),
  when = require('when');

// CONSTRUCTOR
function RdioProvider(options) {
  this.options = options;
  this.provider = "rdio";
  this.tracks = [];
}

// #search
RdioProvider.prototype.search = function (query) {
  var self = this;
  var deferred = when.defer();
  var data = {};
  var items = [];
  oa.post("http://api.rdio.com/1/", self.options.token, self.options.tokenSecret, {
    "method": "search",
    "query": query,
    "types": "Track"
  }, function (error, body, response) {
    data = JSON.parse(body);
    items = data.result.results;
    when.map(items, function (item) {
      return {
        id: item.key,
        title: item.name,
        provider: self.provider,
        artist: item.artist,
        artwork: item.icon400,
        length: (item.duration),
        url: item.shortUrl,
        meta: item
      };
    }).then(
      function pass(allitems) {
        deferred.resolve(allitems);
      },
      function fail(err) {
        deferred.reject(err);
      }
    );
  });
  return deferred.promise;
};

RdioProvider.prototype.details = function (id, callback) {
    var self = this;
    var deferred = when.defer();
    oa.post("http://api.rdio.com/1/", self.options.token, self.options.tokenSecret, {
        "method": "get",
        "keys": id,
    }, function (error, body, response) {
        item = JSON.parse(body).result[id];
        callback({
          id: item.key,
          title: item.name,
          provider: self.provider,
          artist: item.artist,
          artwork: item.icon400,
          length: (item.duration),
          url: item.shortUrl,
          meta: item,
          embedUrl:item.embedUrl
        })
    })
}

module.exports = RdioProvider;