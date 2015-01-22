function Searcher() {
  var searchables = [];
  var when = require('when');
  var _ = require('lodash');
  var self = this;

  self.add = function (searchable) {
    searchables.push(searchable);
    return searchables.length;
  };

  self.search = function (query, details) {
    var deferred = when.defer();
    var deferreds = [];
    var i = 0;
    for (i = 0; i < searchables.length; i += 1) {
      deferreds.push(searchables[i].search(query, details));
    }

    when.all(deferreds).then(
      function pass(deferreds) {
        deferred.resolve(
          _.sortBy(_.flatten(deferreds), function (item) {
            return item.title;
          })
        );
      },
      function fail(err) {
        console.log(err);
      }
    );
    return deferred.promise;
  };

  self.details = function (provider, id, callback) {
      for(var s in searchables) {
          if(searchables[s].provider == provider) {
              searchables[s].details(id, callback)
          }
      }
  }
}

module.exports = Searcher;