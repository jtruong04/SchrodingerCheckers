import Tile_Data from "./Tile_Data.js";
import Link_Data from "./Link_Data.js";

class Board_Data {
  constructor(boardSize = 4) {

    this.boardSize = boardSize;

    this.tiles = [];
    this.links = {}; // keys must string be in the form 'fromRow,fromCol,toRow,toCol'
    
    this.isButton = false;
    this.onClickCallback = null;

    // Initialize counts to zero. When Tiles and Links are created, they use
    // this to obtain a unique ID. These prevent the unique key warning that
    // React throws when rendering. Can also be used in other stuff too.
    Tile_Data.count = 0;
    Link_Data.count = 0;

    // Fill 2D tile array
    for (let i = 0; i < this.boardSize; i++) {
      let tempArray = [];
      for (let j = 0; j < this.boardSize; j++) {
        tempArray.push(new Tile_Data());
      }
      this.tiles.push(tempArray);
    }

    // // Test Links TODO: Remove this when interactivity is added
    // this.links['0,0,1,0'] = new Link();
    // this.links["1,0,0,0"] = new Link();
    // this.links["2,0,2,1"] = new Link();
    // this.links["2,1,2,0"] = new Link();
    // this.links["1,3,1,2"] = new Link();
  }
}

export default Board_Data;
