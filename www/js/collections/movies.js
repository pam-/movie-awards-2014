  // Questions Collection
  // ---------------

  define([
  "jquery",
  "underscore",
  "backbone",
  'models/movie',
], function($, _,  Backbone, movieModel) {

  // The collection of questions is backed by json file
  return Backbone.Collection.extend({

    // Reference to this collection's model.
    model: movieModel,
    url: "js/data.json"


  });

});