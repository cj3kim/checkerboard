var Checkerboard = Backbone.View.extend({
  initialize: function () {
    var options = this.options;
    this.horizontalTiles = options.horizontalTiles
    this.verticalTiles = options.verticalTiles
    this.tiles = [];

    this.loadTileMatrix(this.horizontalTiles, this.verticalTiles);
    this.setBoardWidth(this.horizontalTiles);
    this.clearAndRenderBoard();
  },

  el: "#checkerboard", 

  tileTemplate: _.template("<div class='tile'></div>"),

  render: function () {
    //insert html/css tiles into the dom checkerboard
    //base the insertion on color
    //Color switches every other tile. 
  },

  generateCheckerboard: function () {
  },

  setBoardWidth: function(horizontalTiles) {
    var tilePixelWidth = 50;
    var totalBoardWidth = horizontalTiles * tilePixelWidth;

    this.$el.css("width", totalBoardWidth + "px");
  },

  clearAndRenderBoard: function () {
    this.$el.empty()
    this.render();
  },

  loadTileMatrix: function (horizontalTiles, verticalTiles, matrix) {
    var totalTiles = horizontalTiles * verticalTiles;

    for(var i = 1; i <= totalTiles; i++) {
      this.tiles.push(new Tile());
    }
  },

  colorElement: function (colorOption, domElement) {
    if ( colorOption % 2 === 0 ) {
      domElement.css("background-color", "green");
    }
    return domElement;
  }

});

