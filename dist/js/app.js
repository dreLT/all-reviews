(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var app = angular.module('AllReviews', []);

app.controller('SearchController', function SearchController($scope, MoviesService) {
  $scope.executeSearch = function executeSearch() {
    //console.log($http.jsonp('http://api.nytimes.com/svc/movies/v2/reviews/search.json?query=gladiator&api-key=ddb559a750ed89a31dc492e01db33c1f:5:70698674'));
    MoviesService.keywordSearch($scope.query, 'false', function(error, data) {
        if (!error) {
          console.log(data);
          $scope.movies = data;
        }
    });
  }

  $scope.getReviews = function getReviews(title) {
    //console.log($http.jsonp('http://api.nytimes.com/svc/movies/v2/reviews/search.json?query=gladiator&api-key=ddb559a750ed89a31dc492e01db33c1f:5:70698674'));
    MoviesService.keywordSearch(title, 'true', function(error, data) {
        if (!error) {
          console.log(data);
          $scope.reviews = data;
          console.log(title);
          $scope.clickedMovieTitle = title;
        }
    });
  }

});


app.factory('MoviesService', ['$http', function($http) {
    return {
        keywordSearch: function(query, details, callback) {
          console.log(details);
          var requestURI = '/api/movies';
          if (details === 'true') {
            requestURI += '?details=true'
          }
        $http.post(requestURI, {query: query})
          .success(function (data) {
              callback(null, data);
          })
          .error(function (e) {
              callback(e);
          });
      }
    };
}]);

app.factory('MovieReviewsService', ['$http', function($http) {
    return {
        keywordSearch: function(query, callback) {
          var requestURI = '/api/movies/?details=true';
        $http.post(requestURI, {query: query})
          .success(function (data) {
              callback(null, data);
          })
          .error(function (e) {
              callback(e);
          });
      }
    };
}]);

// Filters

app.filter('unique', function(){
 return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
})
},{}]},{},[1]);