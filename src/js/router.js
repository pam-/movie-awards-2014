define([
  "jquery",
  "underscore",
  'lib/BackboneRouter',
  ], 
  function($, _, Backbone) { 

  app.Router = Backbone.Router.extend({

    routes: {
      "":"home",
      "movies": "index",
      "movies/:id": "highlight",   // #/1
      "*default": "index"
    },

    home: function(){
    },

    index: function() {
      app.views.homeView.remove();
       var highlightModel = _.find(app.collections.movies.models, function(model) {
        return model.get("highlight") === true;
      });
       if(highlightModel) {
        highlightModel.set({"highlight": false});
      }
    },

    highlight: function(id) {
      app.views.homeView.remove();
      if (app.collections.movies.toJSON().length == 0) {
        app.collections.movies.once("reset", function() {
          var detailModel = _.find(app.collections.movies.models, function(model) {
            return model.get("rowNumber") == id;
          });
          detailModel.set({"highlight": true});
          app.views.detailView = new app.views.DetailCard({model: detailModel});
          $(".iapp-page-wrap").append(app.views.detailView.render().el);
          app.views.detailView.postRender(app.views.detailView.render().$el);
        });
      }
    }
  });
});