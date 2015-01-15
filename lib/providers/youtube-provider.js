//  MODULE DEPENDENCIES
var youtube = require('youtube-feeds'),
  when = require('when');

// CONSTRUCTOR
function YouTubeProvider(options) {
  this.provider = "youtube";
}

// #search
YouTubeProvider.prototype.search = function (query) {
  var self = this;
  var deferred = when.defer();
  var items = [];
  youtube.feeds.videos({q: query}, function (err, data) {
    items = data.items;
    when.map(items, function (item) {
      return {
        id: item.id,
        title: item.title,
        provider: self.provider,
        artist: item.uploader,
        artwork: item.thumbnail.hqDefault,
        length: item.duration//,
        // meta: item
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

YouTubeProvider.prototype.details = function (id, callback) {
    var self = this;
    youtube.video(id).details(function(err, item) {
        callback({
          id: item.id,
          title: item.title,
          provider: self.provider,
          artist: item.uploader,
          artwork: item.thumbnail.hqDefault,
          length: (item.duration),
          url: item.player.mobile,
          meta: item,
          embedUrl:item.player.mobile
        })
    })
}
module.exports = YouTubeProvider;