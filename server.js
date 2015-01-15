var Searcher = require('./lib/searcher');
var ProviderFactory = require('./lib/providers');
var Hapi = require('hapi'),
    path = require('path'),
    request = require('request'),
    port = process.env.PORT || 3000,
    server = new Hapi.Server(port),
    routes = {
        css: {
            method: 'GET',
            path: '/css/{path*}',
            handler: createDirectoryRoute('css')
        },
        js: {
            method: 'GET',
            path: '/js/{path*}',
            handler: createDirectoryRoute('js')
        },
        images: {
            method: 'GET',
            path: '/images/{path*}',
            handler: createDirectoryRoute('images')
        },
        templates: {
            method: 'GET',
            path: '/templates/{path*}',
            handler: createDirectoryRoute('templates')
        },
        //nytimes: {
        //  method: 'GET',
        //  path: '/nytimes',
        //  handler: {
        //    proxy: {
        //      mapUri: function (request, callback) {
        //        var url = 'http://api.nytimes.com/svc/movies/v2/reviews/search.json?query=' + request.query.query + '&api-key=ddb559a750ed89a31dc492e01db33c1f:5:70698674';
        //        callback(null,url);
        //      },
        //      //onResponse: function(err, res, request, reply, settings, ttl) {

        //      //},
        //      passThrough: true,
        //      redirects: 5
        //    }
        //  }
        //},
        nytimes: {
          method: 'POST',
          path: '/api',
          handler: getFeeds
        },
        spa: {
          method: 'GET',
          path: '/{path*}',
          handler: {
            file: path.join(__dirname, '/dist/index.html')
          }
        }
    };

    server.route([ routes.css, routes.js, routes.images, routes.templates, routes.nytimes, routes.spa ]);
    server.start( onServerStarted );

    function getFeeds(req, reply) {
      var searcher = new Searcher();

      searcher.add(ProviderFactory.build('nytimes', {
        hostname: 'api.nytimes.com',
        basepath: '/svc/movies/v2/reviews/search.json',
        apiKey: 'ddb559a750ed89a31dc492e01db33c1f:5:70698674'
      }));

      searcher.add(ProviderFactory.build('usatoday', {
        hostname: 'api.usatoday.com',
        basepath: '/open/reviews/movies/movies',
        apiKey: '7p665vjpvsn2drnk6w347x5w'
      }));

      searcher.search(req.payload.query).then(
        function pass(items) {
        reply(items);
      },
      function fail(err) {
        console.log(err);
      });
    }



    function onServerStarted() {
      console.log( 'Server running on port ', port );
    }

    function createDirectoryRoute( directory ) {
      return {
        directory: {
          path: path.join(__dirname, '/dist/', directory)
        }
      };
    }

    module.exports = server;
