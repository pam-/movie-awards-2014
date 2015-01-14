define([
  'require',
  'jquery',
  'imagesloaded',
  'isotope',
  'analytics',
  'underscore',
  'backbone',
  'lib/BackboneRouter',
  'templates',
  'collections/movies',
  'models/tags',
  'jquery_ui_touch_punch'
  ], function(require, jQuery, imagesLoaded, Isotope, Analytics, _, Backbone, Backbone2, templates, moviesCollection, tags) {

    


  var app = app || {};

  app.config = JSON.parse($('.staticinfo').html());
  var isMobile = app.config.platform === 'mobile';

  _.extend(app, {
    models: {},
    collections: {},
    views: {}
  });


  
  var MOBILE = isMobile;


  
  // app.collections.questions.bind("reset", _.once(Backbone2.history.start));

  // App-wide View
  // ----

  app.views.AppView = Backbone2.View.extend({
    el: "body",
    events: {
      "click .modal-overlay": "removeHighlight",
      "click .iapp-filter-button": "setFilter",
      "click .iapp-filter-button-clear": "clearFilters"
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
      this.renderFilters();
      var $cardWrap = this.$cardWrap;
      $cardWrap.imagesLoaded( function() {
        $cardWrap.isotope( {
          itemSelector: '.card',
          transitionDuration: (!MOBILE) ? '0.4s' : 0,
          // layoutMode: 'fitRows'
        });
      });
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
    },

    filtersTemplate: templates["tags.html"],
    renderFilters: function() {
      this.$el.find(".iapp-filters-wrap").html(this.filtersTemplate({tags: tags}));
    },

    currentFilter: [],

    setFilter: function(e) {
      var $target = $(e.target);
      var newFilter = "." + $target.attr("data-filter");
      if ($target.hasClass("iapp-selected")) {
        $target.removeClass("iapp-selected");
        this.currentFilter = _.without(this.currentFilter, newFilter);
      } else {
        
        $target.addClass("iapp-selected");

        this.currentFilter.push(newFilter);
        var filterStr = "";
        _.each(this.currentFilter, function(filter) {
          filterStr += filter;
        });
        

        
      }

      this.$cardWrap.isotope({ filter: filterStr });


      if (this.currentFilter.length > 0) {
          this.$el.find(".iapp-filter-button-clear").addClass("show");
        } else {
          this.$el.find(".iapp-filter-button-clear").removeClass("show");
        }
      
    },

    clearFilters: function(e) {
      this.currentFilter = [];
      this.$el.find(".iapp-filter-button-clear").removeClass("show");
      this.$el.find(".iapp-filters-wrap").find(".iapp-filter-button").removeClass("iapp-selected");
      this.$cardWrap.isotope({ filter: "" });
    }
  });

  // QuestionCard View
  // ----

  app.views.QuestionCard = Backbone2.View.extend({
    tagName: "div",

    className: function() {
      var categories = this.model.get("categories");
      var classes = "card small-card";
      _.each(categories, function(category) {
        var tagClass = category.toLowerCase().replace(/(^\s+|[^a-zA-Z0-9 ]+|\s+$)/g,"").replace(/\s+/g, "-");
        classes += (" " + tagClass);
      });
      return classes;
    },

    events: {
      "click": "setHighlight",
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
        if (app.views.detailView) {
          app.views.detailView.remove();
        }
        app.views.detailView = new app.views.DetailCard({model: this.model});

        $(".page-wrap").append(app.views.detailView.render().el);
        app.views.detailView.postRender(app.views.detailView.render().$el);
      }

      

    }
  });


  app.views.DetailCard = Backbone2.View.extend({
    tagName: "div",
    className: "modal",
    template: templates["card-back.html"],

    events: {
      "click .close-card": "removeHighlight",
      "click .facebook-share": "facebookShare",
      "click .twitter-share": "twitterShare"
      // "touchstart .close-card": "removeHighlight",
     
    },

    initialize: function() {

      app.router.navigate("movie/" + this.model.get("rowNumber"));
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
        _.defer(function() { app.router.navigate("movie"); });
        var _this = this;
        _.delay(function() {
          _this.remove();
        }, 500);
      }
      
    },


    removeHighlight: function() {
      this.model.set({"highlight": false});
    },

    facebookShare: function(e) {
        Analytics.click('facebook share clicked');

        if (window.FB) {

           e.preventDefault(); 

           window.FB.ui({
              method: 'share',
              href: window.location.href,
            }, function(response){});
            
        }
    },
    twitterShare: function(e) {
      Analytics.click('twitter share clicked');

        if (!isMobile) {
            e.preventDefault();

            window.open(e.currentTarget.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=550,height=420');
        }
    }

  });

  
    
  app.Router = Backbone2.Router.extend({

    routes: {
      "": "home",
      "movie/:id":                 "highlight",    // #/1
      
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

      
      if (app.collections.questions.toJSON().length == 0) {
        app.collections.questions.once("reset", function() {
          var detailModel = _.find(app.collections.questions.models, function(model) {
        
            return model.get("rowNumber") == id;
          });
          detailModel.set({"highlight": true});
          app.views.detailView = new app.views.DetailCard({model: detailModel});

          $(".page-wrap").append(app.views.detailView.render().el);
          app.views.detailView.postRender(app.views.detailView.render().$el);
        });
      }
      
    }

  });

  


  app.init = function() {

    require( [ 'jquery-bridget/jquery.bridget' ],
      function() {
        // make Isotope a jQuery plugin
        $.bridget( 'isotope', Isotope );
        app.collections.questions = new moviesCollection(); 
        app.views.appView = new app.views.AppView();
        app.router = new app.Router();
        Backbone2.history.start();
      }
    );

    
    
    
  };

  return app;

});
