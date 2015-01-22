'use strict';

// MODULE DEPENDENCIES
var when = require('when'),
  request = require('request');

// CONSTRUCTOR
function UsaTodayProvider(options) {
  this.options = options;
  this.provider = 'usatoday';
}

// #search
UsaTodayProvider.prototype.search = function (query, details) {
  //if (details === 'false') {
    var self = this;
    var deferred = when.defer();
    var data = {};
    var items = [];
    request({
      method: 'GET',
      uri: 'http://' + self.options.hostname + self.options.basepath + '/' + encodeURIComponent(query) + '?api_key=' + self.options.apiKey
    }, function (err, response, body) {
      console.log('http://' + self.options.hostname + self.options.basepath + '/' + encodeURIComponent(query) + '?api_key=' + self.options.apiKey);
      data = JSON.parse(body);

      items = data.MovieReviews;

      //TODO: comment out when done
      //console.log(items);

      when.map(items, function (item) {
        return {
          title: item.MovieName,
          provider: self.provider,
          reviewDate: item.ReviewDate,
          link: {
            url: item.WebUrl,
            text: 'Read the USA Today Review of ' + item.MovieName
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
  //}
};

module.exports = UsaTodayProvider;
