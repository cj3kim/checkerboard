describe("Checkerboard", function () {
  beforeEach(function () {
    loadFixtures("home.html");
  });

  describe("#initialize", function() {
    it("should have the appropriate properties", function () {
      var newCheckerboard = new APP.Checkerboard({ horizontalTiles: 4, verticalTiles: 5 });

      expect(newCheckerboard.horizontalTiles).toEqual(4);
      expect(newCheckerboard.verticalTiles).toEqual(5);
      expect(newCheckerboard.tiles.length).toEqual(20);
    });

    it("should set the width of board and render it", function () {
      spyOn(APP.Checkerboard.prototype, "setBoardWidthAndHeight");

      var newCheckerboard = new APP.Checkerboard({horizontalTiles: 3, verticalTiles: 2});

      expect(newCheckerboard.setBoardWidthAndHeight).toHaveBeenCalled();
    });

    it("should load tiles into the tiles property", function () {
      spyOn(APP.Checkerboard.prototype, "loadTileMatrix");

      var newCheckerboard = new APP.Checkerboard({horizontalTiles: 8, verticalTiles: 3});

      expect(newCheckerboard.loadTileMatrix).toHaveBeenCalled();

    });
  });

  describe("#generateCheckerboard", function () {
    it("generates an html/css representation of the tiles matrix", function () {
      var newCheckerboard, horizontalTiles, verticalTiles, tileCount, coloredTileCount;

      newCheckerboard = new APP.Checkerboard({ horizontalTiles: 4, verticalTiles: 5 });
      newCheckerboard.generateCheckerboard();

      tileCount = $("#checkerboard > .tile").size();
      coloredTileCount = $("#checkerboard > .tile-background-color").size();

      expect(tileCount).toBe(20);
      expect(coloredTileCount).toBe(10)

      newCheckerboard = new APP.Checkerboard({ horizontalTiles: 5, verticalTiles: 5 });
      newCheckerboard.generateCheckerboard();
      tileCount = $("#checkerboard > .tile").size();
      coloredTileCount = $("#checkerboard > .tile-background-color").size();

      expect(tileCount).toBe(25);
      expect(coloredTileCount).toBe(13)

      newCheckerboard = new APP.Checkerboard({ horizontalTiles: 6, verticalTiles: 5 });
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

      newCheckerboard = new APP.Checkerboard({horizontalTiles: 2, verticalTiles: 2});

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

      newCheckerboard = new APP.Checkerboard({horizontalTiles: 3, verticalTiles: 2});

      totalTiles = newCheckerboard.horizontalTiles * newCheckerboard.verticalTiles
      arrayLength = newCheckerboard.tiles.length;

      firstTile = newCheckerboard.tiles[0];
      lastTileIndex = arrayLength - 1;
      lastTile = newCheckerboard.tiles[lastTileIndex];


      expect(arrayLength).toEqual(totalTiles);
      expect(firstTile instanceof APP.Tile).toBe(true);
      expect(lastTile instanceof APP.Tile).toBe(true);
      expect(lastTileIndex).toBe(5);
      expect(arrayLength).toBe(6);
      expect(firstTile.coordinate).toBe(0);

      newCheckerboard = new APP.Checkerboard({horizontalTiles: 5, verticalTiles: 5});

      totalTiles = newCheckerboard.horizontalTiles * newCheckerboard.verticalTiles
      arrayLength = newCheckerboard.tiles.length;

      firstTile = newCheckerboard.tiles[0];
      lastTileIndex = arrayLength - 1;
      lastTile = newCheckerboard.tiles[lastTileIndex];


      expect(arrayLength).toEqual(totalTiles);
      expect(firstTile instanceof APP.Tile).toBe(true);
      expect(lastTile instanceof APP.Tile).toBe(true);
      expect(lastTileIndex).toBe(24);
      expect(arrayLength).toBe(25);
      expect(firstTile.coordinate).toBe(0);

    });

    it("should load an xMark object into the first tile of the tile matrix", function () {
      var newCheckerboard, firstTile, xMark, expectXmark;

      newCheckerboard = new APP.Checkerboard({horizontalTiles: 3, verticalTiles: 2});
      firstTile = newCheckerboard.tiles[0]
      xMark = firstTile.subject
      expectXmark = new APP.Xmark();
      expectXmark.coordinate = 0;

      expect(xMark).toEqual(expectXmark);
      expect(firstTile.subject).toBe(xMark);

    });
  });

  describe("#colorElement", function () {
    it("colors an element based on a color option", function () {
      var $tile, colorElement, colorOption, $processedTile, colorClass;

      colorElement = APP.Checkerboard.prototype.colorElement;
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
      newCheckerboard = new APP.Checkerboard({horizontalTiles: 3, verticalTiles: 2});

      firstTile = newCheckerboard.tiles[0];
      xMark = new APP.Xmark();

      newCheckerboard.assignXmark(firstTile, xMark);

      expect(firstTile.subject).toBe(xMark);
      expect(newCheckerboard.xMark).toBe(xMark);
      expect(xMark.coordinate).toBe(firstTile.coordinate);
    });
  });

  describe("#moveXmark", function () {
    describe("when the checkerboard dimensions >= 2x2", function () {
      var moveLeftOneSpace, moveRightOneSpace, expectedCoordinate;
      beforeEach(function () {
        newCheckerboard = new APP.Checkerboard({horizontalTiles: 10, verticalTiles: 10})

        testMovement = function testMovement(movement, checkerboard) {
          var moveSpace = movement;
          var expectedCoordinate = 0;

          expect(checkerboard.xMark.coordinate).toBe(expectedCoordinate);

          checkerboard.moveXmark(moveSpace);

          expect(checkerboard.xMark.coordinate).toBe(expectedCoordinate);

          checkerboard.moveXmark(moveSpace);

          expect(checkerboard.xMark.coordinate).toBe(expectedCoordinate);
        }
      });

      describe("when it is on the first tile of the first row", function () {
        it("can't move further left", function () {
          moveLeftOneSpace = -1;
          testMovement(moveLeftOneSpace, newCheckerboard);
          expectedCoordinate = 0;

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          newCheckerboard.moveXmark(moveLeftOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          newCheckerboard.moveXmark(moveLeftOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);
        });

        it("can't move up", function () {
          moveUpOneSpace = -(newCheckerboard.horizontalTiles); // Should be 10 
          expectedCoordinate = 0;

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          expectedCoordinate = 0;
          newCheckerboard.moveXmark(moveUpOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          expectedCoordinate = 0;
          newCheckerboard.moveXmark(moveUpOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);
        });

        it("can move right", function () {
          moveRightOneSpace = 1;
          expectedCoordinate = 0;

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          expectedCoordinate = 1;
          newCheckerboard.moveXmark(moveRightOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          expectedCoordinate = 2;
          newCheckerboard.moveXmark(moveRightOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);
        });

        it("can move down", function () {
          moveDownOneSpace = newCheckerboard.horizontalTiles;
          expectedCoordinate = 0;

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          expectedCoordinate = 10;
          newCheckerboard.moveXmark(moveDownOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          expectedCoordinate = 20;
          newCheckerboard.moveXmark(moveDownOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);
        });
      });

      describe("when it is on the last tile of a row", function () {
        beforeEach(function () {
          xMark = newCheckerboard.xMark;
          xMarkCoordinate = xMark.coordinate;
          currentTile = newCheckerboard.tiles[xMarkCoordinate];
          currentTile.subject = null;
          lastIndex = newCheckerboard.tiles.length - 1;
          lastTile = newCheckerboard.tiles[lastIndex];
          lastTile.subject = xMark;
          xMark.coordinate = lastTile.coordinate;
        });

        it("can't move further right", function () {

          moveRightOneSpace = 1;
          expectedCoordinate = 99;

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          newCheckerboard.moveXmark(moveRightOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          newCheckerboard.moveXmark(moveRightOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);
        });

        it("can move left", function () {
          moveLeftOneSpace = -1;
          expectedCoordinate = 99;

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          expectedCoordinate = 98;
          newCheckerboard.moveXmark(moveLeftOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          expectedCoordinate = 97;
          newCheckerboard.moveXmark(moveLeftOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);
        });

        it("can't move down", function () {
          moveDownOneSpace = newCheckerboard.horizontalTiles; // Should be 10 
          expectedCoordinate = 99;

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          newCheckerboard.moveXmark(moveDownOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          newCheckerboard.moveXmark(moveDownOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);
        });

        it("can move up", function () {
          moveUpOneSpace = -(newCheckerboard.horizontalTiles);
          expectedCoordinate = 99;

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          newCheckerboard.moveXmark(moveUpOneSpace);
          expectedCoordinate = 89;

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          expectedCoordinate = 79;
          newCheckerboard.moveXmark(moveUpOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);
        });

      });
    });

    describe("when the checkerboard is only one horizontal line", function () {
      beforeEach(function () {
        newCheckerboard = new APP.Checkerboard({horizontalTiles: 3, verticalTiles: 1});
      });

      it("can't move up or down", function () {
        moveUpOneSpace = -(newCheckerboard.horizontalTiles);
        moveDownOneSpace = newCheckerboard.horizontalTiles;

        expectedCoordinate = 0;

        expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

        newCheckerboard.moveXmark(moveUpOneSpace);

        expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

        newCheckerboard.moveXmark(moveDownOneSpace);

        expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);
      });


      describe("when it is on the first tile", function () {
        it("can't move further left", function () {
          moveLeftOneSpace = -1;
          expectedCoordinate = 0;

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          newCheckerboard.moveXmark(moveLeftOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          newCheckerboard.moveXmark(moveLeftOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);
        });

        it("can move right", function () {
          moveRightOneSpace = 1;
          expectedCoordinate = 0;

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          expectedCoordinate = 1;
          newCheckerboard.moveXmark(moveRightOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          expectedCoordinate = 2;
          newCheckerboard.moveXmark(moveRightOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);
        });

      });

      describe("when it is on the last tile", function () {
        beforeEach(function () {
          lastIndex = newCheckerboard.tiles.length - 1;
          newCheckerboard.tiles[0].subject = null;
          newCheckerboard.tiles[lastIndex].subject = newCheckerboard.xMark;
          newCheckerboard.xMark.coordinate = lastIndex;
        });

        it("can't move further right", function () {
          moveRightOneSpace = 1;
          expectedCoordinate = 2;
          unexpectedCoordinate = 3;

          newCheckerboard.moveXmark(moveRightOneSpace);
          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);
          expect(newCheckerboard.xMark.coordinate).not.toBe(unexpectedCoordinate);

          expectedCoordinate = 2;
          newCheckerboard.moveXmark(moveRightOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);
          expect(newCheckerboard.xMark.coordinate).not.toBe(unexpectedCoordinate);

          expectedCoordinate = 2;
          newCheckerboard.moveXmark(moveRightOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);
        });

        it("can move left", function () {
          moveLeftOneSpace = -1;
          expectedCoordinate = 2;

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          expectedCoordinate = 1;
          newCheckerboard.moveXmark(moveLeftOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          expectedCoordinate = 0;
          newCheckerboard.moveXmark(moveLeftOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

        });
      });

      describe("when it is in the middle", function () {
        beforeEach(function () {
          middleIndex = 1; //based on newCheckerboard.tile which is [0, 1, 2]
          newCheckerboard.tiles[0].subject = null;
          newCheckerboard.tiles[middleIndex].subject = newCheckerboard.xMark;
          newCheckerboard.xMark.coordinate = middleIndex;
        });

        it("can move left", function () {
          moveLeftOneSpace = -1;
          expectedCoordinate = 1;

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          expectedCoordinate = 0;
          newCheckerboard.moveXmark(moveLeftOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          expectedCoordinate = 0;
          newCheckerboard.moveXmark(moveLeftOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);
        });

        it("can move right", function () {
          moveRightOneSpace = 1
          expectedCoordinate = 1;

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          expectedCoordinate = 2;
          newCheckerboard.moveXmark(moveRightOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);

          expectedCoordinate = 2;
          newCheckerboard.moveXmark(moveRightOneSpace);

          expect(newCheckerboard.xMark.coordinate).toBe(expectedCoordinate);
        });

      });

    });

    describe("when the checkerboard is a vertical line", function () {

      describe("when it is on the first tile", function () {
        it("can't move further up", function () {
        });

        it("can move down", function () {
        });
      });

      describe("when it is on the last tile", function () {
        it("can't move further down", function () {
        });

        it("can move up", function () {
        });
      });

      describe("when it is in the middle", function () {
        it("can move up and down", function () {
        });
      });
    });


  });
});
