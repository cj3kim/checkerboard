var Checkerboard = Backbone.View.extend({
  initialize: function () {
    var options = this.options;
    this.horizontalTiles = options.horizontalTiles
    this.verticalTiles = options.verticalTiles
    this.tiles = [];

    this.setBoardWidth()
    this.clearAndRerenderBoard()
  },

  el: "#checkerboard", 

  render: function () {
  },

  setBoardWidth: function() {
    var tilePixelWidth = 50;
    var totalBoardWidth = this.horizontalTiles * tilePixelWidth;

    this.$el.css("width", totalBoardWidth + "px");
  },
  
  clearAndRerenderBoard: function () {
    this.$el.empty()
    this.render();
  }

});

