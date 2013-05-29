APP.CheckerboardSetter = CheckerboardSetter || {};

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

  renderNewCheckerboard: function (e) {
    e.preventDefault();
    var formTextInputsValues = this.getFormTextInputValues("#checkerboard-form");
    this.checkerboard = new Checkerboard(formTextInputsValues);
  },

  getFormTextInputValues: function (formId) {
    var $form = $(formId);
    var queryString = $form.serialize();
    var textInputValuesHash = URI.parseQuery(queryString);
    var integerInputValuesHash = this.changeHashValuesIntoIntegerType(textInputValuesHash);

    return integerInputValuesHash;
  },

  changeHashValuesIntoIntegerType: function (hash) {
    _.each(hash, function (v, k, h) {
      h[k] = parseInt(v);
    });
    return hash;
  }
});
