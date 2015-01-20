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
      //REQUEST DETAILS IF NEED THEM
      // if (details === 'true') {
      //   request({
      //     method: 'GET',
      //     uri: '' //ADD ROTTEN TOMATOES DETAIL URL USING ID FROM "item"
      //   }, function (err, resp, bdy) {
      //     item.reviewDate = bdy.reviewDate???? //USE DATE FIELD FROM RT
      //   })
      // }
      return {
        title: item.title,
        provider: self.provider,
        reviewDate: 'N/A', //item.reviewDate,
        link: {
          url: 'N/A',
          text: 'N/A'
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
