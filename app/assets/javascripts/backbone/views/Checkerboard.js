var Checkerboard = Backbone.View.extend({
  initialize: function () {
    var options = this.options;
    this.horizontalTiles = options.horizontalTiles
    this.verticalTiles = options.verticalTiles
    this.tiles = [];

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
    var self, tileCount, booleanColorOption;
    self = this;
    booleanColorOption = 0;

    self.$el.empty();
    for(var index in this.tiles) {
      var domTile, currentTileCount;
      currentTileCount = parseInt(index) + 1;

      domTile = $(self.tileTemplate());
      domTile = self.colorElement(domTile, booleanColorOption);
      self.$el.append(domTile);

      if (currentTileCount % self.horizontalTiles === 0 && self.horizontalTiles % 2 === 0 ) {
        booleanColorOption--;
      } else {
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
    var totalTiles = horizontalTiles * verticalTiles;

    for(var i = 1; i <= totalTiles; i++) {
      this.tiles.push(new Tile());
    }
  },

  colorElement: function ($domElement, colorOption) {
    if ( colorOption % 2 === 0 ) {
      $domElement.addClass("tile-background-color");
    }
    return $domElement;
  }


});

