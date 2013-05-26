var CheckerboardSetter = Backbone.View.extend({
  initialize: function () {
    this.render();
  },

  el: "#checkerboard-settings",

  template: _.template(Templates.Checkerboard.form),

  render: function () {
    this.$el.html(this.template());
    return this;
  },

});
