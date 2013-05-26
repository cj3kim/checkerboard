describe("Backbone Checkerboard Setter", function () {

  beforeEach(function () {
    setter = new CheckerboardSetter();
  });

  describe("#initialize", function () {
    it("renders the form into the document", function () {
    });
  });

  describe("#template", function () {
    it("returns a form template", function () {
      underscoreTemplate = _.template(Templates.Checkerboard.form)();

      expect(setter.template()).toEqual(underscoreTemplate);
    });
  });
  
});

