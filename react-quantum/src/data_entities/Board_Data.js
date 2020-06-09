import Tile_Data from "./Tile_Data.js";
// import Link_Data from "./Link_Data.js";

class Board_Data {
  constructor({size = 4, randomizeTiles = false}) {

    this.size = size;
    // These properties allow the board as a whole to be a button.
    this.isButton = false;
    this.onClickCallback = null;

    this.tiles = [];

    this.links = new Map(); // key is of type int (tileID), value is list of tileIds
    this.linksOnClickCallback = null;
    this.linksIsButton = false;

    // Fill tile array, we pass the array index to the tile to also serve as the tileID.
    for (let i = 0; i < this.size ** 2; i++) {
      this.tiles.push(new Tile_Data({ tileID: i, randomize: randomizeTiles }));
      this.links.set(i, new Set());
    }

    this.isEqual = this.isEqual.bind(this);
  }

  isEqual(board) {
    // console.log("Comparing ", board, this.tiles)
    if( this.size !== board.size) {
      return false;
    };
    for(let idx = 0; idx < this.tiles.length; idx++) {
      if(this.tiles[idx].state !== board.tiles[idx].state) {
        return false;
      }
    }
    return true;
  }
}

export default Board_Data;
