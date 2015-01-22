'use strict';

// MODULE DEPENDENCIES
var when = require('when'),
  request = require('request');

// CONSTRUCTOR
function RottenTomatoesProvider(options) {
  this.options = options;
  this.provider = 'Rotten Tomatoes';
}

// #search
RottenTomatoesProvider.prototype.search = function (query, details) {
  console.log(details);
  var self = this;
  var deferred = when.defer();
  var data = {};
  var items = [];
  request({
    method: 'GET',
    uri: 'http://' + self.options.hostname + self.options.basepath + '?q=\'' + query.replace(/\s/g, '+') + '\'&apikey=' + self.options.apiKey
  }, function (err, response, body) {
    data = JSON.parse(body);
    items = data.movies;

    //TODO: comment out when done

    when.map(items, function (item) {
      if (details === 'true') {
        request({
          method: 'GET',
          uri: 'http://api.rottentomatoes.com/api/public/v1.0/movies/' + item.id + '/reviews.json?review_type=all&page_limit=50&page=1&country=us&apikey=dhg9yayq89br5gwynsq5f7hr'
        }, function (err, resp, bdy) {
          item.reviewDate = bdy.date;
        })
      }
      return {
        title: item.title,
        provider: self.provider,
        reviewDate: item.reviewDate,
        link: {
          url: item.links.review,
          text: item.quote
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

module.exports = RottenTomatoesProvider;
