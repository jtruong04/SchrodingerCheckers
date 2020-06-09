import Board_Data from './Board_Data.js'
class Player_Data {
  constructor({ numBoards = 3, size = 4}) {
    this.numBoards = numBoards;
    this.targetBoards = [];
    for(let i = 0; i < this.numBoards; i++) {
      this.targetBoards.push(new Board_Data( {size: size, randomizeTiles: true}));
    }
  }
}

export default Player_Data;
