var CheckerboardSetter = Backbone.View.extend({
  initialize: function () {
    this.render();
  },

  events: {
    "submit #checkerboard-form": "renderNewCheckerboard"
  },

  el: "#checkerboard-settings",

  template: _.template(Templates.Checkerboard.form),

  render: function () {
    this.$el.html(this.template());
    return this;
  },

});
