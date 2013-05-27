var Checkerboard = Backbone.View.extend({
  initialize: function () {
    var options = this.options;
    this.horizontalTiles = options.horizontalTiles
    this.verticalTiles = options.verticalTiles
    this.tiles = [];

    this.setBoardWidth();
    this.clearAndRenderBoard();
    this.loadTileMatrix();
  },

  el: "#checkerboard", 

  render: function () {
  },

  setBoardWidth: function() {
    var tilePixelWidth = 50;
    var totalBoardWidth = this.horizontalTiles * tilePixelWidth;

    this.$el.css("width", totalBoardWidth + "px");
  },

  clearAndRenderBoard: function () {
    this.$el.empty()
    this.render();
  },

  loadTileMatrix: function () {
    var totalTiles = this.horizontalTiles * this.verticalTiles;

    for(var i = 1; i <= totalTiles; i++) {
      this.tiles.push(new Tile());
    }
  }

});

