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
  
  // If search query is made, generate list of movie titles that match the query (each as an object)
  if (details === 'false') {
    var self = this;
    var deferred = when.defer();
    var data = {};
    var items = [];
    request({
      method: 'GET',
      uri: 'http://' + self.options.hostname + self.options.basepath + '?q=\'' + query.replace(/\s/g, '+') + '\'&apikey=' + self.options.apiKey
    }, function (error, response, body) {
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
        function fail(error) {
          deferred.reject(error);
        }
      )
    });
  }

  // If movie title is clicked, generate reviews for the clicked movie (each as an object)
  else if (details === 'true') {
    var self = this;
    var deferred = when.defer();
    var data = {};
    var items = [];
    
    // Need to somehow get the ID of the movie that is clicked in the search results

    request({
      method: 'GET',
      uri: 'http://api.rottentomatoes.com/api/public/v1.0/movies/' + item.id + '/reviews.json?review_type=all&page_limit=50&page=1&country=us&apikey=dhg9yayq89br5gwynsq5f7hr'
    }, function (error, response, body) {
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
