var Checkerboard = Backbone.View.extend({
  initialize: function () {
    var options = this.options;
    this.horizontalTiles = options.horizontalTiles
    this.verticalTiles = options.verticalTiles
    this.tiles = [];
    this.xMark = null;

    this.loadTileMatrix(this.horizontalTiles, this.verticalTiles);
    this.setBoardWidth(this.horizontalTiles);
    this.render();
  },

  el: "#checkerboard", 

  tileTemplate: _.template("<div class='tile'></div>"),

  render: function () {
    //insert html/css tiles into the dom checkerboard
    //base the insertion on color
    //Color switches every other tile. 
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
  },

  setBoardWidth: function(horizontalTiles) {
    var tilePixelWidth = 50;
    var totalBoardWidth = horizontalTiles * tilePixelWidth;

    this.$el.css("width", totalBoardWidth + "px");
  },

  loadTileMatrix: function (horizontalTiles, verticalTiles) {
    var firstTile, xMark, totalTiles;
    totalTiles = horizontalTiles * verticalTiles;

    for(var i = 0; i < totalTiles; i++) {
      var tile = new Tile();
      var tile.coordinate = i;
      this.tiles.push(new Tile());
    }

    firstTile = this.tiles[0];
    xMark = new XMark();
    xMark.coordinate = 0;
    this.xMark = xMark;
    firstTile.subject = xMark;
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

    if (tile.subject instanceof XMark) { $domTile.attr("id", "x-mark") };

    return $domTile;
  }

});

