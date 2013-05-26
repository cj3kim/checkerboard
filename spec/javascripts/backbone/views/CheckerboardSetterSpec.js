describe("Backbone Checkerboard Setter", function () {

  beforeEach(function () {
    setter = new CheckerboardSetter();
  });

  describe("#initialize", function () {
    it("initializes the form template", function () {
      var template = _.template("<form id='chckerboard'> \
          Horizontal Tiles: <input type='text' name='horizontal-tiles'><br> \
          Vertical Tile: <input type='text' name='vertical-tiles'> <br> \
          <input type='submit' value='Submit'> \
        </form>");
      expect(setter.template).toEqual(template);
    });
  });
  
});

