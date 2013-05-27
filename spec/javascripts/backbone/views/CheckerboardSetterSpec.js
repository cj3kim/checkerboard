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

      //expect(setter.subject).toEqual(new Checkerboard());

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

      var hash = setter.getFormTextInputValues("#checkerboard-form");
      var expectedHash = {
        horizontalTiles: horizontalTiles, 
        verticalTiles: verticalTiles
      };

      expect(hash).toEqual(expectedHash);

      horizontalTiles = 4;
      verticalTiles = 5;
      horizontalTileTextInputValue = $("input:text[name=horizontalTiles]").val(horizontalTiles);
      verticalTileTextInputValue = $("input:text[name=verticalTiles]").val(verticalTiles);

      hash = setter.getFormTextInputValues("#checkerboard-form");
      expectedHash = {
        horizontalTiles: horizontalTiles, 
        verticalTiles: verticalTiles
      };

      expect(hash).toEqual(expectedHash);
    });
  });

  describe("#changeHashValuesIntoIntegerType", function () {
    it("changes the strings into integers in a javascript object", function () {
      var hash = {a: "12", b: "13" };

      expect(setter.changeHashValuesIntoIntegerType(hash)).toEqual({
        a: 12, b: 13
      });

      hash = {a: "18", b: "9" };

      expect(setter.changeHashValuesIntoIntegerType(hash)).toEqual({
        a: 18, b: 9
      });
    });
  });

});


