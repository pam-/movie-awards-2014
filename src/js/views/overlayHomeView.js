app.views.HomeView = Backbone.View.extend({
  el: ".iapp-info",
 
  template: templates["demo-credits.html"],

  events: {
    "click .close-card": "removeInfo",
    "click .overlay": "removeInfo",
    "click .get-started": "removeInfo"
  },

  initialize: function() {
    this.render();
  },

  render: function(){
    this.$el.empty();
    this.$el.html(this.template());
    this.renderFilters();
    this.animateFilters();
  },

  removeInfo: function(){
    console.log('this will close')
    this.$el.fadeOut('slow');
    _.defer(function() { app.router.navigate("movies"); });
    this.remove();
  },

  filtersTemplate: templates["tags.html"],

  renderFilters: function() {
    this.$el.find(".iapp-filters-wrap").html(this.filtersTemplate({tags: tags}));
  },

  animateFilters: function(){
    var firstButton = this.$el.find(".iapp-filter-button").eq(0);
    var secButton = this.$el.find(".iapp-filter-button").eq(5);
    var thirdButton = this.$el.find(".iapp-filter-button").eq(2);
    var startButton = this.$el.find(".get-started");
    var guidelinesBegin = this.$el.find("p");
    var guidelinesEnd = this.$el.find(".js-span");
    setTimeout( function() { firstButton.addClass('iapp-selected')}, 1000);
    setTimeout(function() { guidelinesEnd.addClass('show')}, 2000);
    setTimeout(function(){
      secButton.addClass('iapp-selected');
      thirdButton.addClass('iapp-selected');
    }, 2400);
    setTimeout(function(){
      startButton.addClass('show');
    }, 3000);
  }
});
