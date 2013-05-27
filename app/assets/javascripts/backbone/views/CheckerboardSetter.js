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

  renderNewCheckerboard: function () {
  },

  getFormTextInputValues: function (formId) {
    var $form = $(formId);
    var queryString = $form.serialize();
    var textInputValuesHash = URI.parseQuery(queryString);

    _.each(textInputValuesHash, function (value, key, hash) {
      hash[key] = parseInt(value);
    });

    return textInputValuesHash;
  }

});
