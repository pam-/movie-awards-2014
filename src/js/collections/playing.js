  // in theaters Collection
  // ---------------

  define([
  "jquery",
  "underscore",
  "backbone"
], function($, _,  Backbone) {

  var dataURL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=gp8x4h757ztubg36gu2vdxh8&page_limit=50'

  // The collection of questions is backed by json file
  return Backbone.Collection.extend({

    // Reference to this collection's model.
    // model: movieModel,
    url: dataURL
  });
});