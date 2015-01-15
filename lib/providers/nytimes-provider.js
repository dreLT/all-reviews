'use strict';

// MODULE DEPENDENCIES
var when = require('when'),
  request = require('request');

// CONSTRUCTOR
function NyTimesProvider(options) {
  this.options = options;
  this.provider = 'nytimes';
}

// #search
NyTimesProvider.prototype.search = function (query) {
  var self = this;
  var deferred = when.defer();
  var data = {};
  var items = [];
  request({
    method: 'GET',
    uri: 'http://' + self.options.hostname + self.options.basepath + '?query=\'' + query.replace(/\s/g, '+') + '\'&api-key=' + self.options.apiKey
  }, function (err, response, body) {
    data = JSON.parse(body);
    items = data.results;

    //TODO: comment out when done
    console.log(items);

    when.map(items, function (item) {
      return {
        title: item.display_title,
        provider: self.provider,
        reviewDate: item.publication_date,
        link: {
          url: item.link.url,
          text: item.link.suggested_link_text
        }
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

module.exports = NyTimesProvider;
