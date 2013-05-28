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
      spyOn(Checkerboard.prototype, "setBoardWidthAndHeight");

      var newCheckerboard = new Checkerboard({horizontalTiles: 3, verticalTiles: 2});

      expect(newCheckerboard.setBoardWidthAndHeight).toHaveBeenCalled();
    });

    it("should load tiles into the tiles property", function () {
      spyOn(Checkerboard.prototype, "loadTileMatrix");

      var newCheckerboard = new Checkerboard({horizontalTiles: 8, verticalTiles: 3});

      expect(newCheckerboard.loadTileMatrix).toHaveBeenCalled();

    });
  });

  describe("#generateCheckerboard", function () {
    it("generates an html/css representation of the tiles matrix", function () {
      var newCheckerboard, horizontalTiles, verticalTiles, tileCount, coloredTileCount;

      newCheckerboard = new Checkerboard({ horizontalTiles: 4, verticalTiles: 5 });
      newCheckerboard.generateCheckerboard();

      tileCount = $("#checkerboard > .tile").size();
      coloredTileCount = $("#checkerboard > .tile-background-color").size();

      expect(tileCount).toBe(20);
      expect(coloredTileCount).toBe(10)

      newCheckerboard = new Checkerboard({ horizontalTiles: 5, verticalTiles: 5 });
      newCheckerboard.generateCheckerboard();
      tileCount = $("#checkerboard > .tile").size();
      coloredTileCount = $("#checkerboard > .tile-background-color").size();

      expect(tileCount).toBe(25);
      expect(coloredTileCount).toBe(13)

      newCheckerboard = new Checkerboard({ horizontalTiles: 6, verticalTiles: 5 });
      newCheckerboard.generateCheckerboard();
      tileCount = $("#checkerboard > .tile").size();
      coloredTileCount = $("#checkerboard > .tile-background-color").size();

      expect(tileCount).toBe(30);
      expect(coloredTileCount).toBe(15)
    });
  });

  describe("#setBoardWidthAndHeight", function () {

    it("sets the board to the appropriate width in pixels", function () {
      var setBoardWidth, $checkerboard, expectedWidth, horizontalTiles, coloredTileCount;

      $checkerboard = $("#checkerboard");

      newCheckerboard = new Checkerboard({horizontalTiles: 2, verticalTiles: 2});

      expectedWidth = 100;
      expectedHeight = 100;
      horizontalTiles = 2;
      verticalTiles = 2;

      newCheckerboard.setBoardWidthAndHeight(horizontalTiles, verticalTiles);

      expect($checkerboard.width()).toBe(expectedWidth);
      expect($checkerboard.height()).toBe(expectedHeight);

      expectedWidth = 150;
      expectedHeight = 200;
      horizontalTiles = 3;
      verticalTiles = 4;

      newCheckerboard.setBoardWidthAndHeight(horizontalTiles, verticalTiles);

      expect($checkerboard.width()).toBe(expectedWidth);
      expect($checkerboard.height()).toBe(expectedHeight);
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
      expect(firstTile.coordinate).toBe(0);

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
      expect(firstTile.coordinate).toBe(0);

    });

    it("should load an xMark object into the first tile of the tile matrix", function () {
      var newCheckerboard, firstTile, xMark, expectXmark;

      newCheckerboard = new Checkerboard({horizontalTiles: 3, verticalTiles: 2});
      firstTile = newCheckerboard.tiles[0]
      xMark = firstTile.subject
      expectXmark = new XMark();
      expectXmark.coordinate = 0;

      expect(xMark).toEqual(expectXmark);
      expect(firstTile.subject).toBe(xMark);

    });
  });

  describe("#colorElement", function () {
    it("colors an element based on a color option", function () {
      var $tile, colorElement, colorOption, $processedTile, colorClass;

      colorElement = Checkerboard.prototype.colorElement;
      colorClass = "tile-background-color";

      $tile = $("<div class='tile'></div>");
      colorOption = 2; 
      $processedTile = colorElement($tile, colorOption);

      expect($tile.hasClass(colorClass)).toBe(true);


      $tile = $("<div class='tile'></div>");
      colorOption = 3; 
      $processedTile = colorElement($tile, colorOption);

      expect($tile.hasClass(colorClass)).toBe(false);

      $tile = $("<div class='tile'></div>");
      colorOption = 4; 
      $processedTile = colorElement($tile, colorOption);

      expect($tile.hasClass(colorClass)).toBe(true);
    });
  });

  describe("#assignXmark", function () {
    it("assigns a xMark object as a checkerboard property", function () {
      var newCheckerboard, tile, xMark;
      newCheckerboard = new Checkerboard({horizontalTiles: 3, verticalTiles: 2});

      firstTile = newCheckerboard.tiles[0];
      xMark = new XMark();

      newCheckerboard.assignXmark(firstTile, xMark);

      expect(firstTile.subject).toBe(xMark);
      expect(newCheckerboard.xMark).toBe(xMark);
      expect(xMark.coordinate).toBe(firstTile.coordinate);
    });
  });
});
