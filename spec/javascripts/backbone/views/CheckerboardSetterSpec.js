describe("Backbone Checkerboard Setter", function () {

  beforeEach(function () {
    setter = new CheckerboardSetter();
  });

  describe("#template", function () {
    it("returns a form template", function () {
      underscoreTemplate = _.template(Templates.Checkerboard.form)();

      expect(setter.template()).toEqual(underscoreTemplate);
    });
  });

  describe("#renderNewCheckerboard", function () {
    it("creates a new checkerboard for the user", function () {
    });
  });
});


