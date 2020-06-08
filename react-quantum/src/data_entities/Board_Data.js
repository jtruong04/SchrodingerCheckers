import Tile_Data from "./Tile_Data.js";
// import Link_Data from "./Link_Data.js";

class Board_Data {
  constructor({boardSize = 4, randomizeTiles = false}) {

    this.boardSize = boardSize;
    // These properties allow the board as a whole to be a button.
    this.isButton = false;
    this.onClickCallback = null;

    this.tiles = [];

    this.links = new Map(); // key is of type int (tileID), value is list of tileIds
    this.linksOnClickCallback = null;
    this.linksIsButton = false;

    // Fill tile array, we pass the array index to the tile to also serve as the tileID.
    for (let i = 0; i < this.boardSize ** 2; i++) {
      this.tiles.push(new Tile_Data({ tileID: i, randomize: randomizeTiles }));
      this.links.set(i, new Set());
    }
    // Test LInks
    this.links.get(0).add(1);
    this.links.get(0).add(4);
    this.links.get(6).add(5);
    // console.log(this.links)
  }
}

export default Board_Data;
