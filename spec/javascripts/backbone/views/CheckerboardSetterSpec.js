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
      //gets form inputs
      //sets a checkerboard property on the CheckerboardSetter object
    });
  });

  describe("#getFormInputs", function ()   {
    it("caches the text input values into a hash", function () {
      loadFixtures("form.html");

      var horizontalTiles = 3;
      var verticalTiles = 3;
      var horizontalTileTextInputValue = $("input:text[name=horizontalTiles]").val(horizontalTiles);
      var verticalTileTextInputValue = $("input:text[name=verticalTiles]").val(verticalTiles);

      var hash = setter.getFormTextInputValues();

      expect(hash).toBe({
        horizontalTiles: horizontalTiles, 
        verticalTiles: verticalTiles
      });
    });
  });
});


