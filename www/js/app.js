define([
  'jquery',
  'isotope',
  'analytics',
  'underscore',
  'backbone',
  'templates',
  'collections/movies'
  // 'jquery_ui_touch_punch'
  ], function(jQuery, Isotope, Analytics, _, Backbone, templates, moviesCollection) {


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
      this.$cardWrap.append(view.render().el);
    },

    $cardWrap: $("#card-wrap"),

    addAll: function() {

      this.$cardWrap.empty();
      app.collections.questions.each(this.addOne, this);
      this.iso = new Isotope("#card-wrap", {
        itemSelector: '.card',
        layoutMode: 'fitRows'
      });
      console.log(this.iso);
      // this.iso.arrange({filter: ".test"});
      // this.addTimeStamp();
    },

    removeHighlight: function() {
      Analytics.click("closed card");
      app.views.detailView.model.set({"highlight": false});
    },
    addTimeStamp: function() {
      var objData = app.collections.questions.toJSON();
      this.$el.find(".time-stamp").html(objData[0].timestamp);
    },

    filterItems: function(tagArray) {
      var filteredCollection = app.collections.questions.filter(function(model) {
        var result;

        _.each(tagArray, function(tag) {
          if (_.contains(model.get("categories"), tag)){
            result = true;
          }
        });

        return result;
      });

      this.$cardWrap.empty();
      _.each(filteredCollection, function(item) {
        this.addOne(item);
      }, this);
    }
  });

  // QuestionCard View
  // ----

  app.views.QuestionCard = Backbone.View.extend({
    tagName: "div",

    className: function() {
      var categories = this.model.get("categories");
      var classes = "card small-card";
      _.each(categories, function(category) {
        classes += (" " + category);
      });
      return classes;
    },

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

      console.log(app.collections.questions);
      _.defer(function() {
        console.log(app.collections.questions);
        var detailModel = _.find(app.collections.questions.models, function(model) {
        
        return model.get("rowNumber") == id;
      });
      detailModel.set({"highlight": true});
      app.views.detailView = new app.views.DetailCard({model: detailModel});

        $(".page-wrap").append(app.views.detailView.render().el);
        app.views.detailView.postRender(app.views.detailView.render().$el);

      })
      
    }

  });

  


  app.init = function() {

    app.collections.questions = new moviesCollection(); 
    app.views.appView = new app.views.AppView();
    app.router = new app.Router();
    Backbone.history.start();
    
    
  };

  return app;

});
