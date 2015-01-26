define([
  "jquery", 
  "underscore", 
  "backbone", 
  "analytics", 
  "templates"
  ], 
  function(jQuery, _, Backbbone, Analytics, templates) {

  app.views.MovieCard = Backbone.View.extend({
    tagName: "div",

    className: function() {
      var categories = this.model.get("categories");
      // console.log(categories)
      var classes = "card small-card";
      _.each(categories, function(category) {
        var tagClass; 
        category == ":(" ? tagClass="sad" : tagClass = category.toLowerCase().replace(/(^\s+|[^a-zA-Z0-9 ]+|\s+$)/g,"").replace(/\s+/g, "-");
          classes += (" " + tagClass);
        // console.log(category)
        // console.log(tagClass)
      });
      // console.log(classes)
      return classes;
    },

    events: {
      "click": "setHighlight",
    },

    template: templates["card-front.html"],

    initialize: function() {
      this.model.on('change', this.render, this);
      this.listenTo(this.model, 'change', this.showDetail);
    },

    addTheaterClass: function(){
      if(this.model.get('intheaters') == true){
        this.$el.addClass('intheaters');
      }
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      if (this.model.get('intheaters')) {
        this.$el.addClass('in-theaters')
      };
      _.each(this.model.attributes.category, function(v, i) {
        this.$el.addClass(v);
        this.$el.attr( 'data-category', v);
      }, this);
      // console.log('HERE',this)
      return this;
    },

    setHighlight: function() {
      Analytics.click("opened card");
      this.model.set({"highlight": true});
      console.log(this.model.get('intheaters'))
    },

    showDetail: function() {

      if(this.model.get("highlight")) {
        if (app.views.detailView) {
          app.views.detailView.remove();
        }
        app.views.detailView = new app.views.DetailCard({model: this.model});

        $(".iapp-page-wrap").append(app.views.detailView.render().el);
        app.views.detailView.postRender(app.views.detailView.render().$el);
      }
    }
  });
});

