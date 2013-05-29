describe("Backbone Checkerboard Setter", function () {

  beforeEach(function () {
    loadFixtures("home.html");
    setter = new APP.CheckerboardSetter();

    setFormInputValues = function setTiles(hTiles, vTiles) {
      $("input:text[name=horizontalTiles]").val(hTiles);
      $("input:text[name=verticalTiles]").val(vTiles);
    };

    generateExpectedHash = function (hTiles, vTiles) {
      return { horizontalTiles: hTiles, verticalTiles: vTiles };
    };
  });

  describe("#template", function () {
    it("returns a form template", function () {
      underscoreTemplate = _.template(Templates.Checkerboard.form)();

      expect(setter.template()).toEqual(underscoreTemplate);
    });
  });

  describe("#renderNewCheckerboard", function () {
    it("creates a new checkerboard for the user", function () {
      var fakeCheckerboard, horizontalTiles, verticalTiles,
      expectedFormInputsHash, $form, event;

      fakeCheckerboard = jasmine.createSpy("Checkerboard");
      spyOn(window.APP, "Checkerboard").andReturn(fakeCheckerboard);

      $form = $("#checkerboard-form");
      event = $.Event('submit');

      horizontalTiles = 5;
      verticalTiles = 5;
      setFormInputValues(horizontalTiles, verticalTiles);
      expectedFormInputsHash = generateExpectedHash(horizontalTiles, verticalTiles);

      $form.trigger(event);

      expect(APP.Checkerboard).toHaveBeenCalledWith(expectedFormInputsHash);
      expect(setter.checkerboard).toBe(fakeCheckerboard);
      expect(event.isDefaultPrevented()).toBe(true);


      horizontalTiles = 3;
      verticalTiles = 7;
      setFormInputValues(horizontalTiles, verticalTiles);
      expectedFormInputsHash = generateExpectedHash(horizontalTiles, verticalTiles);

      $form.trigger(event);

      expect(APP.Checkerboard).toHaveBeenCalledWith(expectedFormInputsHash);
      expect(setter.checkerboard).toBe(fakeCheckerboard);
      expect(event.isDefaultPrevented()).toBe(true);

    });
  });

  describe("#getFormTextInputValues", function ()   {

    it("caches the text input values into a hash", function () {
      var horizontalTiles, verticalTiles, formInputsHash, expectedFormInputsHash;

      horizontalTiles = 3;
      verticalTiles = 3;
      setFormInputValues(horizontalTiles, verticalTiles);
      expectedFormInputsHash = generateExpectedHash(horizontalTiles, verticalTiles)
      formInputsHash = setter.getFormTextInputValues("#checkerboard-form");

      expect(formInputsHash).toEqual(expectedFormInputsHash);

      horizontalTiles = 5;
      verticalTiles = 7;
      setFormInputValues(horizontalTiles, verticalTiles);
      formInputsHash = setter.getFormTextInputValues("#checkerboard-form");
      expectedFormInputsHash = generateExpectedHash(horizontalTiles, verticalTiles)

      expect(formInputsHash).toEqual(expectedFormInputsHash);
    });
  });

  describe("#changeHashValuesIntoIntegerType", function () {
    it("changes the strings into integers in a javascript object", function () {
      var hash = {a: "12", b: "13" };
      var expectedHash = { a: 12, b: 13 };

      expect(setter.changeHashValuesIntoIntegerType(hash)).toEqual(expectedHash);

      hash = {a: "18", b: "9" };
      var expectedHash = { a: 18, b: 9 };

      expect(setter.changeHashValuesIntoIntegerType(hash)).toEqual(expectedHash);
    });
  });

});


