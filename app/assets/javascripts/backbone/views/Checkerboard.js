var Checkerboard = Backbone.View.extend({
  initialize: function () {
    var options = this.options;
    this.horizontalTiles = options.horizontalTiles
    this.verticalTiles = options.verticalTiles
    this.tiles = [];

    this.setBoardWidth()
    this.clearAndRenderBoard()
  },

  el: "#checkerboard", 

  render: function () {
    var booleanColorOption = 0;
    var tiles = this.tiles;
    var marker = null;
    var $markerTemplate = null;

    for(var index in tiles) {
      var i = parseInt(index) + 1; //0 and 1 will screw up the modulus calculation
      var tile = tiles[index]

      var $tileTemplate = $(this.template());
      $tileTemplate = this.colorElement(booleanColorOption,$tileTemplate);

      if (tile.subject instanceof Marker) {
        $tileTemplate.addClass("x-mark");
        marker = tile.subject;
        marker.coordinate = parseInt(index);
      }

      this.$el.append($tileTemplate);

      booleanColorOption++;

      if ( i % this.horizontalTiles === 0 && this.horizontalTiles % 2 === 0 ) {
        booleanColorOption--;
      }
    }


  },

  setBoardWidth: function() {
    var tilePixelWidth = 50;
    var totalBoardWidth = this.horizontalTiles * tilePixelWidth;

    this.$el.css("width", totalBoardWidth + "px");
  },

  clearAndRenderBoard: function () {
    this.$el.empty()
    this.render();
  }

});

