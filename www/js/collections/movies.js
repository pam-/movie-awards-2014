  // Questions Collection
  // ---------------

  define([
  "jquery",
  "underscore",
  "backbone",
  'models/movie',
], function($, _,  Backbone, movieModel) {

  var dataURL;
  var hostname = window.location.hostname;

  hostname == "localhost" ? dataURL = "js/data.json" : dataURL = "http://" + hostname + "/services/webproxy/?url=http://www.gannett-cdn.com/experiments/usatoday/2015/01/movies-2014/js/data.json";

  // The collection of questions is backed by json file
  return Backbone.Collection.extend({

    // Reference to this collection's model.
    model: movieModel,
    url: dataURL


  });

});