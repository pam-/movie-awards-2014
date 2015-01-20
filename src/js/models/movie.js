define([
  "jquery",
  "underscore",
  "backbone"
], function($, _, Backbone) {
  return Backbone.Model.extend({
    defaults: {
      highlight: false,
      intheaters: false
    }, 
    initialize: function() {
      // this.attributes.category = this.attributes.category.split(", ");
    }
  });
})
