describe("Checkerboard", function () {
  beforeEach(function () {
    loadFixtures("home.html");

    var horizontalTiles = 4;
    var verticalTiles = 5;
    board = new Checkerboard({
      horizontalTiles: horizontalTiles, 
      verticalTiles: verticalTiles
    });
  });

  describe("#initialize", function() {
    it("should have horizonal and vertical tile counts", function () {
      expect(board.horizontalTiles).toEqual(4);
      expect(board.verticalTiles).toEqual(5);
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

});
