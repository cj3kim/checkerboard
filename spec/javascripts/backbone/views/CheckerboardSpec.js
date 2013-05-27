describe("Checkerboard", function () {
  beforeEach(function () {
    loadFixtures("home.html");

    board = new Checkerboard({
      horizontalTiles: 4, 
      verticalTiles: 5
    });
  });

  describe("#initialize", function() {
    it("should have the appropriate properties", function () {
      expect(board.horizontalTiles).toEqual(4);
      expect(board.verticalTiles).toEqual(5);
      expect(board.tiles).toEqual(new Array());
    });

    it("should set the board width and render it", function () {
      spyOn(Checkerboard.prototype, "setBoardWidth");
      spyOn(Checkerboard.prototype, "clearAndRenderBoard");

      var newCheckerboard = new Checkerboard({horizontalTiles: 3, verticalTiles: 2});

      expect(newCheckerboard.setBoardWidth).toHaveBeenCalled();
      expect(newCheckerboard.clearAndRenderBoard).toHaveBeenCalled();
    });

    it("should load the tiles array with Tile objects", function () {

    });
  });

  describe("#setBoardWidth", function () {

    it("sets the board to the appropriate width in pixels", function () {
      var $checkerboard = $("#checkerboard");
      var expectedWidth = 200
      board.setBoardWidth();

      expect($checkerboard.width()).toBe(expectedWidth);

      board.horizontalTiles = 5;
      expectedWidth = 250;
      board.setBoardWidth();

      expect($checkerboard.width()).toBe(expectedWidth);

      board.horizontalTiles = 7;
      expectedWidth = 350;
      board.setBoardWidth();

      expect($checkerboard.width()).toBe(expectedWidth);
    });
  });

  describe("#loadTileMatrix", function () {
    it("should load the tiles property with tile objects", function () {
      var totalTiles;
      totalTiles = board.horizontalTiles * board.verticalTiles

      board.loadTileMatrix();

      expect(board.tiles.length).toEqual(totalTiles);
    });
  });

});
