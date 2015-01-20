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
  
    $scope.reviewsRequested = false;
    $scope.requestReviews = function () {
      $scope.reviewsRequested = true;
    }
  }

  $scope.getReviews = function getReviews(title) {
    //console.log($http.jsonp('http://api.nytimes.com/svc/movies/v2/reviews/search.json?query=gladiator&api-key=ddb559a750ed89a31dc492e01db33c1f:5:70698674'));
    MoviesService.keywordSearch(title, 'true', function(error, data) {
        if (!error) {
          console.log(data);
          $scope.movies = data;
        }
    });
  
    // $scope.reviewsRequested = false;
    // $scope.requestReviews = function () {
    //   $scope.reviewsRequested = true;
    // }
  }

});


app.factory('MoviesService', ['$http', function($http) {
    return {
        keywordSearch: function(query, details, callback) {
          var requestURI = '/api/movies';
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

// app.filter('filterReviews', function(){
//  return function(collection, keyname1, keyname2) {
//       var output = [], 
//           keys = [];

//       angular.forEach(collection, function(item) {
//           var key1 = item[keyname1];
//           var key2 = item[keyname2];
//           if( (keys.indexOf(key1) === -1) && (keys.indexOf(key2) === -1) ) {
//               keys.push(key1); keys.push(key2);
//               output.push(item);
//           }
//       });

//       return output;
//    };
// })