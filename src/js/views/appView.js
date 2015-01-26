define([
  'require',
  'jquery',
  'imagesloaded',
  'isotope',
  'analytics',
  'underscore',
  'lib/BackboneRouter',
  'templates',
  'collections/movies',
  'collections/playing',
  'models/tags',
  'views/detailCardView',
  'views/movieCardView',
  'overlayHomeView',
  'jquery_ui_touch_punch'
  ], function (require, jQuery, imagesLoaded, Isotope, Analytics, _, Backbone, templates, moviesCollection, playingCollection, tags, detailView, movieCardView, homeView) {

  app.views.AppView = Backbone.View.extend({
    el: ".iapp-page-wrap",
    events: {
      "click .modal-overlay": "removeHighlight",
      "click .iapp-filter-button": "setFilter",
      "click .iapp-filter-button-clear": "clearFilters",
      // "click .button": "startApp"
      // "touchstart .modal-overlay": "removeHighlight" 
    },

    initialize: function() {
      this.listenTo(app.collections.movies, 'reset', this.addAll);
      this.listenTo(app.collections.playing, 'reset', this.inTheaters)
      this.render();
    },

    addOne: function(movie) {
      var view = new app.views.MovieCard({model: movie});
      this.$cardWrap.append(view.render().el);
      // console.log(movie.get('intheaters'));
    },  

    template: templates["app-view.html"],

    render: function() {
      this.$el.html(this.template({}));
      this.$cardWrap = this.$el.find("#card-wrap");
      app.collections.movies.fetch({reset: true});
      app.collections.playing.fetch({reset: true, dataType: 'jsonp'});
    },

    $cardWrap: {},

    addAll: function() {
      this.$cardWrap.empty();
      app.collections.movies.each(this.addOne, this);
      this.renderFilters();
      var $cardWrap = this.$cardWrap;
      var credits = _.map(app.collections.movies.toJSON(), function(item) {
        return item.photocredit;
      }).join(", ");
      this.$el.append('<p class="iapp-credits"><strong>Photos: </strong>' + credits);

      $cardWrap.imagesLoaded( function() {
        $cardWrap.isotope( {
          itemSelector: '.card',
          transitionDuration: (!MOBILE) ? '0.4s' : 0,
          // layoutMode: 'fitRows'
        });
        $cardWrap.isotope("on", "layoutComplete", function(iso) {
          if (iso.filteredItems.length === 0) {
            if ($(".iapp-no-results-wrap").length === 0) {
              $cardWrap.after("<div class='iapp-no-results-wrap'><h3>Until you actually make that movie, try another filter.</h3></div>");
            }
          } else {
            $(".iapp-no-results-wrap").remove();
          }
        });
      });
    },

    nowPlaying: {},    

    inTheaters: function() {
      app.collections.playing.each(this.getTitles, this);
    },

    getTitles: function(obj){
      var moviesInTheater = obj.get('movies');
      // console.log(moviesInTheater)
      _.each(moviesInTheater, function(item){
        var title = this.sanitizeTitle(item.title);
        var date = item.release_dates.theater;
        // console.log(date)
        this.nowPlaying[title] = date;
      }, this);
      console.log(this.nowPlaying)
      if (Object.keys(this.nowPlaying).length > 0) {
        // console.log('HERE',this.nowPlaying);
        console.log('the titles are in');
        app.collections.movies.each(this.compareTitles, this);
      };
    },

    sanitizeTitle: function(title){
      return title.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "-");
    },

    compareTitles: function(obj){
      // console.log(obj.get('movietitle'))
      // console.log(this.$cardWrap);
      for (var title in this.nowPlaying) {
        // console.log(title)
        if(title == this.sanitizeTitle(obj.get('movietitle'))){
          obj.set('intheaters', true)
          obj.set('release', this.nowPlaying[title])
          // console.log(obj.get('intheaters'));
        }
      };
    },

    removeHighlight: function() {
      Analytics.click("closed card");
      app.views.detailView.model.set({"highlight": false});
    },
    addTimeStamp: function() {
      var objData = app.collections.movies.toJSON();
      this.$el.find(".time-stamp").html(objData[0].timestamp);
    }, 
    
    filterItems: function(tagArray) {
      var filteredCollection = app.collections.movies.filter(function(model) {
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
      if (_.contains(this.currentFilter, newFilter)) {
        $target.removeClass("iapp-selected");
        this.currentFilter = _.without(this.currentFilter, newFilter);
      } else {

        $target.addClass("iapp-selected");

        this.currentFilter.push(newFilter);
        
      }
      // window.alert(this.currentFilter);
      var filterStr = "";
      _.each(this.currentFilter, function(filter) {
        filterStr += filter;
      });
      console.log(filterStr)
      this.$cardWrap.isotope({ filter: filterStr });


      if (this.currentFilter.length > 0) {
        // console.log('clear button should show here')
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
  })
})