APP.Checkerboard = Backbone.View.extend({
  initialize: function () {
    var options = this.options;
    this.horizontalTiles = options.horizontalTiles
    this.verticalTiles = options.verticalTiles
    this.tiles = [];
    this.xMark = null;

    this.loadTileMatrix(this.horizontalTiles, this.verticalTiles);
    this.setBoardWidthAndHeight(this.horizontalTiles, this.verticalTiles);
    this.render();
  },

  el: "#checkerboard", 

  tileTemplate: _.template("<div class='tile'></div>"),

  render: function () {
    this.generateCheckerboard();
  },

  generateCheckerboard: function () {
    var self, tileCount, booleanColorOption, tileMatrix;
    self = this;
    booleanColorOption = 0;
    tileMatrix = this.tiles;

    self.$el.empty();
    for(var index in tileMatrix) {
      var $domTile, tile, currentTileCount;

      tile = tileMatrix[index];
      currentTileCount = parseInt(index) + 1;

      $domTile = self.generateDomTile(tile, booleanColorOption);
      self.$el.append($domTile);

      //This if logic determines whether the first tile on the next row is 
      //the same color as the last tile on the previous row.
      if (!(currentTileCount % self.horizontalTiles === 0 && self.horizontalTiles % 2 === 0)) {
        booleanColorOption++;
      }
    }

    $(document).on("keydown", function (e) {
      self.processKeydown(e);
      $(this).off();
      self.generateCheckerboard();
    });
  },

  setBoardWidthAndHeight: function(horizontalTiles, verticalTiles) {
    var tilePixelWidth, totalBoardWidth, totalBoardHeight;
    tilePixelWidth = 50;
    totalBoardWidth = horizontalTiles * tilePixelWidth;
    totalBoardHeight = verticalTiles * tilePixelWidth;

    this.$el.css("width", totalBoardWidth + "px");
    this.$el.css("height", totalBoardHeight + "px");
  },

  loadTileMatrix: function (horizontalTiles, verticalTiles) {
    var firstTile, xMark, totalTiles;
    totalTiles = horizontalTiles * verticalTiles;

    for(var i = 0; i < totalTiles; i++) {
      var tile = new APP.Tile();
      tile.coordinate = i;
      this.tiles.push(tile);
    }

    firstTile = this.tiles[0];
    xMark = new APP.Xmark();
    this.assignXmark(firstTile, xMark);
  },

  colorElement: function ($domElement, colorOption) {
    if ( colorOption % 2 === 0 ) {
      $domElement.addClass("tile-background-color");
    }
    return $domElement;
  },

  generateDomTile: function (tile, colorOption) {
    var $domTile, $tileTemplate;

    $tileTemplate = $(this.tileTemplate());
    $domTile = this.colorElement($tileTemplate, colorOption);

    if (tile.subject instanceof APP.Xmark) { 
      $domTile.attr("id", "x-mark") 
      $domTile.data("coordinate", tile.coordinate);
    };

    return $domTile;
  },

  assignXmark: function (tile, xMark) {
    tile.subject = xMark;
    xMark.coordinate = tile.coordinate;
    this.xMark = xMark;
  },

  processKeydown: function (e) {
    var movement, self;
    self = this;

    switch(e.keyCode) {
      case 37:
        movement = -1;
        self.moveXmark(movement);
        break;
      case 38:
        movement = -(self.horizontalTiles);
        self.moveXmark(movement);
        break;
      case 39:
        movement = 1;
        self.moveXmark(movement);
        break;
      case 40:
        movement = self.horizontalTiles;
        self.moveXmark(movement);
        break;
    };
  },

  moveXmark: function (movement) {
    var xMark,xMarkCoordinate, totalTiles,
        currentTile, currentCoordinate, currentTileCoordinate,
        potentialTile, potentialCoordinate, potentialTileCoordinate;

    totalTiles = this.horizontalTiles * this.verticalTiles
    xMark = this.xMark;
    xMarkCoordinate = parseInt(xMark.coordinate);

    currentTileCoordinate = xMarkCoordinate;
    currentTile = this.tiles[currentTileCoordinate];

    potentialTileCoordinate = xMarkCoordinate + movement;
    potentialTile = this.tiles[potentialTileCoordinate];

    //the variables belows exist for convenience when doing modulus operations
    //in movement logic
    currentCoordinate = currentTileCoordinate + 1;
    potentialCoordinate = potentialTileCoordinate + 1;

    //logic to deal with legal and illegal moves

    if ((this.horizontalTiles === 1 ? false : currentCoordinate < potentialCoordinate)
        && (currentCoordinate + 1) % potentialCoordinate === 0 
        && currentCoordinate % this.horizontalTiles === 0 ) {
      console.log("going further right is an illegal move");
    } else if ((this.horizontalTiles === 1 ? false : currentCoordinate > potentialCoordinate)
               && (currentCoordinate + 1) % potentialCoordinate === 0
               && potentialCoordinate % this.horizontalTiles === 0) {
      console.log("going further left is an illegal move");
    } else if ( potentialCoordinate < 1 || potentialCoordinate > totalTiles ) {
      console.log("illegal move");
    } else {
      currentTile.subject = null;
      this.assignXmark(potentialTile, xMark);
    }
  }

});

