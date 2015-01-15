'use strict';

var app = angular.module('AllReviews', []);

app.controller('SearchController', function SearchController($scope, NYTimes, $http) {
  $scope.executeSearch = function executeSearch() {
    //console.log($http.jsonp('http://api.nytimes.com/svc/movies/v2/reviews/search.json?query=gladiator&api-key=ddb559a750ed89a31dc492e01db33c1f:5:70698674'));
    NYTimes.keywordSearch($scope.query, function(error, data) {
        if (!error) {
          $scope.movies = data;
        }
    });
  };
});


app.factory('NYTimes', ['$http', function($http) {
    return {
        keywordSearch: function(query, callback) {
          var requestURI = '/api';
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


// keywordSearch2: function() {
//         $http.jsonp('http://api.nytimes.com/svc/movies/v2/reviews/search.json?query=gladiator&api-key=ddb559a750ed89a31dc492e01db33c1f:5:70698674')
//           .success(function (data) {
//               callback(null, data);
//           })
//           .error(function (e) {
//               callback(e);
//           });
//       }
//     };
