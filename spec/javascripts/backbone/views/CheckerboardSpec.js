describe("Checkerboard", function () {
  beforeEach(function () {
    loadFixtures("home.html");
  });

  describe("#initialize", function() {
    it("should have the appropriate properties", function () {
      var newCheckerboard = new Checkerboard({ horizontalTiles: 4, verticalTiles: 5 });

      expect(newCheckerboard.horizontalTiles).toEqual(4);
      expect(newCheckerboard.verticalTiles).toEqual(5);
      expect(newCheckerboard.tiles.length).toEqual(20);
    });

    it("should set the width of board and render it", function () {
      spyOn(Checkerboard.prototype, "setBoardWidth");
      spyOn(Checkerboard.prototype, "clearAndRenderBoard");

      var newCheckerboard = new Checkerboard({horizontalTiles: 3, verticalTiles: 2});

      expect(newCheckerboard.setBoardWidth).toHaveBeenCalled();
      expect(newCheckerboard.clearAndRenderBoard).toHaveBeenCalled();
    });

    it("should load tiles into the tiles property", function () {
      spyOn(Checkerboard.prototype, "loadTileMatrix");

      var newCheckerboard = new Checkerboard({horizontalTiles: 8, verticalTiles: 3});

      expect(newCheckerboard.loadTileMatrix).toHaveBeenCalled();

    });
  });

  describe("#generateCheckerboard", function () {
    it("generates an html/css representation of the tiles matrix", function () {
      var newCheckerboard = new Checkerboard({ horizontalTiles: 4, verticalTiles: 5 });

      newCheckerboard.generateCheckerboard();

      var tileCount = $("#checkerboard > .tile").size();

      expect(tileCount).toBe(20);
    });
  });

  describe("#setBoardWidth", function () {

    it("sets the board to the appropriate width in pixels", function () {
      var setBoardWidth, $checkerboard, expectedWidth, horizontalTiles;

      $checkerboard = $("#checkerboard");

      newCheckerboard = new Checkerboard({horizontalTiles: 2, verticalTiles: 2});

      expectedWidth = 100;
      horizontalTiles = 2;

      newCheckerboard.setBoardWidth(horizontalTiles);

      expect($checkerboard.width()).toBe(expectedWidth);

      expectedWidth = 200;
      horizontalTiles = 4;
      newCheckerboard.setBoardWidth(horizontalTiles);

      expect($checkerboard.width()).toBe(expectedWidth);

      expectedWidth = 300;
      horizontalTiles = 6;
      newCheckerboard.setBoardWidth(horizontalTiles);

      expect($checkerboard.width()).toBe(expectedWidth);


    });
  });

  describe("#loadTileMatrix", function () {
    it("should load the tiles property with tile objects", function () {
      var totalTiles, firstTile, lastTile, 
          lastTileIndex, arrayLength,newCheckerboard;

      newCheckerboard = new Checkerboard({horizontalTiles: 3, verticalTiles: 2});

      totalTiles = newCheckerboard.horizontalTiles * newCheckerboard.verticalTiles
      arrayLength = newCheckerboard.tiles.length;

      firstTile = newCheckerboard.tiles[0];
      lastTileIndex = arrayLength - 1;
      lastTile = newCheckerboard.tiles[lastTileIndex];


      expect(arrayLength).toEqual(totalTiles);
      expect(firstTile instanceof Tile).toBe(true);
      expect(lastTile instanceof Tile).toBe(true);
      expect(lastTileIndex).toBe(5);
      expect(arrayLength).toBe(6);

      newCheckerboard = new Checkerboard({horizontalTiles: 5, verticalTiles: 5});

      totalTiles = newCheckerboard.horizontalTiles * newCheckerboard.verticalTiles
      arrayLength = newCheckerboard.tiles.length;

      firstTile = newCheckerboard.tiles[0];
      lastTileIndex = arrayLength - 1;
      lastTile = newCheckerboard.tiles[lastTileIndex];


      expect(arrayLength).toEqual(totalTiles);
      expect(firstTile instanceof Tile).toBe(true);
      expect(lastTile instanceof Tile).toBe(true);
      expect(lastTileIndex).toBe(24);
      expect(arrayLength).toBe(25);

    });
  });

});
