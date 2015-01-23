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
  if (details === 'false') {
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

      when.map(items, function (item) {
        return {
          title: item.title
        }
      }).then(
        function pass(allitems) {
          deferred.resolve(allitems);
        },
        function fail(err) {
          deferred.reject(err);
        }
      )
    });
  }
  else if (details === 'true') {
    var self = this;
    var deferred = when.defer();
    var data = {};
    var items = [];
    request({
      method: 'GET',
      uri: 'http://' + self.options.hostname + self.options.basepath + '?q=\'' + query.replace(/\s/g, '+') + '\'&apikey=' + self.options.apiKey
    }, function (err, response, body) {
      data = JSON.parse(body);
      items = data.reviews;

      when.map(items, function (item) {
        return {
          provider: item.publication,
          reviewDate: item.date,
          link: {
            url: item.links.review,
            text: 'Read full review' 
          }
        }
      }).then(
        function pass(allitems) {
          deferred.resolve(allitems);
        },
        function fail(err) {
          deferred.reject(err);
        }
      )
    });
  }
  return deferred.promise;
};

module.exports = RottenTomatoesProvider;
