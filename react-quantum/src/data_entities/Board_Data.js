import Tile_Data from "./Tile_Data.js";
// import Link_Data from "./Link_Data.js";

class Board_Data {
  constructor({boardSize = 4, randomizeTiles = false}) {

    this.boardSize = boardSize;

    this.tiles = [];
    this.links = new Map(); // key is of type int (tileID), value is list of ints (tileIDs)
    
    // These properties allow the board as a whole to be a button.
    this.isButton = false;
    this.onClickCallback = null;

    // Fill tile array, we pass the array index to the tile to also serve as the tileID.
    for (let i = 0; i < this.boardSize**2; i++) {
      this.tiles.push(new Tile_Data({tileID:i, randomize:randomizeTiles}));
    }
  }
}

export default Board_Data;
