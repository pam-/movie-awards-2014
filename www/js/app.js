define([
  'jquery',
  'analytics',
  'underscore',
  'backbone',
  'templates',
  'collections/movies',
  'jquery_ui_touch_punch'
  ], function(jQuery, Analytics, _, Backbone, templates, moviesCollection) {


  var app = app || {};

  _.extend(app, {
    models: {},
    collections: {},
    views: {}
  });


  



  
  // app.collections.questions.bind("reset", _.once(Backbone.history.start));

  // App-wide View
  // ----

  app.views.AppView = Backbone.View.extend({
    el: "body",
    events: {
      "click .modal-overlay": "removeHighlight",
      // "touchstart .modal-overlay": "removeHighlight" 
    },

    initialize: function() {
      this.listenTo(app.collections.questions, 'reset', this.addAll);
      app.collections.questions.fetch({reset: true});
    },

    addOne: function(question) {

      var view = new app.views.QuestionCard({model: question});
      $("#card-wrap").append(view.render().el);
    },

    addAll: function() {

      Backbone.history.start();
      app.collections.questions.each(this.addOne, this);
      this.addTimeStamp();
    },

    removeHighlight: function() {
      Analytics.click("closed card");
      app.views.detailView.model.set({"highlight": false});
    },
    addTimeStamp: function() {
        var objData = app.collections.questions.toJSON();
        this.$el.find(".time-stamp").html(objData[0].timestamp);
    }
  });

  // QuestionCard View
  // ----

  app.views.QuestionCard = Backbone.View.extend({
    tagName: "div",

    className: "card small-card",

    events: {
      "click": "setHighlight"
    },

    template: templates["card-front.html"],

    initialize: function() {
      this.listenTo(this.model, 'change', this.showDetail);
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));



      _.each(this.model.attributes.category, function(v, i) {
        this.$el.addClass(v);
        this.$el.attr( 'data-category', v);
      }, this);

      return this;
    },

    setHighlight: function() {
      Analytics.click("opened card");
      this.model.set({"highlight": true});
    },

    showDetail: function() {

      if(this.model.get("highlight")) {
        app.views.detailView = new app.views.DetailCard({model: this.model});

        $(".page-wrap").append(app.views.detailView.render().el);
        app.views.detailView.postRender(app.views.detailView.render().$el);
      }

      

    }
  });


  app.views.DetailCard = Backbone.View.extend({
    tagName: "div",
    className: "modal",
    template: templates["card-back.html"],

    events: {
      "click .close-card": "removeHighlight",
      // "touchstart .close-card": "removeHighlight",
     
    },

    initialize: function() {

      app.router.navigate("questions/" + this.model.get("rowNumber"));
      this.listenTo(this.model, 'change', this.removeCard);
    },
    render: function() {
      this.$el.empty();
      
      this.$el.html(this.template(this.model.attributes));   
      return this;
    },

    postRender: function(element) {

      _.defer(function() {
        $(".modal-overlay").addClass("show");

        element.addClass("modal-show");
      }, element);
        
    },

    removeCard: function() {
      
      if(!this.model.get("highlight")) {
        
        $(".modal-overlay").removeClass("show");
        this.$el.removeClass("modal-show");
        _.defer(function() { app.router.navigate("questions"); });
        this.stopListening();
      }
      
    },

    removeHighlight: function() {
      this.model.set({"highlight": false});
    }

  });


  app.Router = Backbone.Router.extend({

    routes: {
      "": "home",
      "questions/:id":                 "highlight",    // #/1
      
    },

    home: function() {

       var highlightModel = _.find(app.collections.questions.models, function(model) {
        
        return model.get("highlight") === true;
      });
       if(highlightModel) {
        highlightModel.set({"highlight": false});
       }
       
    },

    highlight: function(id) {
      var detailModel = _.find(app.collections.questions.models, function(model) {
        
        return model.get("rowNumber") == id;
      });
      detailModel.set({"highlight": true});
      app.views.detailView = new app.views.DetailCard({model: detailModel});

        $(".page-wrap").append(app.views.detailView.render().el);
        app.views.detailView.postRender(app.views.detailView.render().$el);
    }

  });

  


  app.init = function() {
    // Create our global collection of **questions**.
    app.collections.questions = new moviesCollection();
    app.router = new app.Router();
    app.views.appView = new app.views.AppView();
  };

  return app;

});
