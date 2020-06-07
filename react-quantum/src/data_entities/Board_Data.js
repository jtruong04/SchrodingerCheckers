import Tile_Data from "./Tile_Data.js";
// import Link_Data from "./Link_Data.js";

class Board_Data {
  constructor(boardSize = 4) {

    this.boardSize = boardSize;

    this.tiles = [];
    this.links = new Map(); // key is of type int, value is list of ints, ints are tileIDs
    
    this.isButton = false;
    this.onClickCallback = null;

    // Initialize counts to zero. When Tiles and Links are created, they use
    // this to obtain a unique ID. These prevent the unique key warning that
    // React throws when rendering. Can also be used in other stuff too.
    Tile_Data.count = 0;
    // Link_Data.count = 0;

    // Fill tile array
    for (let i = 0; i < this.boardSize**2; i++) {
      this.tiles.push(new Tile_Data());
    }
  }
}

export default Board_Data;
